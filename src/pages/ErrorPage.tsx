import Navbar from "@/components/Navbar";

export const ErrorPage = () => {
  return (
    <div>
      <Navbar />
      <main className="grid min-h-[calc(100vh-190px)] items-center justify-center">
        <h1 className="text-[calc(50vw-200px)] font-bold">404</h1>
      </main>
    </div>
  );
};
