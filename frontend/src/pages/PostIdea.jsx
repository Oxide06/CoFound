import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import { ROLES } from "@/constants/roles";
import { SKILLS } from "@/constants/skills";
import { ideaService } from "@/services/ideaService";
import { required } from "@/utils/validators";

const STAGES = ["Idea", "MVP", "Seed", "Growth"];

export default function PostIdea() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { stage: "Idea" } });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "coverImage" && value?.[0]) formData.append(key, value[0]);
        else formData.append(key, value);
      });
      await ideaService.createIdea(formData);
      toast.success("Idea posted");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to post idea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-12">
        <Card className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-semibold">Post Startup Idea</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input label="Title" error={errors.title?.message} register={register("title", required("Title"))} />
            <Textarea label="Description" error={errors.description?.message} register={register("description", required("Description"))} />
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="label-caps">Stage</span>
                <select className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3" {...register("stage", required("Stage"))}>
                  {STAGES.map((stage) => <option key={stage}>{stage}</option>)}
                </select>
              </label>
              <Input label="Equity Offered %" type="number" min="0" max="100" register={register("equityOffered")} />
            </div>
            <Input label="Skills Needed" placeholder={SKILLS.slice(0, 5).join(", ")} register={register("skillsNeeded")} />
            <Input label="Looking For" placeholder={ROLES.join(", ")} register={register("lookingFor")} />
            <Input label="Cover Image" type="file" accept="image/*" register={register("coverImage")} />
            <Button type="submit" loading={loading}>Publish Idea</Button>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
