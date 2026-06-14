import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      toast.success(response.data?.message || "Password reset email sent");
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 transition-colors duration-200">
      <Card hover={false} className="w-full max-w-md p-6 text-center">
        {!submitted ? (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <KeyRound size={22} />
            </div>
            <h1 className="text-sm font-semibold text-text-primary">Forgot Password?</h1>
            <p className="text-xs text-text-muted">Enter your email address and we'll send you a link to reset your password.</p>
            
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button fullWidth size="sm" type="submit" loading={loading}>Send Reset Link</Button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
              <Mail size={22} />
            </div>
            <h1 className="text-sm font-semibold text-text-primary">Check your email</h1>
            <p className="text-xs text-text-muted">
              We have sent a password reset link to your email address if it is registered on our platform.
            </p>
          </div>
        )}
        
        <div className="pt-4 mt-2 border-t border-border">
          <Link to="/login" className="text-xs text-primary hover:underline font-medium">
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
