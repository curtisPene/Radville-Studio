import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { CarouselPage } from "@/features/carousel/pages/CarouselPage";
import { TestPage } from "@/features/carousel/pages/TestPage";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <CarouselPage />,
        },
        {
          path: "/test",
          element: <TestPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
