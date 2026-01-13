-- Create sponsor testimonials table
CREATE TABLE public.sponsor_testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  company_name TEXT NOT NULL,
  tier TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsor_testimonials ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Public can view active testimonials"
ON public.sponsor_testimonials
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage testimonials"
ON public.sponsor_testimonials
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create site settings table for admin email and other configs
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Public can view settings"
ON public.site_settings
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage settings"
ON public.site_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default admin email setting
INSERT INTO public.site_settings (key, value, description)
VALUES ('admin_notification_email', 'admin@example.com', 'Email address for receiving sponsorship application notifications');

-- Add updated_at triggers
CREATE TRIGGER update_sponsor_testimonials_updated_at
BEFORE UPDATE ON public.sponsor_testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();