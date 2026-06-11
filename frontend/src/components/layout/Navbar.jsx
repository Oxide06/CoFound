import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Rocket, X } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { to: "/explore", label: "Explore" },
  { to: "/ideas/post", label: "Post Idea" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/75 backdrop-blur-2xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary-soft">
          <Rocket size={22} />
          CoFound
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive ? "bg-primary/15 text-primary-soft" : "text-text-muted hover:bg-white/5 hover:text-text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Link to="/profile" className="group relative">
                <Avatar src={user?.avatar?.url || user?.avatarUrl} name={user?.name} size="sm" />
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>

        <button
          className="rounded-xl p-2 text-text-muted hover:bg-white/5 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-background/95 md:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-text-muted">
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-text-muted">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="rounded-xl px-3 py-2 text-left text-text-muted">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-text-muted">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="rounded-xl bg-primary px-3 py-2 text-white">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
