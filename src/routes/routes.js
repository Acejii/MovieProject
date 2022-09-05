import Movie from "modules/Movie/pages/Movie";
import Home from "../modules/Home/pages/Home";

export const publicRoutes = [
  { path: "/", component: <Home />, title: "Home", layout: "main" },
  { path: "/cumrap", component: <Home />, title: "Cụm rạp" },
  { path: "/tintuc", component: <Home />, title: "Tin tức" },
  { path: "/movie/:movieId", component: <Movie />, layout: "main" },
  // { path: "/ungdung", component: <Home />, title: "Ứng dụng" },
];
