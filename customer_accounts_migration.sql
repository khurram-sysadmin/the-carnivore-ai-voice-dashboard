-- Customer accounts for the public Carnivore welcome/signup/login page.
-- Run this once in Supabase SQL Editor before enabling customer signup in production.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS customer_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customer_accounts_email ON customer_accounts(email);
CREATE INDEX IF NOT EXISTS idx_customer_accounts_phone ON customer_accounts(phone);

ALTER TABLE customer_accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow service role customer account access" ON customer_accounts;
CREATE POLICY "Allow service role customer account access" ON customer_accounts
    FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
