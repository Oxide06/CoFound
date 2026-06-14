import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Github, Linkedin, MapPin, Globe, Lightbulb, Users, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/userService";
import { connectionService } from "@/services/connectionService";
import { ideaService } from "@/services/ideaService";
import { normalizeApiData } from "@/utils/helpers";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const profileId = params.get("id");
  const [profile, setProfile] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const isOwnProfile = !profileId || profileId === user?._id;

  const loadProfile = () => {
    setLoading(true);
    const idToFetch = profileId || user?._id;
    if (!idToFetch) {
      setLoading(false);
      return;
    }

    userService
      .getUserByUsername(idToFetch)
      .then((response) => {
        setProfile(normalizeApiData(response).user);
      })
      .catch(() => {
        toast.error("Unable to load profile");
      })
      .finally(() => setLoading(false));
  };

  const loadIdeas = () => {
    const idToFetch = profileId || user?._id;
    if (!idToFetch) return;

    setLoadingIdeas(true);
    ideaService
      .getAllIdeas({ founder: idToFetch })
      .then((response) => {
        setIdeas(normalizeApiData(response).ideas || []);
      })
      .catch(() => {})
      .finally(() => setLoadingIdeas(false));
  };

  useEffect(() => {
    loadProfile();
    loadIdeas();
  }, [profileId, user?._id]);

  const connect = async () => {
    try {
      await connectionService.sendRequest(profile._id);
      toast.success("Connection request sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send request");
    }
  };

  if (loading) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="container-page py-20 text-center text-xs text-text-muted">
          Loading profile...
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="container-page py-20 text-center text-xs text-text-muted">
          Profile not found
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-8">
        <Card className="relative overflow-hidden p-6 md:p-8" hover={false}>
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <Avatar src={profile?.avatar?.url || profile?.avatarUrl} name={profile?.name} size="xl" className="rounded-2xl" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <h1 className="font-display text-xl font-bold text-text-primary">{profile?.name}</h1>
                  <p className="mt-1 text-xs text-text-muted font-medium">{profile?.role} • {profile?.experienceLevel || "Mid"}</p>
                  
                  {profile?.headline && (
                    <p className="mt-2 text-xs text-primary font-medium italic">
                      "{profile.headline}"
                    </p>
                  )}

                  <div className="mt-3.5 flex flex-wrap gap-2 items-center">
                    <Badge tone={
                      profile?.availability === "Not Available" ? "default" :
                      profile?.availability === "Full-time" ? "success" : "primary"
                    }>
                      {profile?.availability || "Full-time"}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-text-muted"><MapPin size={12} /> {profile?.location || "Remote"}</span>
                  </div>
                </div>
                <div>
                  {isOwnProfile ? (
                    <Link to="/profile/edit"><Button size="sm">Edit Profile</Button></Link>
                  ) : (
                    <Button size="sm" onClick={connect}>Connect</Button>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mt-5 pt-4 border-t border-border">
                <h3 className="label-caps mb-2">About Me</h3>
                <p className="text-xs text-text-muted leading-relaxed whitespace-pre-wrap">
                  {profile?.bio || "No biography provided yet."}
                </p>
              </div>

              {/* Stats & Links */}
              <div className="mt-5 pt-4 border-t border-border grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="label-caps mb-2.5">Stats</h3>
                  <div className="flex gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><Lightbulb size={12} /> Ideas: <strong className="text-text-primary">{profile?.ideasCount || 0}</strong></span>
                    <span className="flex items-center gap-1"><Users size={12} /> Connections: <strong className="text-text-primary">{profile?.connectionsCount || 0}</strong></span>
                  </div>
                </div>

                <div>
                  <h3 className="label-caps mb-2">Links</h3>
                  <div className="flex gap-3 text-text-muted">
                    {profile?.linkedinUrl && (
                      <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition" title="LinkedIn">
                        <Linkedin size={16} />
                      </a>
                    )}
                    {profile?.githubUrl && (
                      <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition" title="GitHub">
                        <Github size={16} />
                      </a>
                    )}
                    {profile?.portfolioUrl && (
                      <a href={profile.portfolioUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition" title="Portfolio">
                        <Globe size={16} />
                      </a>
                    )}
                    {!profile?.linkedinUrl && !profile?.githubUrl && !profile?.portfolioUrl && (
                      <span className="text-xs text-text-muted italic">No external links configured.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-5 pt-4 border-t border-border">
                <h3 className="label-caps mb-2.5">Skills & Capabilities</h3>
                <div className="flex flex-wrap gap-1">
                  {(profile?.skills || []).map((skill) => (
                    <Badge key={skill} tone="default">{skill}</Badge>
                  ))}
                  {(!profile?.skills || profile.skills.length === 0) && (
                    <span className="text-xs text-text-muted italic">No skills listed yet.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Ideas Grid */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
              <Lightbulb size={14} className="text-primary" />
              Startup Ideas
            </h2>
            {isOwnProfile && (
              <Link to="/ideas/post">
                <Button size="sm" variant="outline"><Plus size={12} /> Post New</Button>
              </Link>
            )}
          </div>

          {loadingIdeas ? (
            <div className="text-center py-8 text-xs text-text-muted">Loading ideas...</div>
          ) : ideas.length === 0 ? (
            <div className="text-center py-12 text-xs text-text-muted border border-dashed border-border rounded-xl bg-surface/50">
              No ideas shared by this user yet.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {ideas.map((idea) => (
                <Card key={idea._id} className="p-4 flex flex-col justify-between h-full bg-surface border border-border" hover={true}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge tone="secondary">{idea.stage}</Badge>
                      {idea.equityOffered > 0 && (
                        <span className="text-xs text-success font-medium">{idea.equityOffered}% Equity</span>
                      )}
                    </div>
                    <Link to={`/ideas/${idea._id}`}>
                      <h3 className="text-xs font-semibold text-text-primary hover:text-primary transition">{idea.title}</h3>
                    </Link>
                    <p className="mt-2 text-xs text-text-muted leading-relaxed line-clamp-3">{idea.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-1">
                    {(idea.skillsNeeded || []).map((skill) => (
                      <Badge key={skill} tone="default">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
