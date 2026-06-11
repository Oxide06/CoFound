import { getInitials } from "@/utils/helpers";

const sizes = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-28 w-28 text-3xl"
};

export default function Avatar({ src, name = "CoFound", size = "md", className = "" }) {
  return (
    <div
      className={`${sizes[size]} overflow-hidden rounded-full border border-white/10 bg-primary/15 text-primary-soft ${className} flex items-center justify-center font-bold`}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : getInitials(name)}
    </div>
  );
}
