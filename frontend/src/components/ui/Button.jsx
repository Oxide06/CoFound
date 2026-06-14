import Spinner from "@/components/ui/Spinner";

const variants = {
  primary: "premium-gradient text-white hover:opacity-90",
  secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/20",
  outline: "border border-border bg-surface text-text-primary hover:bg-surface-high",
  ghost: "text-text-muted hover:bg-surface-high hover:text-text-primary",
  danger: "bg-error text-white hover:bg-red-600"
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-xs",
  lg: "px-5 py-2.5 text-sm"
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
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition duration-150 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      ].join(" ")}
      {...props}
    >
      {loading && <Spinner className="h-3.5 w-3.5" />}
      {children}
    </button>
  );
}
