-- Migration #5: Read Receipts
-- ⚠️ Chạy trong Supabase SQL Editor trước khi deploy

ALTER TABLE messages
ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_messages_read_at
  ON messages(match_id, sender_id, read_at)
  WHERE read_at IS NULL;

ALTER TABLE dating_profiles
ADD COLUMN IF NOT EXISTS read_receipts_enabled BOOLEAN NOT NULL DEFAULT true;

COMMENT ON COLUMN messages.read_at IS
  'Timestamp khi người nhận đọc tin. NULL = chưa đọc.';
COMMENT ON COLUMN dating_profiles.read_receipts_enabled IS
  'Opt-out read receipts. Reciprocal: tắt = cả 2 không thấy seen.';
