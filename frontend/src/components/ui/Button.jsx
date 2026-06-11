import Spinner from "@/components/ui/Spinner";

const variants = {
  primary: "premium-gradient text-white hover:shadow-glow",
  secondary: "bg-secondary/15 text-text-primary hover:bg-secondary/25 border border-secondary/20",
  outline: "border border-white/10 bg-white/[0.03] text-text-primary hover:border-primary/50",
  ghost: "text-text-muted hover:bg-white/5 hover:text-text-primary",
  danger: "bg-error text-white hover:bg-red-500"
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base"
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      ].join(" ")}
      {...props}
    >
      {loading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  );
}
