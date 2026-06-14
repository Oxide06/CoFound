import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState("loading"); // loading, success, error, resend
  const [message, setMessage] = useState("");
  
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (token) {
      authService
        .verifyEmail(token)
        .then((response) => {
          setStatus("success");
          setMessage(response.data?.message || "Your email has been verified!");
          toast.success("Email verified successfully");
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.response?.data?.message || "Invalid or expired verification token.");
        });
    } else {
      setStatus("resend");
    }
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setResending(true);
    try {
      const response = await authService.resendVerification(email);
      toast.success(response.data?.message || "Verification email sent!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend verification link");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 transition-colors duration-200">
      <Card hover={false} className="w-full max-w-md p-6 text-center">
        {status === "loading" && (
          <div className="py-6 space-y-4">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <h1 className="text-sm font-semibold text-text-primary">Verifying email address</h1>
            <p className="text-xs text-text-muted">Please hold on while we confirm your account.</p>
          </div>
        )}

        {status === "success" && (
          <div className="py-4 space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 size={24} />
            </div>
            <h1 className="text-sm font-semibold text-text-primary">Account Verified!</h1>
            <p className="text-xs text-text-muted">{message}</p>
            <div className="pt-2">
              <Link to="/login">
                <Button fullWidth size="sm">Log In</Button>
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="py-4 space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error/15 text-error">
              <AlertTriangle size={24} />
            </div>
            <h1 className="text-sm font-semibold text-text-primary">Verification Failed</h1>
            <p className="text-xs text-text-muted">{message}</p>
            <div className="pt-4 border-t border-border space-y-4">
              <p className="text-[11px] text-text-muted">Need a new verification link?</p>
              <form onSubmit={handleResend} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button fullWidth size="sm" type="submit" loading={resending}>Resend Verification Link</Button>
              </form>
            </div>
          </div>
        )}

        {status === "resend" && (
          <div className="py-4 space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Mail size={24} />
            </div>
            <h1 className="text-sm font-semibold text-text-primary">Verify your email</h1>
            <p className="text-xs text-text-muted">Enter your email below to request an account verification link.</p>
            
            <form onSubmit={handleResend} className="space-y-3 pt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button fullWidth size="sm" type="submit" loading={resending}>Send Link</Button>
            </form>
            
            <div className="pt-2">
              <Link to="/login" className="text-xs text-primary hover:underline font-medium">
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
