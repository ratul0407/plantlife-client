import { Banner } from "@/components/Home/Banner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VisitStore } from "@/components/Home/VisitStore";
import { Navbar } from "@/components/Home/Navbar";
import { CuratedPlants } from "@/components/Home/CuratedPlants";
import { PowerOfPlant } from "@/components/Home/PowerOfPlant";
import { PopularPlants } from "@/components/Home/PopularPlants";
import { PlantsCollection } from "@/components/Home/PlantsCollection";
import { useGetAllPlantsQuery } from "@/redux/features/plant.api";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Home = () => {
  const { data } = useGetAllPlantsQuery(undefined);
  console.log(data);
  return (
    <div className="font-roboto">
      <Navbar />
      <Banner />

      <main className="space-y-20 px-4 py-12 sm:px-6 md:space-y-12 lg:space-y-32 2xl:container 2xl:mx-auto">
        {/* curated plants section */}
        <section>
          <CuratedPlants />
        </section>
        <section>
          <PowerOfPlant />
        </section>
        <section>
          <PopularPlants />
        </section>

        {/* plants collection section */}
        <section>
          <PlantsCollection />
        </section>
        <section className="flex items-center overflow-x-hidden">
          <VisitStore />
        </section>
      </main>
      <footer></footer>
    </div>
  );
};
