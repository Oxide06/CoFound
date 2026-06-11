import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Camera, Rocket } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ROLES } from "@/constants/roles";
import { useAuth } from "@/hooks/useAuth";
import { emailPattern, minLength, required } from "@/utils/validators";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const { register: createAccount } = useAuth();
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
      await createAccount(formData);
      toast.success("Registered successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell grid min-h-screen place-items-center px-4 py-10">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-8">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 font-display text-2xl font-bold text-primary-soft">
          <Rocket size={22} /> CoFound
        </Link>
        <h1 className="font-display text-3xl font-semibold">Join CoFound</h1>
        <p className="mt-2 text-text-muted">Connect with founders, developers, designers, and business minds.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-center transition hover:border-primary/50">
            <Camera className="mb-3 text-primary-soft" />
            <span className="font-medium">{photo ? photo.name : "Upload profile photo"}</span>
            <span className="mt-1 text-xs text-text-muted">Uploaded through the CoFound API to Cloudinary. JPG, PNG, WebP.</span>
            <input type="file" accept="image/*" className="hidden" onChange={(event) => setPhoto(event.target.files?.[0] || null)} />
          </label>
          <div className="grid gap-5 md:grid-cols-2">
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
            <span className="label-caps">Role</span>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
              {ROLES.map((role) => (
                <label key={role} className="cursor-pointer">
                  <input type="radio" value={role} className="peer sr-only" {...register("role", required("Role"))} />
                  <span className="block rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center text-sm text-text-muted peer-checked:border-primary peer-checked:bg-primary/15 peer-checked:text-primary-soft">
                    {role}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Join CoFound
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-soft">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
