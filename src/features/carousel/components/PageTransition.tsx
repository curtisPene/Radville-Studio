import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type PropsWithChildren,
} from "react";

export const PageTransition = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => internalRef.current!);

    return (
      <div ref={internalRef} className="page w-full h-full">
        {children}
      </div>
    );
  }
);
