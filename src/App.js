import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route exact path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
