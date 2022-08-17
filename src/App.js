import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "./config/Router";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
