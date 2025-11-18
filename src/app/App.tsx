import { WindowListener } from "@/components/WindowListener";
import { AppRouter } from "./AppRouter";

import images from "@/utils/images";
import ColorThief from "colorthief";
import { IntroAnimation } from "@/components/IntroAnimation";
import { useCallback, useState } from "react";

const App = () => {
  const setDefaultColor = () => {
    const colorthief = new ColorThief();
    const img = new Image();
    img.src = images[0].image;
    img.onload = () => {
      const color = colorthief.getColor(img);
      images[0].color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      document
        .querySelector(".carousel-page")
        ?.setAttribute("style", `background-color: ${images[0].color}`);
    };
  };
  setDefaultColor();

  const [introCompleted, setIntroCompleted] = useState<boolean>(false);

  const handleIntorComplete = useCallback(() => {
    setIntroCompleted(true);
    console.log(introCompleted);
  }, [introCompleted, setIntroCompleted]);

  return (
    <>
      <IntroAnimation onComplete={handleIntorComplete} />
      <WindowListener />
      <AppRouter />
    </>
  );
};

export default App;
