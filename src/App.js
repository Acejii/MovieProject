import { lazy, Suspense } from "react";
import MainLayout from "components/MainLayout";
import AccountLayout from "modules/Auth/components/AccountLayout";
import { Route, Routes } from "react-router-dom";
import CheckoutRoute from "routes/CheckoutRoute";
import Profile from "modules/Profile/page/Profile";
import Movie from "modules/Movie/pages/Movie";
import Ticket from "modules/Ticket/page/Ticket";
import Home from "modules/Home/pages/Home";
import "./App.scss";

// const Home = lazy(() => import("modules/Home/pages/Home"));
// const Movie = lazy(() => import("modules/Movie/pages/Movie"));
// const Ticket = lazy(() => import("modules/Ticket/page/Ticket"));
function App() {
  return (
    <>
      {/* <Suspense fallback={<h1>Loading...</h1>}></Suspense> */}
      <Routes>
        <Route path="/" exact element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="movie/:movieId" element={<Movie />} />
          <Route path="account/:status" element={<AccountLayout />} />
          <Route
            path="profile"
            element={
              <CheckoutRoute>
                <Profile />
              </CheckoutRoute>
            }
          />
          <Route
            path="ticket/:showtimeId"
            element={
              <CheckoutRoute>
                <Ticket />
              </CheckoutRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
