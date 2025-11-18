import type { PipeProps } from "@/features/carousel/types/app.types";
import clsx from "clsx";
export const Pipe: React.FC<PipeProps> = ({ className }) => {
  return (
    <svg
      className={clsx(className)}
      width="4"
      height="24"
      viewBox="0 0 4 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 0V110" stroke="white" stroke-width="4" />
    </svg>
  );
};
