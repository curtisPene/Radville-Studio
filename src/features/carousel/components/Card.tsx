import type { CardProps } from "../types";

export const Card: React.FC<CardProps> = ({ image, altText, ref }) => {
  return (
    <div ref={ref}>
      <img src={image} alt={altText} />
    </div>
  );
};
