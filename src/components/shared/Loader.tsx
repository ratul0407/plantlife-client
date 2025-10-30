import { Spinner } from "@/components/ui/spinner";

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-10 text-green-900 md:size-12 lg:size-14" />
    </div>
  );
};

export default Loader;
