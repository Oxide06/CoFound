import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Handshake } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ideaService } from "@/services/ideaService";
import { connectionService } from "@/services/connectionService";
import { normalizeApiData } from "@/utils/helpers";

const fallbackIdea = {
  title: "AI Founder Match Engine",
  description: "A startup matching layer that uses skill graphs and collaboration intent to create high-signal founder introductions.",
  stage: "MVP",
  skillsNeeded: ["React", "Machine Learning", "Growth"],
  lookingFor: ["Developer", "Marketing"],
  equityOffered: 20,
  founder: { _id: "founder", name: "Alex Chen", role: "Founder" }
};

export default function StartupIdea() {
  const { id } = useParams();
  const [idea, setIdea] = useState(fallbackIdea);

  useEffect(() => {
    ideaService
      .getIdeaById(id)
      .then((response) => setIdea(normalizeApiData(response).idea || fallbackIdea))
      .catch(() => setIdea(fallbackIdea));
  }, [id]);

  const interested = async () => {
    try {
      await connectionService.sendRequest(idea.founder?._id);
      toast.success("Interest sent to founder");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send interest");
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-12">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Card className="p-8">
            {idea.coverImage?.url && <img src={idea.coverImage.url} alt={idea.title} className="mb-8 h-72 w-full rounded-2xl object-cover" />}
            <Badge tone="primary">{idea.stage}</Badge>
            <h1 className="mt-5 font-display text-4xl font-bold">{idea.title}</h1>
            <p className="mt-6 text-lg leading-8 text-text-muted">{idea.description}</p>
            <div className="mt-8">
              <h2 className="mb-3 font-display text-xl font-semibold">Skills Needed</h2>
              <div className="flex flex-wrap gap-2">{(idea.skillsNeeded || []).map((skill) => <Badge key={skill}>{skill}</Badge>)}</div>
            </div>
          </Card>
          <Card className="h-fit">
            <h2 className="font-display text-xl font-semibold">Founder</h2>
            <div className="mt-5 flex items-center gap-4">
              <Avatar src={idea.founder?.avatar?.url} name={idea.founder?.name} />
              <div>
                <div className="font-semibold">{idea.founder?.name}</div>
                <div className="text-sm text-text-muted">{idea.founder?.role}</div>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-text-muted">
              <p>Looking for: {(idea.lookingFor || []).join(", ")}</p>
              <p>Equity offered: {idea.equityOffered || 0}%</p>
            </div>
            <Button className="mt-6" fullWidth onClick={interested}><Handshake size={17} /> I&apos;m Interested</Button>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
