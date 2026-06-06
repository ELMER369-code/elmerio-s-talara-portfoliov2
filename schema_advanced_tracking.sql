-- SQL Script to upgrade the visitors table with advanced hardware tracking and identity linking
ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS cpu_cores INT;
ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS ram_gb INT;
ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS gpu_renderer TEXT;
ALTER TABLE public.visitors ADD COLUMN IF NOT EXISTS email TEXT;
