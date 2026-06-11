export default function Badge({ children, tone = "default", className = "" }) {
  const tones = {
    default: "border-white/10 bg-white/5 text-text-muted",
    primary: "border-primary/30 bg-primary/15 text-primary-soft",
    success: "border-success/30 bg-success/10 text-success",
    secondary: "border-secondary/30 bg-secondary/10 text-sky-200"
  };

  return (
    <span className={`inline-flex rounded-lg border px-3 py-1 text-xs font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
