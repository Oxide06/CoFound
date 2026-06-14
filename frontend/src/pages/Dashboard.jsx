import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit3, Eye, Lightbulb, Plus, UserPlus, Users, Check, X } from "lucide-react";
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
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [counts, setCounts] = useState({ requests: 0, ideas: 0, connected: 0 });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [myIdeas, setMyIdeas] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingIdeas, setLoadingIdeas] = useState(true);

  const fetchData = () => {
    // Get recommendations
    userService
      .getAllUsers({ limit: 3 })
      .then((response) => {
        const data = normalizeApiData(response);
        // filter out current user
        const list = (data.users || []).filter(u => u._id !== user?._id);
        setSuggestions(list.slice(0, 3));
      })
      .catch(() => {});

    // Get pending connection requests
    setLoadingRequests(true);
    connectionService
      .getConnections()
      .then((response) => {
        const data = normalizeApiData(response);
        const received = data.received || [];
        const connected = data.connected || [];
        setPendingRequests(received);
        setCounts((current) => ({
          ...current,
          requests: received.length,
          connected: connected.length
        }));
      })
      .catch(() => {})
      .finally(() => setLoadingRequests(false));

    // Get user's own ideas
    if (user?._id) {
      setLoadingIdeas(true);
      ideaService
        .getAllIdeas({ founder: user._id })
        .then((response) => {
          const data = normalizeApiData(response);
          const list = data.ideas || [];
          setMyIdeas(list);
          setCounts((current) => ({
            ...current,
            ideas: list.length
          }));
        })
        .catch(() => {})
        .finally(() => setLoadingIdeas(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?._id]);

  const handleConnectionAction = async (connectionId, action) => {
    try {
      await connectionService.updateStatus(connectionId, action);
      toast.success(`Request ${action}`);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update request");
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-6">
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3.5">
            <Avatar src={user?.avatar?.url || user?.avatarUrl} name={user?.name || "User"} size="lg" />
            <div>
              <h1 className="font-display text-xl font-semibold text-text-primary">Welcome, {user?.name || "Founder"}.</h1>
              <p className="text-xs text-text-muted">{user?.headline || "Ready to connect and build startups"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/profile/edit">
              <Button size="sm" variant="outline"><Edit3 size={13} /> Edit Profile</Button>
            </Link>
            <Link to="/ideas/post">
              <Button size="sm"><Plus size={13} /> Post Idea</Button>
            </Link>
          </div>
        </header>

        {/* Metrics Section */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            ["Profile Views", user?.profileViews || 0, Eye],
            ["Pending Requests", counts.requests, UserPlus],
            ["My Posted Ideas", counts.ideas, Lightbulb]
          ].map(([label, value, Icon]) => (
            <Card key={label} className="p-4 flex items-center justify-between" hover={false}>
              <div className="space-y-1">
                <span className="label-caps block text-[9px]">{label}</span>
                <div className="font-display text-2xl font-bold text-text-primary">{value}</div>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Icon size={16} className="text-primary" />
              </div>
            </Card>
          ))}
        </section>

        {/* Dashboard Grid */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Main Column */}
          <div className="space-y-6">
            {/* Pending Connection Requests Widget */}
            <Card hover={false} className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                  <UserPlus size={14} className="text-primary" />
                  Pending Connection Requests
                </h2>
                <Link to="/connections" className="text-[11px] text-primary hover:underline">View All</Link>
              </div>

              {loadingRequests ? (
                <div className="text-center py-4 text-xs text-text-muted">Loading requests...</div>
              ) : pendingRequests.length === 0 ? (
                <div className="text-center py-6 text-xs text-text-muted border border-dashed border-border rounded-lg bg-background/50">
                  No pending connection requests.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {pendingRequests.map((req) => (
                    <div key={req._id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <Avatar src={req.sender?.avatar?.url} name={req.sender?.name} size="sm" />
                        <div>
                          <div className="text-xs font-medium text-text-primary">{req.sender?.name}</div>
                          <div className="text-[10px] text-text-muted">{req.sender?.role}</div>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleConnectionAction(req._id, "accepted")}
                          className="rounded p-1 bg-success/10 text-success hover:bg-success/20 transition"
                          title="Accept"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => handleConnectionAction(req._id, "rejected")}
                          className="rounded p-1 bg-error/10 text-error hover:bg-error/20 transition"
                          title="Ignore"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Active Startup Ideas Widget */}
            <Card hover={false} className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-primary" />
                  My Active Ideas
                </h2>
                <Link to="/ideas/post" className="text-[11px] text-primary hover:underline">New Idea</Link>
              </div>

              {loadingIdeas ? (
                <div className="text-center py-4 text-xs text-text-muted">Loading ideas...</div>
              ) : myIdeas.length === 0 ? (
                <div className="text-center py-8 text-xs text-text-muted border border-dashed border-border rounded-lg bg-background/50 flex flex-col items-center justify-center gap-2">
                  <p>You haven't posted any startup ideas yet.</p>
                  <Link to="/ideas/post"><Button size="sm">Create First Idea</Button></Link>
                </div>
              ) : (
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {myIdeas.map((idea) => (
                    <Card key={idea._id} className="p-3.5 border border-border bg-surface-high/40 hover:bg-surface-high/75" hover={true}>
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-primary font-semibold">{idea.stage}</span>
                            {idea.equityOffered > 0 && (
                              <span className="text-[10px] text-success font-medium">{idea.equityOffered}% Equity</span>
                            )}
                          </div>
                          <Link to={`/ideas/${idea._id}`}>
                            <h3 className="text-xs font-semibold text-text-primary hover:text-primary transition">{idea.title}</h3>
                          </Link>
                          <p className="mt-1 text-[11px] text-text-muted line-clamp-2">{idea.description}</p>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-border flex flex-wrap gap-1">
                          {(idea.skillsNeeded || []).slice(0, 3).map(skill => (
                            <Badge key={skill} tone="default">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Quick Suggestions Widget */}
            <Card hover={false} className="p-5">
              <h2 className="text-sm font-semibold text-text-primary mb-3">Recommended Connections</h2>
              {suggestions.length === 0 ? (
                <div className="text-xs text-text-muted">No recommendations found.</div>
              ) : (
                <div className="space-y-3.5">
                  {suggestions.map((person) => (
                    <div key={person._id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={person.avatar?.url} name={person.name} size="sm" />
                        <div>
                          <Link to={`/profile?id=${person._id}`} className="text-xs font-semibold text-text-primary hover:text-primary hover:underline transition">
                            {person.name}
                          </Link>
                          <p className="text-[10px] text-text-muted">{person.role}</p>
                        </div>
                      </div>
                      <Link to={`/profile?id=${person._id}`}>
                        <Button size="sm" variant="outline">View</Button>
                      </Link>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-border">
                    <Link to="/explore" className="block text-center text-xs text-primary font-semibold hover:underline">
                      Browse All Founders
                    </Link>
                  </div>
                </div>
              )}
            </Card>

            {/* Platform Help Widget */}
            <Card hover={false} className="p-5 bg-primary/5 border border-primary/10">
              <h2 className="text-xs font-semibold text-primary mb-1">Completing your Profile</h2>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Startups thrive on clear roles and capabilities. Ensure your bio, location, headline, and top skills are detailed to help other co-founders discover you.
              </p>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
