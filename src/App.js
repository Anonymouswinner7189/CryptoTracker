import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import { styled } from "@mui/system";
import Alerts from "./components/Alerts";

function App() {
  const AppWrapper = styled("div")({
    backgroundColor: "#141618",
    color: "white",
    minHeight: "100vh",
  });

  return (
    <BrowserRouter>
      <AppWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        <Alerts />
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
