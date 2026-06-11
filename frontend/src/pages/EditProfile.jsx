import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      role: user?.role || "Founder",
      skills: toCommaString(user?.skills),
      location: user?.location || "",
      linkedinUrl: user?.linkedinUrl || "",
      githubUrl: user?.githubUrl || ""
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "avatar" && value?.[0]) formData.append("avatar", value[0]);
        else if (key !== "avatar") formData.append(key, value || "");
      });
      const response = await userService.updateMe(formData);
      const nextUser = normalizeApiData(response).user;
      updateUser(nextUser);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-12">
        <Card className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-semibold">Edit Profile</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input label="Name" register={register("name")} />
            <Textarea label="Bio" register={register("bio")} maxLength={500} />
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="label-caps">Role</span>
                <select className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3" {...register("role")}>
                  {ROLES.map((role) => <option key={role}>{role}</option>)}
                </select>
              </label>
              <Input label="Location" register={register("location")} />
            </div>
            <Input label="Skills" placeholder={SKILLS.slice(0, 4).join(", ")} register={register("skills")} />
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="LinkedIn URL" register={register("linkedinUrl")} />
              <Input label="GitHub URL" register={register("githubUrl")} />
            </div>
            <Input label="Profile Photo" type="file" accept="image/*" register={register("avatar")} />
            <Button type="submit" loading={loading}>Save Profile</Button>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
