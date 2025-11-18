import { forwardRef, type RefAttributes } from "react";
import styles from "./CarouselPageFooter.module.css";

export interface CarouselPageFooterProps extends RefAttributes<HTMLDivElement> {
  numSlides: number;
}

export const CarouselPageFooter: React.FC<CarouselPageFooterProps> = forwardRef<
  HTMLDivElement,
  CarouselPageFooterProps
>(({ numSlides }, ref) => {
  return (
    <div ref={ref} className="w-full">
      <div className="pl-4 pr-4 flex flex-row items-center justify-between w-full">
        <span className="text-sm text-white how font-light font-raleway underline">
          hello@radaville.studio{" "}
        </span>
        <span className="text-sm text-white font-light ">
          Dusseldorf, Germany
        </span>
      </div>
      <div className="pl-4 pr-4 pt-4 sticks-container flex flex-row items-center justify-between font-raleway">
        <div className="text-white text-xs">[ 01 ]</div>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className={styles.stick}></div>
        ))}
        <div className="text-white text-xs">[ ]</div>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className={styles.stick}></div>
        ))}
        <div className="text-white text-xs">
          [ {`${numSlides < 9 ? `0${numSlides}` : numSlides}`} ]
        </div>
      </div>
    </div>
  );
});
