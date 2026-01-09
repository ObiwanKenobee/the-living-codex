-- Add tier column to partners table
ALTER TABLE public.partners 
ADD COLUMN tier text DEFAULT 'silver' CHECK (tier IN ('gold', 'silver', 'bronze'));