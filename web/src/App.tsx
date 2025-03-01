import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import CreateGame from "./pages/host/createGame";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateGame />}>
        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
