import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-xl font-bold text-primary-soft">CoFound</div>
          <p className="mt-2 text-sm text-text-muted">The premium network for serious startup builders.</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm text-text-muted">
          <Link to="/">About</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/ideas/post">Post Idea</Link>
          <Link to="/connections">Contact</Link>
        </nav>
        <div className="flex items-center gap-3 text-text-muted">
          <Linkedin size={18} />
          <Twitter size={18} />
          <Github size={18} />
        </div>
      </div>
      <div className="container-page pb-8 text-xs text-text-muted">Copyright 2026 CoFound. All rights reserved.</div>
    </footer>
  );
}
