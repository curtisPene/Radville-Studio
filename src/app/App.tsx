import { WindowListener } from "@/components/WindowListener";
import { AppRouter } from "./AppRouter";

import images from "@/utils/images";
import ColorThief from "colorthief";
import { IntroAnimation } from "@/components/IntroAnimation";
import { useCallback, useRef, useState } from "react";
import gsap from "gsap";

const App = () => {
  const setDefaultColor = () => {
    const colorthief = new ColorThief();
    const img = new Image();
    img.src = images[0].image;
    img.onload = () => {
      const color = colorthief.getColor(img);
      images[0].color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      console.log(images[0].color);
      document
        .querySelector(".carousel-page")
        ?.setAttribute("style", `background-color: ${images[0].color}`);
    };
  };
  setDefaultColor();

  const [showIntro, setShowIntro] = useState<boolean>(true);
  const introRef = useRef<HTMLDivElement>(null);

  const fadeOutAndUnmount = useCallback(() => {
    gsap.to(introRef.current, {
      opacity: 0,
      duration: 1.2,
      onComplete: () => {
        setShowIntro(false);
      },
    });
  }, []);

  const handleIntorComplete = useCallback(() => {
    fadeOutAndUnmount();
  }, [fadeOutAndUnmount]);

  return (
    <>
      {showIntro && (
        <IntroAnimation ref={introRef} onComplete={handleIntorComplete} />
      )}
      <WindowListener />
      <AppRouter />
    </>
  );
};

export default App;
