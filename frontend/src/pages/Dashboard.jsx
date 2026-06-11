import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit3, Eye, Lightbulb, Plus, UserPlus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { userService } from "@/services/userService";
import { connectionService } from "@/services/connectionService";
import { ideaService } from "@/services/ideaService";
import { normalizeApiData } from "@/utils/helpers";
import { useAuth } from "@/hooks/useAuth";

const suggestionsFallback = [
  { _id: "1", name: "Sarah Jenkins", role: "Developer", skills: ["React", "Node.js"] },
  { _id: "2", name: "David Chen", role: "Marketing", skills: ["Growth", "SEO"] }
];

export default function Dashboard() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState(suggestionsFallback);
  const [counts, setCounts] = useState({ requests: 0, ideas: 0 });

  useEffect(() => {
    userService
      .getAllUsers({ limit: 4 })
      .then((response) => setSuggestions(normalizeApiData(response).users || suggestionsFallback))
      .catch(() => setSuggestions(suggestionsFallback));

    connectionService
      .getConnections()
      .then((response) => setCounts((current) => ({ ...current, requests: normalizeApiData(response).received?.length || 0 })))
      .catch(() => {});

    ideaService
      .getAllIdeas({ limit: 1 })
      .then((response) => setCounts((current) => ({ ...current, ideas: normalizeApiData(response).total || 0 })))
      .catch(() => {});
  }, []);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-10">
        <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <Avatar src={user?.avatar?.url || user?.avatarUrl} name={user?.name || "Founder"} size="lg" />
            <div>
              <h1 className="font-display text-3xl font-semibold">Welcome back, {user?.name || "Founder"}.</h1>
              <p className="mt-1 text-text-muted">Here is what is happening with your network today.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/profile/edit">
              <Button variant="outline"><Edit3 size={16} /> Edit Profile</Button>
            </Link>
            <Link to="/ideas/post">
              <Button><Plus size={16} /> Post Idea</Button>
            </Link>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          {[
            ["Profile Views", user?.profileViews || 0, Eye],
            ["Connection Requests", counts.requests, UserPlus],
            ["Ideas Posted", counts.ideas, Lightbulb]
          ].map(([label, value, Icon]) => (
            <Card key={label}>
              <div className="flex items-center justify-between">
                <span className="label-caps">{label}</span>
                <Icon className="text-primary-soft" />
              </div>
              <div className="mt-4 font-display text-5xl font-bold">{value}</div>
            </Card>
          ))}
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Recent Suggestions</h2>
              <Link to="/explore" className="text-sm text-primary-soft">Browse Co-Founders</Link>
            </div>
            <div className="space-y-4">
              {suggestions.map((person) => (
                <Card key={person._id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar src={person.avatar?.url} name={person.name} />
                    <div>
                      <h3 className="font-semibold">{person.name}</h3>
                      <p className="text-sm text-text-muted">{person.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(person.skills || []).slice(0, 3).map((skill) => <Badge key={skill}>{skill}</Badge>)}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <Card>
            <h2 className="font-display text-2xl font-semibold">Quick Actions</h2>
            <p className="mt-3 text-text-muted">Complete your profile and post your current startup idea to improve match quality.</p>
            <div className="mt-6 space-y-3">
              <Link to="/profile/edit" className="block"><Button fullWidth variant="outline">Edit Profile</Button></Link>
              <Link to="/ideas/post" className="block"><Button fullWidth>Post Idea</Button></Link>
              <Link to="/explore" className="block"><Button fullWidth variant="secondary">Browse Co-Founders</Button></Link>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
