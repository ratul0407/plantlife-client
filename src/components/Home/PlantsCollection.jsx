import img1 from "../../assets/plant6.jpg";
import img2 from "../../assets/plant3.jpg";
import img3 from "../../assets/plant7.jpg";
import img4 from "../../assets/easy-care/snake-plant.jpg";
import img5 from "../../assets/easy-care/aloevera.jpg";
import img6 from "../../assets/easy-care/peace-lily.jpg";
import img7 from "../../assets/hanging/boton-fern.jpg";
import img8 from "../../assets/hanging/string-of-pearls.jpg";
import img9 from "../../assets/hanging/english-ivy.jpg";
import { PlantsGrid } from "./PlantsGrid";
export const PlantsCollection = () => {
  return (
    <section className="min-h-screen space-y-20">
      <div>
        <PlantsGrid
          img1={img1}
          img2={img2}
          img3={img3}
          order={[1, 2, 4, 3]}
          title="Air-purifying plants"
        />
      </div>
      <div>
        <div className="space-y-20">
          <div>
            <h3 className="heading mx-auto max-w-[34ch] text-center">
              Transform your home into a{" "}
              <span className="plant-text">Sanctuary </span>
              with a little touch of green
            </h3>
          </div>
          <div>
            <PlantsGrid
              img1={img4}
              img2={img5}
              img3={img6}
              order={[1, 3, 4, 2]}
              title="Easy-care plants"
            />
          </div>
          <div>
            <PlantsGrid
              img1={img7}
              img2={img8}
              img3={img9}
              order={[1, 2, 3, 4]}
              title="Hanging & Trailing Plants"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
