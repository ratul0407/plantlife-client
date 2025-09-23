import firstBigImg from "../assets/store-img/store4.jpg";
import aboutImg1 from "../assets/static/about-img-1.jpg";
import aboutImg2 from "../assets/static/about-img-2.jpg";

import secondBigImg from "../assets/store-img/store2.jpg";
import aboutImg3 from "../assets/static/about-img-3.jpg";
import aboutImg4 from "../assets/static/about-img-4.jpg";

export default function About() {
  return (
    <>
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
            At PlantLife, we believe that every home and workspace deserves the
            calming touch of greenery. Our mission is to make it easy for
            anyone—whether you’re a seasoned plant enthusiast or just starting
            out—to bring nature indoors. We carefully source healthy, vibrant
            plants from trusted growers, ensuring each one arrives at your door
            ready to thrive.
          </p>

          <p>
            We know that plants aren’t just decorations; they’re companions that
            improve air quality, reduce stress, and create a sense of
            well-being. That’s why we go beyond simply selling plants—we provide
            detailed care instructions, helpful resources, and personalized
            recommendations so you can nurture your plants with confidence. From
            hanging plants to desk-friendly succulents, every option is chosen
            with beauty and sustainability in mind.
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
        <p>
          What sets us apart is our dedication to customer experience. From
          secure packaging that protects your plants in transit to responsive
          support that helps with care questions, we’re here every step of the
          way. At PlantLife, it’s more than just shopping—it’s about growing a
          greener lifestyle, one plant at a time.
        </p>
      </div>
    </>
  );
}
