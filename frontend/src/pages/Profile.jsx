import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Github, Linkedin, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/userService";
import { connectionService } from "@/services/connectionService";
import { normalizeApiData } from "@/utils/helpers";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const profileId = params.get("id");
  const [profile, setProfile] = useState(user);
  const isOwnProfile = !profileId || profileId === user?._id;

  useEffect(() => {
    if (!profileId) {
      setProfile(user);
      return;
    }
    userService
      .getUserByUsername(profileId)
      .then((response) => setProfile(normalizeApiData(response).user))
      .catch(() => setProfile(user));
  }, [profileId, user]);

  const connect = async () => {
    try {
      await connectionService.sendRequest(profile._id);
      toast.success("Connection request sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send request");
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-12">
        <Card className="relative overflow-hidden p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row">
            <Avatar src={profile?.avatar?.url || profile?.avatarUrl} name={profile?.name} size="xl" className="rounded-2xl" />
            <div className="flex-1">
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h1 className="font-display text-4xl font-bold">{profile?.name || "CoFound Builder"}</h1>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Badge tone="primary">{profile?.role || "Founder"}</Badge>
                    <span className="flex items-center gap-1 text-sm text-text-muted"><MapPin size={15} /> {profile?.location || "Remote"}</span>
                  </div>
                </div>
                {isOwnProfile ? (
                  <Link to="/profile/edit"><Button>Edit Profile</Button></Link>
                ) : (
                  <Button onClick={connect}>Connect</Button>
                )}
              </div>
              <p className="mt-6 max-w-3xl text-text-muted">{profile?.bio || "Building high-impact products with ambitious collaborators."}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(profile?.skills?.length ? profile.skills : ["React", "Product Management", "Growth"]).map((skill) => <Badge key={skill}>{skill}</Badge>)}
              </div>
              <div className="mt-6 flex gap-4 text-text-muted">
                {profile?.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin /></a>}
                {profile?.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer"><Github /></a>}
              </div>
            </div>
          </div>
        </Card>

        <section className="mt-10">
          <h2 className="mb-5 font-display text-2xl font-semibold">Startup Ideas</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {["Decentralized Data Marketplace", "AI-Driven API Orchestrator"].map((idea) => (
              <Card key={idea}>
                <h3 className="font-display text-xl font-semibold">{idea}</h3>
                <p className="mt-3 text-text-muted">A focused venture concept seeking complementary founder talent.</p>
                <div className="mt-5 flex gap-2"><Badge tone="secondary">MVP</Badge><Badge>AI</Badge></div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
