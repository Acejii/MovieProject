import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "components/MainLayout";
import AccountLayout from "modules/Auth/components/AccountLayout";
import AdminLayout from "components/AdminLayout";

import Home from "modules/Home/pages/Home";
import Movie from "modules/Movie/pages/Movie";
import Ticket from "modules/Ticket/page/Ticket";
import Profile from "modules/Profile/page/Profile";
import Page404 from "modules/Page404";
import DevelopingPage from "modules/DevelopingPage";
import UserManagement from "modules/Adminstration/page/UserManagement";
import MovieManagement from "modules/Adminstration/page/MovieManagement";
import ShowtimeManagement from "modules/Adminstration/page/ShowtimeManagement";
import AddMovie from "modules/Adminstration/components/AddMovie";
import UpdateMovie from "modules/Adminstration/components/UpdateMovie";
import ListMovie from "modules/Adminstration/components/ListMovie";

import CheckoutRoute from "routes/CheckoutRoute";
import CheckoutAdmin from "routes/CheckoutAdmin";

import "./App.scss";
import "./responsive/index.scss";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/loading" element={<Loading />} /> */}
        <Route path="/" exact element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="movie/:movieId" element={<Movie />} />
          <Route path="account/:status" element={<AccountLayout />} />
          <Route path="news" element={<DevelopingPage />} />
          <Route path="promotion" element={<DevelopingPage />} />
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

        <Route
          path="/admin"
          element={
            <CheckoutAdmin>
              <AdminLayout />
            </CheckoutAdmin>
          }
        >
          <Route index element={<UserManagement />} />
          <Route path="movie" element={<MovieManagement />}>
            <Route index element={<ListMovie />} />
            <Route path="add" element={<AddMovie />} />
            <Route path="update" element={<UpdateMovie />} />
            <Route path="showtime/:movieId" element={<ShowtimeManagement />} />
          </Route>
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
