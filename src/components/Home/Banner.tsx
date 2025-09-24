import { useEffect } from "react";

import { IoArrowDown } from "react-icons/io5";
import { useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router";

export const Banner = () => {
  const titleRef = useRef(null);
  useEffect(() => {
    gsap.from(titleRef, { opacity: 0, duration: 3 });
  }, []);
  return (
    <div className="bg-banner -mt-[112px] flex h-screen flex-col justify-between bg-cover text-white">
      <header
        aria-hidden="true"
        className="sticky top-0 basis-1/4 p-4 sm:p-6 md:p-8"
      ></header>
      <section className="relative basis-3/4">
        {/* main headline */}
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-0">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1
              ref={titleRef}
              className="text-center text-5xl tracking-tighter sm:text-6xl md:text-7xl lg:text-9xl"
            >
              Bring ..<span className="font-metal italic">nature</span>.. home.
            </h1>
            <Link to="/plants">
              <button className="btn">Shop Now</button>
            </Link>
          </div>
          {/*  main footer*/}
          <div className="absolute bottom-10 text-lg uppercase lg:flex lg:min-w-full lg:items-center lg:justify-between lg:px-4">
            <div className="hidden basis-1/3 lg:block">
              <p>We offer a handpick selection of plants!</p>
              <Link to="/about" className="underline">
                Learn More
              </Link>
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
  );
};
