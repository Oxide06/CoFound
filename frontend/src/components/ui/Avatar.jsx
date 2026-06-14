import { getInitials } from "@/utils/helpers";

const sizes = {
  sm: "h-8 w-8 text-[10px]",
  md: "h-11 w-11 text-xs",
  lg: "h-14 w-14 text-sm",
  xl: "h-24 w-24 text-2xl"
};

export default function Avatar({ src, name = "CoFound", size = "md", className = "" }) {
  return (
    <div
      className={`${sizes[size]} overflow-hidden rounded-full border border-border bg-primary/10 text-primary ${className} flex items-center justify-center font-bold`}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : getInitials(name)}
    </div>
  );
}
