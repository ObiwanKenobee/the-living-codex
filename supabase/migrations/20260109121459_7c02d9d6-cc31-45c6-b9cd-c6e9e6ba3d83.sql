-- Create partner_analytics table for tracking impressions and clicks
CREATE TABLE public.partner_analytics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'click')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    user_agent TEXT,
    referrer TEXT
);

-- Enable RLS
ALTER TABLE public.partner_analytics ENABLE ROW LEVEL SECURITY;

-- Anyone can insert analytics events (for tracking)
CREATE POLICY "Anyone can insert analytics events"
ON public.partner_analytics
FOR INSERT
WITH CHECK (true);

-- Admins can view analytics
CREATE POLICY "Admins can view analytics"
ON public.partner_analytics
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_partner_analytics_partner_id ON public.partner_analytics(partner_id);
CREATE INDEX idx_partner_analytics_event_type ON public.partner_analytics(event_type);
CREATE INDEX idx_partner_analytics_created_at ON public.partner_analytics(created_at);