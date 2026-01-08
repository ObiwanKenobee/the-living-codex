-- Create partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Public can view active partners
CREATE POLICY "Public can view active partners"
  ON public.partners
  FOR SELECT
  USING (is_active = true);

-- Admins can manage partners
CREATE POLICY "Admins can manage partners"
  ON public.partners
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for partner logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('partner-logos', 'partner-logos', true);

-- Storage policies for partner logos
CREATE POLICY "Public can view partner logos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'partner-logos');

CREATE POLICY "Admins can upload partner logos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'partner-logos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update partner logos"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'partner-logos' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete partner logos"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'partner-logos' AND has_role(auth.uid(), 'admin'::app_role));