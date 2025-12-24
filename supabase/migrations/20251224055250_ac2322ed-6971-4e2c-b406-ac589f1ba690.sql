-- Add policy for admin_whitelist - only admins can view/manage
CREATE POLICY "Admins can view whitelist" ON public.admin_whitelist FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage whitelist" ON public.admin_whitelist FOR ALL USING (public.has_role(auth.uid(), 'admin'));