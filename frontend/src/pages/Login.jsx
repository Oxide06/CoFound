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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell grid min-h-screen place-items-center px-4 py-10">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8">
        <Link to="/" className="mb-8 inline-flex font-display text-2xl font-bold text-primary-soft">
          CoFound
        </Link>
        <h1 className="font-display text-3xl font-semibold">Welcome Back</h1>
        <p className="mt-2 text-text-muted">Sign in to continue to CoFound.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            register={register("email", { ...required("Email"), pattern: emailPattern })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            register={register("password", { ...required("Password"), ...minLength(6) })}
          />
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Login <ArrowRight size={18} />
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-text-muted">
          <Mail className="mr-1 inline" size={14} />
          No account yet?{" "}
          <Link to="/register" className="text-primary-soft">
            Register
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-text-muted">
          <Lock className="mr-1 inline" size={12} />
          Protected by secure token authentication.
        </p>
      </div>
    </main>
  );
}
