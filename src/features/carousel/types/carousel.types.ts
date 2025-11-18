import type { HtmlHTMLAttributes, RefObject } from "react";

export interface SlideContainerProps
  extends HtmlHTMLAttributes<HTMLDivElement> {
  ref: React.RefObject<HTMLDivElement | null>;
}

export interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {
  image: string;
  altText: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

export interface ImageProps {
  image: string;
  altText: string;
  color?: string;
}

export interface UseCarouselAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  cardRefs: RefObject<HTMLDivElement | null>[];
  images: ImageProps[];
  onSlideChange: (slideNumber: number) => void;
}
