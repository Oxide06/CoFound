import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Camera, Rocket } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ROLES } from "@/constants/roles";
import { authService } from "@/services/authService";
import { emailPattern, minLength, required } from "@/utils/validators";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ defaultValues: { role: "Founder" } });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      if (photo) formData.append("avatar", photo);
      
      const response = await authService.register(formData);
      toast.success("Account created! Verification link sent to your email.");
      navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell grid min-h-screen place-items-center px-4 py-8 bg-background">
      <div className="glass-panel w-full max-w-xl rounded-xl p-6 border border-border bg-surface">
        <Link to="/" className="mb-4 inline-flex items-center gap-1.5 font-display text-lg font-bold text-primary">
          <Rocket size={18} /> CoFound
        </Link>
        <h1 className="font-display text-lg font-semibold text-text-primary">Join CoFound</h1>
        <p className="text-xs text-text-muted">Connect with founders, developers, designers, and business minds.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface-high/30 p-4 text-center transition hover:border-primary">
            <Camera className="mb-2 text-primary" size={20} />
            <span className="text-xs font-semibold text-text-primary">{photo ? photo.name : "Upload profile photo"}</span>
            <span className="mt-0.5 text-[10px] text-text-muted">Uploaded to Cloudinary. JPG, PNG, WebP.</span>
            <input type="file" accept="image/*" className="hidden" onChange={(event) => setPhoto(event.target.files?.[0] || null)} />
          </label>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full Name" error={errors.name?.message} register={register("name", required("Full name"))} />
            <Input label="Email" type="email" error={errors.email?.message} register={register("email", { ...required("Email"), pattern: emailPattern })} />
            <Input label="Password" type="password" error={errors.password?.message} register={register("password", { ...required("Password"), ...minLength(6) })} />
            <Input
              label="Confirm Password"
              type="password"
              error={errors.confirmPassword?.message}
              register={register("confirmPassword", {
                validate: (value) => value === watch("password") || "Passwords must match"
              })}
            />
          </div>
          
          <div>
            <span className="label-caps">Select Role</span>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {ROLES.map((role) => (
                <label key={role} className="cursor-pointer">
                  <input type="radio" value={role} className="peer sr-only" {...register("role", required("Role"))} />
                  <span className="block rounded-lg border border-border bg-surface py-2 text-center text-xs text-text-muted peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition">
                    {role}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <Button type="submit" fullWidth loading={loading}>
            Join CoFound
          </Button>
        </form>
        
        <p className="mt-5 text-center text-xs text-text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
