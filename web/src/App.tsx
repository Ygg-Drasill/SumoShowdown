import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CreateGame from "./pages/host/createGame";
import Dashboard from "./pages/host/dashboard";
import StartGame from "./pages/host/startGame";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateGame />} />
        <Route path="/game" element={<StartGame />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
