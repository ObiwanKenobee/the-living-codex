import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type AuthFormData = z.infer<typeof authSchema>;
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const UserAuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const forgotForm = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate('/dashboard');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please try again.');
          }
          throw error;
        }

        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/confirm`,
            data: {
              full_name: data.fullName,
            },
          },
        });

        if (error) {
          if (error.message.includes('already registered')) {
            throw new Error('This email is already registered. Please sign in instead.');
          }
          throw error;
        }

        toast({
          title: 'Account created!',
          description: 'Welcome to the Atlas Codex community.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onForgotPassword = async (data: ForgotPasswordData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setResetEmailSent(true);
      toast({
        title: 'Reset email sent',
        description: 'Check your inbox for the password reset link.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send reset email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="py-20">
        <div className="container-wide max-w-md mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 font-sans-nav text-xs tracking-wider"
          >
            <ArrowLeft size={14} />
            Return to Codex
          </Link>

          <div className="border divider bg-card p-8">
            {showForgotPassword ? (
              resetEmailSent ? (
                <div className="text-center">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h1 className="text-2xl font-light mb-2">Check Your Email</h1>
                  <p className="text-sm text-muted-foreground mb-6">
                    We've sent a password reset link to your email address.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetEmailSent(false);
                    }}
                  >
                    Back to Login
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-light mb-2">Forgot Password</h1>
                  <p className="text-sm text-muted-foreground mb-8">
                    Enter your email and we'll send you a reset link.
                  </p>

                  <Form {...forgotForm}>
                    <form onSubmit={forgotForm.handleSubmit(onForgotPassword)} className="space-y-6">
                      <FormField
                        control={forgotForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-sans-nav">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your@email.com" 
                                {...field} 
                                className="border-divider"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Back to Login
                    </button>
                  </div>
                </>
              )
            ) : (
              <>
                <h1 className="text-2xl font-light mb-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h1>
                <p className="text-sm text-muted-foreground mb-8">
                  {isLogin 
                    ? 'Welcome back to the Atlas Codex community.' 
                    : 'Join our community of ethical living practitioners.'}
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {!isLogin && (
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-sans-nav">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field} 
                                className="border-divider"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-sans-nav">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your@email.com" 
                              {...field} 
                              className="border-divider"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-sans-nav">Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field} 
                              className="border-divider"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {isLogin && (
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting 
                        ? 'Please wait...' 
                        : isLogin 
                          ? 'Sign In' 
                          : 'Create Account'}
                    </Button>
                  </form>
                </Form>

                <div className="mt-6 pt-6 border-t divider text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      form.reset();
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isLogin 
                      ? "Don't have an account? Create one" 
                      : 'Already have an account? Sign in'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserAuthPage;
