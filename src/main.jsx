import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as rootLoader } from "./components/Root";
import EventsPage, { loader as postListLoader } from "./pages/EventsPage";
import EventPage, { loader as postLoader } from "./pages/EventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      { path: "/", element: <EventsPage />, loader: postListLoader },
      { path: "/event/:eventId", element: <EventPage />, loader: postLoader },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
