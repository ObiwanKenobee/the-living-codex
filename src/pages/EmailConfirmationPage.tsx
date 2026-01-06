import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const EmailConfirmationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      // Get token hash and type from URL
      const tokenHash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      if (!tokenHash || type !== 'email') {
        // Check if we already have a session (user clicked link in same browser)
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setStatus('success');
          setTimeout(() => navigate('/dashboard'), 2000);
          return;
        }
        
        setStatus('error');
        setErrorMessage('Invalid confirmation link. Please request a new one.');
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'email',
        });

        if (error) {
          setStatus('error');
          setErrorMessage(error.message || 'Failed to verify email. Please try again.');
        } else {
          setStatus('success');
          setTimeout(() => navigate('/dashboard'), 2000);
        }
      } catch (err) {
        setStatus('error');
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

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

          <div className="border divider bg-card p-8 text-center">
            {status === 'loading' && (
              <>
                <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
                <h1 className="text-2xl font-light mb-2">Verifying Email</h1>
                <p className="text-muted-foreground">
                  Please wait while we confirm your email address...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h1 className="text-2xl font-light mb-2">Email Verified!</h1>
                <p className="text-muted-foreground mb-6">
                  Your email has been confirmed. Redirecting to your dashboard...
                </p>
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
                <h1 className="text-2xl font-light mb-2">Verification Failed</h1>
                <p className="text-muted-foreground mb-6">
                  {errorMessage}
                </p>
                <div className="space-x-4">
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    Back to Login
                  </Button>
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

export default EmailConfirmationPage;
