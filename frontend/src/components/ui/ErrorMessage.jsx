export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-red-200">{message}</div>;
}
