-- ============================================================================
-- Maintenance: Clear all News & Announcements
-- ============================================================================
-- Removes every row from the announcements table so the public News &
-- Announcements page shows "No announcements published yet."
--   Dashboard → SQL Editor → New query → paste this file → Run.
--
-- This deletes ALL announcements permanently. Re-add new ones from the admin
-- panel afterwards.
-- ============================================================================

delete from announcements;
