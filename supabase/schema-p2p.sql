-- ============================================================
-- TNCB P2P Match Schema
-- Tạo: 10/06/2026
-- Chạy trong Supabase SQL Editor
-- ============================================================

-- 1. PROFILES (user identity cho P2P — tách hoàn toàn khỏi GĐ1 Dexie)
CREATE TABLE IF NOT EXISTS profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone       text,
  created_at  timestamptz DEFAULT now()
);

-- 2. DATING PROFILES (thông tin match)
CREATE TABLE IF NOT EXISTS dating_profiles (
  user_id           uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  display_name      text NOT NULL,
  bio               text DEFAULT '',
  photos            text[] DEFAULT '{}',           -- Supabase Storage URLs
  gender            text,                           -- 'male' | 'female' | 'other'
  looking_for       text,                           -- 'male' | 'female' | 'any'
  min_age           int DEFAULT 18,
  max_age           int DEFAULT 99,
  -- Persona từ Dexie (sync khi setup, dùng cho algorithm)
  payload           jsonb DEFAULT '{}',
  -- payload schema: { mbtiType, element, lifePath, nhatChu, canChi }
  -- Safety / quality
  selfie_verified   bool DEFAULT false,
  is_active         bool DEFAULT true,
  is_paused         bool DEFAULT false,
  report_count      int DEFAULT 0,
  -- Timestamps
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now()
);

-- 3. SWIPES
CREATE TABLE IF NOT EXISTS swipes (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id  uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_id    uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  action        text NOT NULL CHECK (action IN ('like', 'pass')),
  created_at    timestamptz DEFAULT now(),
  UNIQUE(from_user_id, to_user_id)
);

-- 4. MATCHES
CREATE TABLE IF NOT EXISTS matches (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id    uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user2_id    uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status      text DEFAULT 'active' CHECK (status IN ('active', 'unmatched')),
  matched_at  timestamptz DEFAULT now(),
  UNIQUE(user1_id, user2_id)
);

-- 5. MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id    uuid NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  sender_id   uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content     text NOT NULL,
  sent_at     timestamptz DEFAULT now(),
  read_at     timestamptz
);

-- 6. BLOCKED USERS (dùng ở P4, tạo schema trước)
CREATE TABLE IF NOT EXISTS blocked_users (
  blocker_id  uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_id  uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at  timestamptz DEFAULT now(),
  PRIMARY KEY (blocker_id, blocked_id)
);

-- 7. REPORTS (dùng ở P4, tạo schema trước)
CREATE TABLE IF NOT EXISTS reports (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id  uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_id  uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason       text,
  created_at   timestamptz DEFAULT now()
);

-- ============================================================
-- INDEXES (performance)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_swipes_from    ON swipes(from_user_id);
CREATE INDEX IF NOT EXISTS idx_swipes_to      ON swipes(to_user_id);
CREATE INDEX IF NOT EXISTS idx_matches_user1  ON matches(user1_id);
CREATE INDEX IF NOT EXISTS idx_matches_user2  ON matches(user2_id);
CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id, sent_at);
CREATE INDEX IF NOT EXISTS idx_dating_active  ON dating_profiles(is_active, is_paused);

-- ============================================================
-- REALTIME (cho chat P3)
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- ============================================================
-- ROW LEVEL SECURITY
-- BẮT BUỘC — không skip — privacy blocker
-- ============================================================

ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE dating_profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches          ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages         ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_users    ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports          ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "User đọc profile mình"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "User tạo profile mình"
  ON profiles FOR INSERT
  WITH CHECK (id = auth.uid());

CREATE POLICY "User update profile mình"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

-- dating_profiles
CREATE POLICY "User đọc profile active của người khác"
  ON dating_profiles FOR SELECT
  USING (
    is_active = true
    AND is_paused = false
    AND report_count < 3
  );

CREATE POLICY "User tạo dating profile của mình"
  ON dating_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "User update dating profile của mình"
  ON dating_profiles FOR UPDATE
  USING (user_id = auth.uid());

-- swipes: chỉ thấy swipe của mình
CREATE POLICY "User đọc swipe của mình"
  ON swipes FOR SELECT
  USING (from_user_id = auth.uid());

CREATE POLICY "User tạo swipe"
  ON swipes FOR INSERT
  WITH CHECK (from_user_id = auth.uid());

-- matches: chỉ thấy match có mình trong đó
CREATE POLICY "User đọc match của mình"
  ON matches FOR SELECT
  USING (user1_id = auth.uid() OR user2_id = auth.uid());

CREATE POLICY "System tạo match" -- tạo qua service role (server-side sau)
  ON matches FOR INSERT
  WITH CHECK (user1_id = auth.uid() OR user2_id = auth.uid());

CREATE POLICY "User update match của mình (unmatch)"
  ON matches FOR UPDATE
  USING (user1_id = auth.uid() OR user2_id = auth.uid());

-- messages: chỉ đọc/gửi trong match của mình
CREATE POLICY "User đọc tin nhắn trong match của mình"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM matches m
      WHERE m.id = match_id
        AND (m.user1_id = auth.uid() OR m.user2_id = auth.uid())
        AND m.status = 'active'
    )
  );

CREATE POLICY "User gửi tin nhắn trong match của mình"
  ON messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM matches m
      WHERE m.id = match_id
        AND (m.user1_id = auth.uid() OR m.user2_id = auth.uid())
        AND m.status = 'active'
    )
  );

-- blocked_users: chỉ thấy danh sách block của mình
CREATE POLICY "User đọc danh sách block của mình"
  ON blocked_users FOR SELECT
  USING (blocker_id = auth.uid());

CREATE POLICY "User thêm block"
  ON blocked_users FOR INSERT
  WITH CHECK (blocker_id = auth.uid());

CREATE POLICY "User xóa block của mình"
  ON blocked_users FOR DELETE
  USING (blocker_id = auth.uid());

-- reports: chỉ tạo được, không đọc lại
CREATE POLICY "User tạo report"
  ON reports FOR INSERT
  WITH CHECK (reporter_id = auth.uid());

-- ============================================================
-- STORAGE BUCKET (chạy riêng trong Supabase Dashboard hoặc API)
-- Tạo bucket 'dating-photos': public read, auth write, max 5MB/file
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('dating-photos', 'dating-photos', true);
--
-- CREATE POLICY "Auth user upload ảnh"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'dating-photos' AND auth.role() = 'authenticated');
--
-- CREATE POLICY "Public đọc ảnh"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'dating-photos');

-- ============================================================
-- RPC: increment report_count (P4 safety)
-- ============================================================
CREATE OR REPLACE FUNCTION increment_report_count(target_user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE dating_profiles
  SET report_count = report_count + 1,
      is_active = CASE WHEN report_count + 1 >= 3 THEN false ELSE is_active END
  WHERE user_id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
