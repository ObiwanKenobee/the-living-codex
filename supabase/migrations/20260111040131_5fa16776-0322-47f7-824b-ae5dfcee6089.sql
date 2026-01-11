-- Create sponsorship_tiers table for editable pricing
CREATE TABLE public.sponsorship_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL DEFAULT 0,
  period TEXT NOT NULL DEFAULT '/year',
  description TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  is_highlighted BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsorship_tiers ENABLE ROW LEVEL SECURITY;

-- Public can view active tiers
CREATE POLICY "Public can view active sponsorship tiers"
ON public.sponsorship_tiers
FOR SELECT
USING (is_active = true);

-- Admins can manage tiers
CREATE POLICY "Admins can manage sponsorship tiers"
ON public.sponsorship_tiers
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create sponsorship_applications table
CREATE TABLE public.sponsorship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website_url TEXT,
  preferred_tier TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsorship_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application
CREATE POLICY "Anyone can submit sponsorship application"
ON public.sponsorship_applications
FOR INSERT
WITH CHECK (true);

-- Admins can view and manage applications
CREATE POLICY "Admins can view sponsorship applications"
ON public.sponsorship_applications
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update sponsorship applications"
ON public.sponsorship_applications
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete sponsorship applications"
ON public.sponsorship_applications
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_sponsorship_tiers_updated_at
BEFORE UPDATE ON public.sponsorship_tiers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sponsorship_applications_updated_at
BEFORE UPDATE ON public.sponsorship_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default tiers
INSERT INTO public.sponsorship_tiers (name, price, period, description, features, display_order, is_highlighted) VALUES
('Bronze', 500, '/year', 'Essential visibility for emerging partners', '["Logo on website footer carousel", "Monthly newsletter mention", "Partner directory listing"]', 1, false),
('Silver', 1500, '/year', 'Enhanced exposure for growing organizations', '["Logo on website footer carousel", "Monthly newsletter mention", "Partner directory listing", "Event booth space (1 event)", "Quarterly social media feature"]', 2, false),
('Gold', 5000, '/year', 'Premium partnership for maximum impact', '["Premium logo placement on website", "Weekly newsletter features", "Featured partner directory listing", "Event booth space (all events)", "Speaking opportunities at events", "Co-branded content & campaigns"]', 3, true);