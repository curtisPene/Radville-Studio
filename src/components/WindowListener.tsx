import { setWindowDimensions } from "@/stores/windowSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const WindowListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      const headerHeight = document.querySelector("header")?.clientHeight || 0;
      const width = window.innerWidth;
      const height = window.innerHeight;

      dispatch(setWindowDimensions({ width, height, headerHeight }));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
  return null;
};
