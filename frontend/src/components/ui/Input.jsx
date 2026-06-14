export default function Input({ label, error, register, className = "", ...props }) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="label-caps">{label}</span>}
      <input
        className={`w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary/20 ${className}`}
        {...register}
        {...props}
      />
      {error && <span className="text-[11px] text-error">{error}</span>}
    </label>
  );
}
