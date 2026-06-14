import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Briefcase, MessageSquare, Lightbulb, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { ROLES } from "@/constants/roles";
import { SKILLS } from "@/constants/skills";
import { userService } from "@/services/userService";
import { connectionService } from "@/services/connectionService";
import { normalizeApiData } from "@/utils/helpers";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function Explore() {
  const { user: currentUser } = useAuth();
  const [filters, setFilters] = useState({ search: "", role: "", skills: "", location: "" });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = () => {
    setLoading(true);
    userService
      .getAllUsers(filters)
      .then((response) => setUsers(normalizeApiData(response).users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadUsers();
    }, 250);

    return () => clearTimeout(timeout);
  }, [filters]);

  const handleConnect = async (targetUserId) => {
    try {
      await connectionService.sendRequest(targetUserId);
      toast.success("Connection request sent!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send connection request");
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-text-primary">Discover Founders</h1>
          <p className="mt-1 text-xs text-text-muted">Find other creators, developers, designers, and marketers in the CoFound community.</p>
        </div>

        {/* Filters */}
        <Card className="mb-6 p-4" hover={false}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-text-muted" size={14} />
              <input
                className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-1.5 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary/20"
                placeholder="Search name or keyword"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <select
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-primary outline-none focus:border-primary"
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option value="">All Roles</option>
              {ROLES.map((role) => <option key={role}>{role}</option>)}
            </select>
            <select
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-primary outline-none focus:border-primary"
              value={filters.skills}
              onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
            >
              <option value="">All Skills</option>
              {SKILLS.slice(0, 15).map((skill) => <option key={skill}>{skill}</option>)}
            </select>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 text-text-muted" size={14} />
              <input
                className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-1.5 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary/20"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* User Directory Grid */}
        {loading ? (
          <div className="text-center py-10 text-xs text-text-muted">Loading co-founders...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 text-xs text-text-muted">No co-founders match your search criteria.</div>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((person) => {
              const isSelf = currentUser?._id === person._id;
              return (
                <Card key={person._id} className="p-4 flex flex-col justify-between h-full bg-surface border border-border" hover={true}>
                  <div>
                    {/* User Card Header */}
                    <div className="flex items-start gap-3">
                      <Avatar src={person.avatar?.url} name={person.name} size="md" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h2 className="text-xs font-semibold text-text-primary truncate">{person.name}</h2>
                          <Badge tone={
                            person.availability === "Not Available" ? "default" :
                            person.availability === "Full-time" ? "success" : "primary"
                          }>
                            {person.availability || "Full-time"}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-primary font-medium">{person.role} • {person.experienceLevel || "Mid"}</p>
                        <p className="flex items-center gap-1 mt-1 text-[10px] text-text-muted">
                          <MapPin size={10} /> {person.location || "Remote"}
                        </p>
                      </div>
                    </div>

                    {/* Headline */}
                    <p className="mt-3 text-[11px] text-text-muted line-clamp-2 italic leading-relaxed">
                      "{person.headline || `Building the future of startup collaborations.`}"
                    </p>

                    {/* Stats */}
                    <div className="mt-3 py-1.5 px-2.5 rounded-md bg-surface-high/50 flex items-center justify-between text-[10px] text-text-muted border border-border/40">
                      <span className="flex items-center gap-1"><Lightbulb size={11} /> Ideas: <strong className="text-text-primary">{person.ideasCount || 0}</strong></span>
                      <span className="flex items-center gap-1"><Users size={11} /> Connections: <strong className="text-text-primary">{person.connectionsCount || 0}</strong></span>
                    </div>

                    {/* Skills */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {(person.skills || []).slice(0, 3).map((skill) => (
                        <Badge key={skill} tone="default">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
                    <Link to={`/profile?id=${person._id}`} className="flex-1">
                      <Button fullWidth size="sm" variant="outline">View Profile</Button>
                    </Link>
                    {!isSelf && (
                      <Button size="sm" onClick={() => handleConnect(person._id)}>Connect</Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
