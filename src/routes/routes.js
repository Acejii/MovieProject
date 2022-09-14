import DevelopingPage from "modules/DevelopingPage";
import Movie from "modules/Movie/pages/Movie";
import Home from "../modules/Home/pages/Home";

export const publicRoutes = [
  { path: "/", component: <Home />, title: "Home", layout: "main" },
  {
    path: "/news",
    component: <DevelopingPage />,
    title: "Tin tức",
    layout: "main",
  },
  {
    path: "/promotion",
    component: <DevelopingPage />,
    title: "Khuyến mãi",
    layout: "main",
  },
  { path: "/movie/:movieId", component: <Movie />, layout: "main" },
  // { path: "/ungdung", component: <Home />, title: "Ứng dụng" },
];
