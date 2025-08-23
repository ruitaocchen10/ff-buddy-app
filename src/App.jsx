import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateARanking from "./pages/CreateARanking.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-ranking" element={<CreateARanking />} />
      </Routes>
    </div>
  );
}

export default App;
