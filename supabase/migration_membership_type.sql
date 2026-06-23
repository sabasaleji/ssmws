-- ============================================================================
-- Migration: Membership type (annual / lifetime) on memberships
-- ============================================================================
-- Run this ONCE in your existing Supabase project if you already ran schema.sql
-- before this feature existed:
--   Dashboard → SQL Editor → New query → paste this file → Run.
--
-- Members now choose a plan when registering. The only difference is the fee:
--   'annual'   → ₹100 per year
--   'lifetime' → ₹2,500 one-time
-- Existing rows default to 'annual'. Safe to run once.
-- ============================================================================

alter table memberships
  add column if not exists "membershipType" text not null default 'annual';
