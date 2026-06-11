export default function Input({ label, error, register, className = "", ...props }) {
  return (
    <label className="block space-y-2">
      {label && <span className="label-caps">{label}</span>}
      <input
        className={`w-full rounded-xl border border-white/10 bg-surface/80 px-4 py-3 text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        {...register}
        {...props}
      />
      {error && <span className="text-sm text-error">{error}</span>}
    </label>
  );
}
