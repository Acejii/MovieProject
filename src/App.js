import MainLayout from "components/MainLayout";
import AccountLayout from "modules/Auth/components/AccountLayout";
import Home from "modules/Home/pages/Home";
import Movie from "modules/Movie/pages/Movie";
import Ticket from "modules/Ticket/page/Ticket";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="movie/:movieId" element={<Movie />} />
          <Route path="ticket/:showtimeId" element={<Ticket />} />
          <Route path="account/:status" element={<AccountLayout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
