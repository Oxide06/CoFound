import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="page-shell grid min-h-screen place-items-center px-4 text-center">
      <div>
        <div className="font-display text-7xl font-bold text-primary-soft">404</div>
        <h1 className="mt-4 font-display text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-text-muted">The route you are looking for does not exist.</p>
        <Link to="/" className="mt-8 inline-flex">
          <Button>Go Home</Button>
        </Link>
      </div>
    </main>
  );
}
