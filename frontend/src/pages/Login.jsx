import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { emailPattern, minLength, required } from "@/utils/validators";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [unverified, setUnverified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setUnverified(false);
    setUserEmail(data.email);
    try {
      await login(data);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      const errMsg = error.response?.data?.message || "Login failed";
      toast.error(errMsg);
      if (errMsg.toLowerCase().includes("verify")) {
        setUnverified(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell grid min-h-screen place-items-center px-4 py-8 bg-background">
      <div className="glass-panel w-full max-w-md rounded-xl p-6 border border-border bg-surface">
        <Link to="/" className="mb-4 inline-flex font-display text-lg font-bold text-primary">
          CoFound
        </Link>
        <h1 className="font-display text-lg font-semibold text-text-primary">Welcome Back</h1>
        <p className="text-xs text-text-muted">Sign in to continue to CoFound.</p>
        
        {unverified && (
          <div className="mt-4 p-3 rounded-lg border border-primary/20 bg-primary/5 text-xs text-text-primary">
            Please verify your email address. Need a verification link?{" "}
            <Link to={`/verify-email?email=${encodeURIComponent(userEmail)}`} className="text-primary font-semibold hover:underline">
              Verify Account
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            register={register("email", { ...required("Email"), pattern: emailPattern })}
          />
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="label-caps">Password</span>
              <Link to="/forgot-password" className="text-[10px] font-semibold text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary/20`}
              {...register("password", { ...required("Password"), ...minLength(6) })}
            />
            {errors.password?.message && (
              <span className="text-[11px] text-error mt-1 block">{errors.password.message}</span>
            )}
          </div>
          
          <Button type="submit" fullWidth loading={loading}>
            Login <ArrowRight size={14} />
          </Button>
        </form>
        
        <p className="mt-5 text-center text-xs text-text-muted">
          <Mail className="mr-1 inline" size={12} />
          No account yet?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
