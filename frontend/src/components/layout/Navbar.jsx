import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Rocket, X, Sun, Moon } from "lucide-react";
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

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("cofound_theme");
    if (saved) return saved;
    return "dark"; // Default to dark theme as requested
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("cofound_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/75 backdrop-blur-2xl transition-colors duration-200">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
          <Rocket size={18} className="text-primary" />
          CoFound
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:bg-surface-high hover:text-text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-text-muted hover:bg-surface-high hover:text-text-primary transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {!isAuthenticated ? (
            <>
              <Button size="sm" variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/register")}>Register</Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Link to="/profile" className="group relative">
                <Avatar src={user?.avatar?.url || user?.avatarUrl} name={user?.name} size="sm" />
              </Link>
              <Button size="sm" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-text-muted hover:bg-surface-high transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="rounded-lg p-2 text-text-muted hover:bg-surface-high md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-xs text-text-muted hover:bg-surface-high">
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-xs text-text-muted hover:bg-surface-high">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="rounded-lg px-3 py-2 text-left text-xs text-text-muted hover:bg-surface-high">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-xs text-text-muted hover:bg-surface-high">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="rounded-lg bg-primary px-3 py-2 text-center text-xs text-white">
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
