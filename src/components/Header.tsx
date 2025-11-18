import { BrandMark } from "@/components/BrandMark";

import { NavOverlay } from "@/components/NavOverlay";
import { WordMark } from "@/components/WordMark";

import { useRef } from "react";
export const Header = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  return (
    <header className="absolute top-0 left-0 right-0 z-60">
      <div className="flex items-center justify-between p-4">
        <WordMark fill="white" />
        <BrandMark />
        <NavOverlay pageRef={pageRef} />
      </div>
    </header>
  );
};
