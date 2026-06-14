export default function Badge({ children, tone = "default", className = "" }) {
  const tones = {
    default: "border-border bg-surface-high text-text-muted",
    primary: "border-primary/20 bg-primary/10 text-primary",
    success: "border-success/20 bg-success/10 text-success",
    secondary: "border-secondary/20 bg-secondary/10 text-secondary"
  };

  return (
    <span className={`inline-flex rounded border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
