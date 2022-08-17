import Catalog from "../pages/Catalog";
import Home from "../pages/Home";
import Ticket from "../pages/Ticket";

export const privateRoutes = [
  { path: "/", component: <Home />, title: "Home" },
  { path: "/catalog", component: <Catalog />, title: "Movies" },
  { path: "/ticket", component: <Ticket />, title: "TV Series" },
];
