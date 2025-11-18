import { BrandMark } from "@/components/BrandMark";

import { NavOverlay } from "@/components/NavOverlay";
import { WordMark } from "@/components/WordMark";
import { PageTransition } from "@/features/carousel/components/PageTransition";
import type { RootState } from "@/stores/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef } from "react";
import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  const { isOpen } = useSelector((state: RootState) => state.navState);

  useGSAP(
    () => {
      if (!didMount.current) {
        didMount.current = true;
        return;
      }
      if (isOpen) {
        console.log("open");
        gsap.to("#header", {
          y: "-100%",
          opacity: 0,
          duration: 0.5,
          ease: "sine.out",
        });
      }
      if (!isOpen) {
        console.log("close");
        gsap.fromTo(
          "#header",
          {
            y: "0%",
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.4,
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
      className={`h-dvh flex flex-col items-center justify-center w-full`}
    >
      <header id="header" className="absolute top-0 left-0 right-0 z-60">
        <div className="flex items-center justify-between p-4">
          <WordMark fill="white" />
          <BrandMark />
          <NavOverlay pageRef={pageRef} />
        </div>
      </header>

      <main className="h-full w-full overflow-clip flex flex-col items-center justify-center">
        <PageTransition ref={pageRef}>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
};
