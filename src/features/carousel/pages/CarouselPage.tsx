import { useMemo, useRef, useState } from "react";
import { useCarouselAnimation } from "../hooks";

import { CarouselPageFooter } from "@/features/carousel/components/CarouselPageFooter";

import images from "@/utils/images.ts";
import { useGSAP } from "@gsap/react";
import type { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import gsap from "gsap";

export const CarouselPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frontBufferRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const backBufferRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [slideNumber, setSlideNumber] = useState<number>(1);

  const cardRefs = useMemo(
    () => [
      frontBufferRef,
      card1Ref,
      card2Ref,
      card3Ref,
      card4Ref,
      backBufferRef,
    ],
    []
  );

  const handleSlideChange = (newSlideNumber: number) => {
    setSlideNumber(newSlideNumber);
  };

  useCarouselAnimation({
    containerRef: pageRef,
    cardRefs,
    images,
    onSlideChange: handleSlideChange,
  });

  const { isOpen } = useSelector((state: RootState) => state.navState);
  const isMounted = useRef(false);

  useGSAP(
    () => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      if (isOpen) {
        gsap.to(".scroll-number", {
          y: "-200%",
          opacity: 0,
          duration: 0.5,
          ease: "sine.out",
        });

        gsap.to(containerRef.current, {
          y: "-35%",
          opacity: 0,
          duration: 0.5,
          ease: "sine.out",
        });
      }

      if (!isOpen) {
        gsap.fromTo(
          ".scroll-number",
          {
            y: "15%",
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "sine.out",
          }
        );

        gsap.fromTo(
          containerRef.current,
          {
            y: "10%",
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "sine.out",
          }
        );
      }
    },
    { dependencies: [isOpen] }
  );

  return (
    <div
      ref={pageRef}
      className={`carousel-page flex flex-col items-center justify-center h-full p-4 pt-[72px] bg-[#311512] w-full `}
    >
      <div className="scroll-number pr-4 pl-4 w-full flex flex-row justify-end items-center text-white ">
        <div className="flex flex-col">
          <span className="scroll inline-block text-white">Scroll</span>
          <div className=" text-right">
            <span className="scroll-num-1 text-white">{`${slideNumber}`}</span>{" "}
            /
            <span className="scroll-num-2 text-white">{`${images.length}`}</span>
          </div>
        </div>
      </div>
      <div
        ref={containerRef}
        id="slide-container"
        className="slides-container relative w-full h-[90%] flex flex-col items-center justify-center transform-3d perspective-midrange perspective-origin-[50%_-5%] max-w-[800px]"
      >
        <div ref={frontBufferRef} className="front-buffer absolute w-[98%]">
          <span className="card-title w-full flex flex-row items-center justify-center font-dm absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-4xl text-white opacity-0"></span>
          <img src="#" alt="#" className="w-full h-[270px] object-cover" />
        </div>
        <div
          ref={card1Ref}
          className="card-1 absolute w-[98%] flex flex-row items-center justify-center"
        >
          <div className="text-mask absolute w-full h-15 overflow-hidden">
            <span className="card-title w-full flex flex-row items-center justify-center font-dm absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-4xl text-white opacity-0"></span>
          </div>

          <img src="#" alt="#" className="w-full h-[270px] object-cover" />
        </div>
        <div ref={card2Ref} className="card-2 absolute w-[98%]">
          <span className="card-title w-full flex flex-row items-center justify-center font-dm absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-4xl text-white opacity-0"></span>
          <img src="#" alt="#" className="w-full h-[270px] object-cover" />
        </div>
        <div ref={card3Ref} className="card-3 absolute w-[98%]">
          <span className="card-title w-full flex flex-row items-center justify-center font-dm absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-4xl text-white opacity-0"></span>
          <img src="#" alt="#" className="w-full h-[270px] object-cover" />
        </div>
        <div ref={card4Ref} className="card-4 absolute w-[98%]">
          <span className="card-title w-full flex flex-row items-center justify-center font-dm absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-4xl text-white opacity-0"></span>
          <img src="#" alt="#" className="w-full h-[270px] object-cover" />
        </div>
        <div ref={backBufferRef} className="back-buffer absolute w-[98%]">
          <span className="card-title w-full flex flex-row items-center justify-center font-dm absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-4xl text-white opacity-0"></span>
          <img src="#" alt="#" className="w-full h-[270px] object-cover" />
        </div>
      </div>
      <CarouselPageFooter ref={footerRef} numSlides={images.length} />
    </div>
  );
};
