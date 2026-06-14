import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Missing password reset token");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.resetPassword(token, password);
      toast.success(response.data?.message || "Password reset successful!");
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 transition-colors duration-200">
      <Card hover={false} className="w-full max-w-md p-6 text-center">
        {!token ? (
          <div className="space-y-4 py-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error/15 text-error">
              <ShieldAlert size={22} />
            </div>
            <h1 className="text-sm font-semibold text-text-primary">Invalid Link</h1>
            <p className="text-xs text-text-muted">This password reset link is invalid or has expired.</p>
            <div className="pt-2">
              <Link to="/forgot-password">
                <Button fullWidth size="sm">Request New Link</Button>
              </Link>
            </div>
          </div>
        ) : success ? (
          <div className="space-y-4 py-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 size={22} />
            </div>
            <h1 className="text-sm font-semibold text-text-primary">Password Reset Successful!</h1>
            <p className="text-xs text-text-muted">Your password has been successfully updated. Redirecting to login...</p>
            <div className="pt-2">
              <Link to="/login">
                <Button fullWidth size="sm">Log In Now</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-sm font-semibold text-text-primary">Reset your password</h1>
            <p className="text-xs text-text-muted">Enter and confirm your new password below.</p>
            
            <form onSubmit={handleSubmit} className="space-y-3 pt-2 text-left">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-text-muted mb-1 tracking-wider">New Password</label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-text-muted mb-1 tracking-wider">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button fullWidth size="sm" type="submit" loading={loading}>Update Password</Button>
              </div>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
}
