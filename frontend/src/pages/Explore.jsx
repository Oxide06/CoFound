import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
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
import { normalizeApiData } from "@/utils/helpers";

const fallbackUsers = [
  { _id: "101", name: "Alex Rivera", role: "Developer", location: "Remote", skills: ["React", "Fintech", "System Design"] },
  { _id: "102", name: "Sarah Chen", role: "Business", location: "SF / Bay Area", skills: ["GTM Strategy", "Product Management"] },
  { _id: "103", name: "Marcus Johnson", role: "Designer", location: "New York", skills: ["UI/UX Design", "Figma"] },
  { _id: "104", name: "Maya Patel", role: "Marketing", location: "Austin", skills: ["Growth", "Analytics"] }
];

export default function Explore() {
  const [filters, setFilters] = useState({ search: "", role: "", skills: "", location: "" });
  const [users, setUsers] = useState(fallbackUsers);

  useEffect(() => {
    const timeout = setTimeout(() => {
      userService
        .getAllUsers(filters)
        .then((response) => setUsers(normalizeApiData(response).users || fallbackUsers))
        .catch(() => setUsers(fallbackUsers));
    }, 250);

    return () => clearTimeout(timeout);
  }, [filters]);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page py-12">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-semibold">Discover <span className="text-gradient">Founders</span></h1>
          <p className="mt-3 max-w-2xl text-text-muted">Search by role, skill, location, or keyword to find your next co-founder.</p>
        </div>
        <Card className="mb-8">
          <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr]">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-text-muted" size={18} />
              <Input className="pl-10" placeholder="Search by name or keyword" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
            </div>
            <select className="rounded-xl border border-white/10 bg-surface px-4 py-3 text-text-primary" value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
              <option value="">Role</option>
              {ROLES.map((role) => <option key={role}>{role}</option>)}
            </select>
            <select className="rounded-xl border border-white/10 bg-surface px-4 py-3 text-text-primary" value={filters.skills} onChange={(e) => setFilters({ ...filters, skills: e.target.value })}>
              <option value="">Skill</option>
              {SKILLS.slice(0, 10).map((skill) => <option key={skill}>{skill}</option>)}
            </select>
            <Input placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
          </div>
        </Card>
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((person) => (
            <Card key={person._id} className="flex h-full flex-col">
              <Avatar src={person.avatar?.url} name={person.name} size="lg" className="rounded-xl" />
              <h2 className="mt-5 font-display text-xl font-semibold">{person.name}</h2>
              <p className="text-sm text-secondary">{person.role}</p>
              <p className="mt-3 text-sm text-text-muted">{person.location || "Remote"}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(person.skills || []).slice(0, 4).map((skill) => <Badge key={skill}>{skill}</Badge>)}
              </div>
              <Link to={`/profile?id=${person._id}`} className="mt-6">
                <Button fullWidth variant="outline">View Profile</Button>
              </Link>
            </Card>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
