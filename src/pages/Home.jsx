import { Banner } from "../components/Home/Banner";
import { CuratedPlants } from "../components/Home/CuratedPlants";
import { PowerOfPlant } from "../components/Home/PowerOfPlant";
import { PopularPlants } from "../components/Home/PopularPlants";
import { PlantsCollection } from "../components/Home/PlantsCollection";
export const Home = () => {
  return (
    <div className="font-roboto space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
      <Banner />

      <main className="space-y-16 px-4 py-12 sm:px-6 md:space-y-24 2xl:container 2xl:mx-auto">
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
        <PlantsCollection />
      </main>
      <footer></footer>
    </div>
  );
};
