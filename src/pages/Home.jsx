import { Banner } from "../components/Home/Banner";
import { CuratedPlants } from "../components/Home/CuratedPlants";
import { PowerOfPlant } from "../components/Home/PowerOfPlant";
import { PopularPlants } from "../components/Home/PopularPlants";
import { PlantsCollection } from "../components/Home/PlantsCollection";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VisitStore } from "../components/Home/VisitStore";
import { Navbar } from "../components/Home/Navbar";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Home = () => {
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
        <section className="flex min-h-[80vh] items-center">
          <VisitStore />
        </section>
      </main>
      <footer></footer>
    </div>
  );
};
