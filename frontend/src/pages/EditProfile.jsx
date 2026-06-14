import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import { ROLES } from "@/constants/roles";
import { SKILLS } from "@/constants/skills";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/userService";
import { normalizeApiData, toCommaString } from "@/utils/helpers";

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      headline: user?.headline || "",
      role: user?.role || "Founder",
      experienceLevel: user?.experienceLevel || "Mid",
      availability: user?.availability || "Full-time",
      skills: toCommaString(user?.skills),
      location: user?.location || "",
      linkedinUrl: user?.linkedinUrl || "",
      githubUrl: user?.githubUrl || "",
      portfolioUrl: user?.portfolioUrl || ""
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "avatar" && value?.[0]) {
          formData.append("avatar", value[0]);
        } else if (key !== "avatar") {
          formData.append(key, value || "");
        }
      });
      
      const response = await userService.updateMe(formData);
      const nextUser = normalizeApiData(response).user;
      updateUser(nextUser);
      toast.success("Profile updated");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-8">
        <Card className="mx-auto max-w-2xl p-6 md:p-8" hover={false}>
          <h1 className="font-display text-lg font-bold text-text-primary">Edit Profile</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Input label="Name" register={register("name")} />
            
            <Input label="Professional Headline" placeholder="e.g. Senior Backend Engineer seeking Fintech Co-Founder" register={register("headline")} />
            
            <Textarea label="Bio" register={register("bio")} maxLength={500} />
            
            <div className="grid gap-4 md:grid-cols-3">
              <label className="block space-y-1.5">
                <span className="label-caps">Role</span>
                <select className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none focus:border-primary" {...register("role")}>
                  {ROLES.map((role) => <option key={role}>{role}</option>)}
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="label-caps">Experience Level</span>
                <select className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none focus:border-primary" {...register("experienceLevel")}>
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="label-caps">Availability</span>
                <select className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none focus:border-primary" {...register("availability")}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Location" register={register("location")} />
              <Input label="Skills" placeholder={SKILLS.slice(0, 4).join(", ")} register={register("skills")} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Input label="LinkedIn URL" register={register("linkedinUrl")} />
              <Input label="GitHub URL" register={register("githubUrl")} />
              <Input label="Portfolio Website" register={register("portfolioUrl")} />
            </div>

            <Input label="Profile Photo" type="file" accept="image/*" register={register("avatar")} />
            
            <div className="pt-2">
              <Button type="submit" loading={loading}>Save Profile</Button>
            </div>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
