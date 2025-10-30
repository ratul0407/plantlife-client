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
    <div className="bg-banner relative grid min-h-[calc(100vh-174px)] bg-cover text-white">
      <section>
        {/* main headline */}
        <div className="flex h-full flex-col items-center justify-center gap-8 lg:gap-0">
          <h1
            ref={titleRef}
            className="text-center text-5xl text-[12vw] tracking-tighter"
          >
            Bring ..<span className="font-metal italic">nature</span>.. home.
          </h1>

          {/*  main footer*/}
          <div className="absolute bottom-0 text-lg uppercase lg:flex lg:min-w-full lg:items-center lg:justify-between lg:px-4">
            <div className="hidden basis-1/3 lg:block">
              <p>We offer a handpick selection of plants!</p>
              <Link to="/about" className="underline">
                Learn More
              </Link>
            </div>
            <div className="basis-1/3 space-y-4 text-center">
              <a href="#curated">(Scroll Down)</a>
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
