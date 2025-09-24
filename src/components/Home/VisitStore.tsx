import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { Modal } from "./Modal";
import img1 from "../../assets/store-img/store1.jpg";
import img2 from "../../assets/store-img/store2.jpg";
import img3 from "../../assets/store-img/store3.jpg";
import img4 from "../../assets/store-img/store4.jpg";
const stores = [
  {
    name: "Green Heaven Market",
    address: "Riverside mall",
    day: "November 25-26, 2024",
    src: img1,
    color: "#344e41",
  },
  {
    name: "Urban Jungle Fest",
    address: "Downtown Garden",
    day: "February 14-15, 2025",
    src: img2,
    color: "#3a5a40",
  },
  {
    name: "Botanical Bliss Pop-Up",
    address: "Open courtyard",
    day: "December 14-15, 2024",
    src: img3,
    color: "#588157",
  },
  {
    name: "Eco Oasis  Experience",
    address: "Green park pavilion",
    day: "January 13-14",
    src: img4,
    color: "#a3b18a",
  },
];
export const VisitStore = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  console.log(modal);
  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <div className="flex basis-[30%] flex-col justify-between">
        <h3 className="font-lg font-semibold uppercase">
          Visit our pop-up stores for exclusive plants and offers near you
        </h3>
        <p className="flex items-center gap-4 font-semibold uppercase underline">
          view More
          <span>
            <IoArrowForward />
          </span>
        </p>
      </div>
      <div className="flex basis-[70%] flex-col">
        {stores.map((store, index) => {
          return (
            <Store
              key={index}
              store={store}
              index={index}
              setModal={setModal}
            />
          );
        })}
      </div>
      <div className="hidden lg:block">
        <Modal modal={modal} stores={stores} />
      </div>
    </div>
  );
};

const Store = ({ store, index, setModal }) => {
  const num = index + 1;
  return (
    <div
      className="flex items-start py-10"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <p className="pr-20 text-gray-400">0{num}.</p>
      <div className="flex flex-grow-1">
        <h3 className="font-metal basis-1/2 text-4xl font-medium text-[#386641]">
          {store.name}
        </h3>
        <p
          className={`basis-1/2 ${index % 2 == 0 ? "text-left" : "text-right"} uppercase *:block`}
        >
          <span>{store.address}</span>
          <span>{store.day}</span>
        </p>
      </div>
    </div>
  );
};
