-- Attachment reflection answers (3 optional questions from /profile/setup)
-- Run in Supabase SQL Editor when deploying

ALTER TABLE dating_profiles
ADD COLUMN IF NOT EXISTS attachment_answers JSONB DEFAULT NULL;

COMMENT ON COLUMN dating_profiles.attachment_answers IS
  'Optional free-text answers: { aq1?, aq2?, aq3? } — internal PA calibration only';
