import { Outlet } from "react-router";

export const AllPlants = () => {
  return (
    <>
      <div className="relative">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
