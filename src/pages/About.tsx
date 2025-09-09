import firstBigImg from "../assets/store-img/store4.jpg";
import aboutImg1 from "../assets/static/about-img-1.jpg";
import aboutImg2 from "../assets/static/about-img-2.jpg";

import secondBigImg from "../assets/store-img/store2.jpg";
import aboutImg3 from "../assets/static/about-img-3.jpg";
import aboutImg4 from "../assets/static/about-img-4.jpg";
import NavbarUi from "@/components/NavbarUi";
export default function About() {
  return (
    <>
      <NavbarUi />
      <div className="mx-auto max-w-6xl space-y-16 p-6">
        {/* Header */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-muted-foreground text-lg">
            Learn more about our story, mission, and journey.
          </p>
        </header>

        {/* First Fancy Grid */}
        <section className="grid h-[400px] grid-cols-1 gap-4 md:h-[500px] md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <img
              src={aboutImg1}
              alt="Image 1"
              className="h-1/2 w-full rounded-lg object-cover shadow-md"
            />
            <img
              src={aboutImg2}
              alt="Image 2"
              className="h-1/2 w-full rounded-lg object-cover shadow-md"
            />
          </div>
          <div className="md:col-span-2">
            <img
              src={firstBigImg}
              alt="Image 3"
              className="h-full w-full rounded-lg object-cover shadow-md"
            />
          </div>
        </section>

        {/* Paragraphs */}
        <section className="space-y-8 text-lg leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            ligula a elit malesuada vestibulum. Morbi tincidunt diam non lectus
            fermentum, a volutpat purus luctus. Nullam non justo sit amet libero
            convallis tempor.
          </p>

          <p>
            Phasellus finibus, justo sit amet fermentum feugiat, erat libero
            placerat orci, non faucibus enim leo ac risus. Integer quis sapien
            nec ligula mattis facilisis. Curabitur semper mi vel sapien
            imperdiet, ac feugiat ligula vehicula.
          </p>

          <p>
            Donec in sapien a mauris laoreet bibendum. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Vivamus efficitur dui ut nulla fermentum, non fringilla tortor
            placerat. Sed vitae dui vel nulla pharetra suscipit.
          </p>
        </section>

        {/* Second Fancy Grid (flipped layout) */}
        <section className="grid h-[400px] grid-cols-1 gap-4 md:h-[500px] md:grid-cols-3">
          <div className="md:col-span-2">
            <img
              src={secondBigImg}
              alt="Image 4"
              className="h-full w-full rounded-lg object-cover shadow-md"
            />
          </div>
          <div className="flex flex-col gap-4">
            <img
              src={aboutImg3}
              alt="Image 5"
              className="h-1/2 w-full rounded-lg object-cover shadow-md"
            />
            <img
              src={aboutImg4}
              alt="Image 6"
              className="h-1/2 w-full rounded-lg object-cover shadow-md"
            />
          </div>
        </section>
      </div>
    </>
  );
}
