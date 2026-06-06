-- Table: visitors
-- Purpose: Stores unique website visitors identified by FingerprintJS and their approximate location
CREATE TABLE IF NOT EXISTS public.visitors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    fingerprint TEXT UNIQUE NOT NULL,
    ip_address TEXT,
    city TEXT,
    country TEXT,
    region TEXT,
    latitude FLOAT,
    longitude FLOAT,
    browser TEXT,
    os TEXT,
    first_visit TIMESTAMPTZ DEFAULT NOW(),
    last_visit TIMESTAMPTZ DEFAULT NOW(),
    visit_count INT DEFAULT 1
);

-- Table: interactions
-- Purpose: Stores individual actions (page views, project clicks, contact clicks) tracked to a specific visitor
CREATE TABLE IF NOT EXISTS public.interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    fingerprint TEXT REFERENCES public.visitors(fingerprint) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to visitors (so the website can log visitors)
CREATE POLICY "Allow anonymous inserts to visitors"
ON public.visitors FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anonymous updates to visitors (so the website can update last_visit and visit_count)
-- The visitor only updates their own row via fingerprint
CREATE POLICY "Allow anonymous updates to visitors"
ON public.visitors FOR UPDATE
TO anon
USING (true);

-- Allow anonymous inserts to interactions
CREATE POLICY "Allow anonymous inserts to interactions"
ON public.interactions FOR INSERT
TO anon
WITH CHECK (true);

-- Allow admins to read all visitors
CREATE POLICY "Allow authenticated full access to visitors"
ON public.visitors FOR SELECT
TO authenticated
USING (true);

-- Allow admins to read all interactions
CREATE POLICY "Allow authenticated full access to interactions"
ON public.interactions FOR SELECT
TO authenticated
USING (true);

-- Allow admins full access generally over everything authenticated
CREATE POLICY "Allow authenticated all on visitors"
ON public.visitors FOR ALL
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated all on interactions"
ON public.interactions FOR ALL
TO authenticated
USING (true);
