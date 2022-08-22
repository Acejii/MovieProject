import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { publicRoutes } from "./routes/routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {publicRoutes.map((route, id) => (
          <Route key={id} path={route.path} element={route.component} />
        ))}
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
