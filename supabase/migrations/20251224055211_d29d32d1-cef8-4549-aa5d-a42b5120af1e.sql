-- Create storage bucket for downloadable PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true);

-- Policy for public read access to resources bucket
CREATE POLICY "Public can view resources" ON storage.objects FOR SELECT USING (bucket_id = 'resources');

-- Policy for admins to upload resources (will be enforced via edge function)
CREATE POLICY "Anyone can upload to resources" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resources');

-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for admin management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin whitelist table for email-based admin access
CREATE TABLE public.admin_whitelist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_whitelist
ALTER TABLE public.admin_whitelist ENABLE ROW LEVEL SECURITY;

-- Add default admin email
INSERT INTO public.admin_whitelist (email) VALUES ('admin@theethosfoundation.org');

-- Function to check if email is whitelisted as admin
CREATE OR REPLACE FUNCTION public.is_admin_email(_email TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_whitelist
    WHERE LOWER(email) = LOWER(_email)
  )
$$;

-- Function to auto-assign admin role on signup if email is whitelisted
CREATE OR REPLACE FUNCTION public.handle_admin_on_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_admin_email(NEW.email) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to auto-assign admin role
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_on_signup();

-- Events table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL CHECK (event_type IN ('workshop', 'seminar', 'retreat', 'lecture', 'community')),
    location TEXT,
    is_virtual BOOLEAN DEFAULT false,
    virtual_link TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    max_attendees INTEGER,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    image_url TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public can view published events
CREATE POLICY "Public can view published events" ON public.events FOR SELECT USING (is_published = true);

-- Admins can manage events
CREATE POLICY "Admins can manage events" ON public.events FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Event registrations table
CREATE TABLE public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    notes TEXT,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'waitlist')),
    registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (event_id, email)
);

-- Enable RLS on event_registrations
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can register for events
CREATE POLICY "Anyone can register for events" ON public.event_registrations FOR INSERT WITH CHECK (true);

-- Admins can view all registrations
CREATE POLICY "Admins can view registrations" ON public.event_registrations FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update registrations
CREATE POLICY "Admins can update registrations" ON public.event_registrations FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete registrations
CREATE POLICY "Admins can delete registrations" ON public.event_registrations FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to read newsletter_subscribers
CREATE POLICY "Admins can view subscribers" ON public.newsletter_subscribers FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to read contact_messages
CREATE POLICY "Admins can view contact messages" ON public.contact_messages FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view user_roles
CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Insert sample events
INSERT INTO public.events (title, description, event_type, location, is_virtual, start_date, end_date, max_attendees, registration_deadline) VALUES
('Introduction to Ethical Living', 'A foundational workshop exploring the core principles of ethical decision-making and conscious living. Perfect for those beginning their journey with The Ethos Foundation.', 'workshop', 'The Ethos Center, Portland, OR', false, '2025-02-15 10:00:00+00', '2025-02-15 16:00:00+00', 30, '2025-02-10 23:59:59+00'),
('Monthly Contemplation Circle', 'Join us for our monthly virtual gathering where community members share insights, discuss challenges, and support each other in ethical practice.', 'community', NULL, true, '2025-01-28 19:00:00+00', '2025-01-28 21:00:00+00', 50, '2025-01-27 23:59:59+00'),
('The Architecture of Character', 'A deep-dive seminar into building lasting moral character through daily practices and intentional habit formation.', 'seminar', 'Online via Zoom', true, '2025-03-08 14:00:00+00', '2025-03-08 17:00:00+00', 100, '2025-03-05 23:59:59+00'),
('Spring Ethical Retreat', 'A three-day immersive retreat in nature, combining philosophical exploration with practical exercises for ethical living.', 'retreat', 'Mountain Sanctuary, Ashland, OR', false, '2025-04-18 09:00:00+00', '2025-04-20 17:00:00+00', 20, '2025-04-01 23:59:59+00');