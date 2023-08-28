import { Route, Routes } from "react-router-dom"
import Login from "./pages/login";
import Event from "./pages/event";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/event" element={ <Event /> } />
    </Routes>
  );
}

export default App
