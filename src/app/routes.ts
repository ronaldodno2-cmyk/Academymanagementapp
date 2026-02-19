import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Dashboard } from "./pages/Dashboard";
import { Students } from "./pages/Students";
import { Financial } from "./pages/Financial";
import { Store } from "./pages/Store";
import { Workouts } from "./pages/Workouts";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "students", Component: Students },
      { path: "financial", Component: Financial },
      { path: "store", Component: Store },
      { path: "workouts", Component: Workouts },
      { path: "*", Component: NotFound },
    ],
  },
]);
