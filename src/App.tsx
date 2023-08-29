import { Route, Routes } from "react-router-dom"
import Login from "./pages/login";
import Event from "./pages/event";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/event/:eventId" element={ <Event /> } />
      <Route path="/dashboard" element={ <Dashboard /> } />
    </Routes>
  );
}

export default App
