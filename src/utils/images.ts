import casaPaz from "@/assets/images/casa-paz.avif";
import hagisDowntown from "@/assets/images/hagis-downtown.avif";
import hagisOldtown from "@/assets/images/hagis-oldtown.avif";
import type { ImageProps } from "@/features/carousel";
import ColorThief from "colorthief";

const images: ImageProps[] = [
  { image: casaPaz, altText: "Casa Paz" },
  { image: hagisDowntown, altText: "Hagis Downtown" },
  { image: hagisOldtown, altText: "Hagis Oldtown" },
];

const setColors = (images: ImageProps[]): ImageProps[] => {
  const colorthief = new ColorThief();
  images.forEach((image) => {
    const img = new Image();
    img.src = image.image;
    img.onload = () => {
      const color = colorthief.getColor(img);
      image.color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    };
  });

  return images;
};

setColors(images);

export default images;
