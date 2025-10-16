import { Outlet } from "react-router";

export const AllPlants = () => {
  return (
    <>
      <div className="relative bg-slate-50/50">
        <main className="pb-20">
          <Outlet />
        </main>
      </div>
    </>
  );
};
