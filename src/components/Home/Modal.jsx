import { motion } from "motion/react";
import { useRef } from "react";
import gsap from "gsap";
import { useEffect } from "react";
const scaleAnimation = {
  initial: {
    scale: 0,
    x: "-50%",
    y: "-50%",
  },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 1] },
  },
};
export const Modal = ({ modal, stores }) => {
  const { active, index } = modal;

  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);
  useEffect(() => {
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });

    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    let xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });

    let yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    let xMoveCursorLabel = gsap.quickTo(cursor.current, "left", {
      duration: 0.45,
      ease: "power3",
    });

    let yMoveCursorLabel = gsap.quickTo(cursor.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
    window.addEventListener("mousemove", (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    });
  }, []);
  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "exit"}
        className="pointer-events-none absolute flex h-[350px] w-[400px] items-center justify-center overflow-hidden bg-white"
      >
        <div
          style={{ top: index * -100 + "%" }}
          className="absolute h-full w-full transition-[top] ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          {stores.map((store, index) => {
            const { src, color } = store;
            return (
              <div
                className="flex min-h-full w-full items-center justify-center"
                style={{ backgroundColor: color }}
                key={index}
              >
                <img
                  className="h-auto max-h-[300px] object-cover"
                  src={src}
                  alt="image"
                  width={300}
                  height={0}
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        ref={cursorLabel}
        className="white pointer-events-none absolute z-2 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-transparent text-sm font-light"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      ></motion.div>
      <motion.div
        ref={cursor}
        className="pointer-events-none absolute z-2 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#386641] text-sm font-light text-white"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
};
