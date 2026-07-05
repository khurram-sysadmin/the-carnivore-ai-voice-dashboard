-- Call logs audio/transcript persistence migration
-- Run this once in Supabase SQL Editor for an existing dashboard database.

ALTER TABLE public.call_logs
  ADD COLUMN IF NOT EXISTS conversation_id TEXT,
  ADD COLUMN IF NOT EXISTS agent_id TEXT,
  ADD COLUMN IF NOT EXISTS transcript_summary TEXT,
  ADD COLUMN IF NOT EXISTS audio_url TEXT,
  ADD COLUMN IF NOT EXISTS has_audio BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS main_language TEXT,
  ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'dashboard';

CREATE UNIQUE INDEX IF NOT EXISTS idx_call_logs_conversation_id_unique
  ON public.call_logs(conversation_id)
  WHERE conversation_id IS NOT NULL AND conversation_id <> '';

CREATE INDEX IF NOT EXISTS idx_call_logs_created_at
  ON public.call_logs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_call_logs_status
  ON public.call_logs(status);

UPDATE public.call_logs
SET
  source = COALESCE(NULLIF(source, ''), 'dashboard'),
  has_audio = CASE
    WHEN COALESCE(audio_url, '') <> '' OR COALESCE(conversation_id, '') <> '' THEN TRUE
    ELSE COALESCE(has_audio, FALSE)
  END;
