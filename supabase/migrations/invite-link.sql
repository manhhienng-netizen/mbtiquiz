-- TNCB P2P — Invite Link to Compare
-- Chạy trong Supabase SQL Editor (không tự chạy migration)

CREATE TABLE IF NOT EXISTS invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_code TEXT UNIQUE NOT NULL,
  inviter_user_id TEXT NOT NULL,
  inviter_persona JSONB DEFAULT NULL,
  invitee_persona JSONB DEFAULT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  completed_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_invites_code ON invites(invite_code);
CREATE INDEX IF NOT EXISTS idx_invites_inviter ON invites(inviter_user_id);

ALTER TABLE invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "inviter_read_own" ON invites
  FOR SELECT USING (inviter_user_id = auth.uid()::text);

CREATE POLICY "public_read_by_code" ON invites
  FOR SELECT USING (true);

CREATE POLICY "inviter_insert" ON invites
  FOR INSERT WITH CHECK (inviter_user_id = auth.uid()::text);

CREATE POLICY "public_update_invitee" ON invites
  FOR UPDATE USING (status = 'pending')
  WITH CHECK (status IN ('completed', 'expired'));
