-- SQL Schema for Alt-F4 Fix Customer Quotes Database (Supabase)

-- 1. Create customer_quotes table
CREATE TABLE IF NOT EXISTS public.customer_quotes (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    device TEXT NOT NULL,
    issue TEXT NOT NULL,
    addons JSONB DEFAULT '[]'::jsonb,
    total NUMERIC NOT NULL,
    status TEXT DEFAULT 'Pendiente',
    notes TEXT
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.customer_quotes ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public (anon & authenticated) to insert quotes from Cotizador Express
CREATE POLICY "Allow public insert to customer_quotes" 
ON public.customer_quotes 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 4. Policy: Allow public to read quotes (or limit to authenticated roles as needed)
CREATE POLICY "Allow public read customer_quotes" 
ON public.customer_quotes 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- 5. Policy: Allow update & delete on customer_quotes
CREATE POLICY "Allow update customer_quotes" 
ON public.customer_quotes 
FOR UPDATE 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow delete customer_quotes" 
ON public.customer_quotes 
FOR DELETE 
TO anon, authenticated 
USING (true);
