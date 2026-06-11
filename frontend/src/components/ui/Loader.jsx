import Spinner from "@/components/ui/Spinner";

export default function Loader() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-4 text-text-muted">
        <Spinner className="h-10 w-10 text-primary" />
        <span className="label-caps">Loading</span>
      </div>
    </div>
  );
}
