import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const Blogs = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  useGSAP(
    () => {
      // 5. Create the ScrollTrigger AFTER Lenis is set up
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "start start",
        // Set end to a large distance based on content height
        end: "bottom bottom",
        pin: leftRef.current,
        // OPTIONAL: Use markers for debugging
        markers: true,
      });
    },
    { scope: containerRef, dependencies: [] },
  ); // Empty dependencies if Lenis is managed in useEffect

  return (
    <div ref={containerRef} className="container flex pt-40 lg:w-1/2">
      <div
        ref={leftRef}
        // 👈 REMOVE the 'sticky top-0 h-screen' classes. Use a fixed height.
        className="left h-screen w-1/2 bg-blue-500"
      >
        <h1 className="p-8 text-4xl text-white">Sticky Side</h1>
        <div className="relative z-20 min-h-screen bg-red-500 md:hidden"></div>
      </div>

      <div className="right w-1/2 bg-gray-100 lg:w-1/2">
        <div className="space-y-12 p-8">
          <p className="min-h-screen">Content block 1</p>
          <p className="min-h-screen">Content block 2</p>
          <p className="min-h-screen">Content block 3</p>
          <p className="min-h-screen">Content block 4</p>
          <p className="min-h-screen">Content block 5</p>
          <p className="min-h-screen">Content block 6</p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
