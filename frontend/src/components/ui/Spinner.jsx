export default function Spinner({ className = "h-5 w-5" }) {
  return (
    <span
      className={`${className} inline-block animate-spin rounded-full border-2 border-current border-t-transparent`}
      aria-hidden="true"
    />
  );
}
