import React from "react";
import { IoArrowDown } from "react-icons/io5";
import { CuratedPlants } from "../components/Home/CuratedPlants";
import { Navbar } from "../components/Home/Navbar";
import { PowerOfPlant } from "../components/Home/PowerOfPlant";
import { PopularPlants } from "../components/Home/PopularPlants";

export const Home = () => {
  return (
    <div className="font-roboto space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
      <div className="bg-banner flex h-screen flex-col justify-between bg-cover text-white">
        <header className="basis-1/4 p-4 sm:p-6 md:p-8">
          <Navbar />
        </header>
        <section className="relative basis-3/4">
          {/* main headline */}
          <div className="flex flex-col items-center justify-center gap-8 lg:gap-0">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-center text-5xl tracking-tighter sm:text-6xl md:text-7xl lg:text-9xl">
                Bring ..<span className="font-charm">nature</span>.. home.
              </h1>
              <button className="btn">Shop Now</button>
            </div>
            {/*  main footer*/}
            <div className="absolute bottom-10 text-lg uppercase lg:flex lg:min-w-full lg:items-center lg:justify-between lg:px-4">
              <div className="hidden basis-1/3 lg:block">
                <p>We offer a handpick selection of plants!</p>
                <a href="#" className="underline">
                  Learn More
                </a>
              </div>
              <div className="basis-1/3 space-y-4 text-center">
                <p>(Scroll Down)</p>
                <IoArrowDown className="mx-auto h-8 w-8 animate-bounce rounded-full border border-white p-1 text-white" />
              </div>
              <div className="hidden basis-1/3 text-right lg:block">
                <p>Stay updated with us!</p>
                <p className="font-bold">Make you home lively Again!</p>
              </div>
            </div>
          </div>
        </section>
      </div>

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
      </main>
      <footer></footer>
    </div>
  );
};
