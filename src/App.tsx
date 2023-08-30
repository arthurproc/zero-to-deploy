import { Route, Routes } from "react-router-dom"
import Login from "./pages/login";
import Event from "./pages/event";
import Dashboard from "./pages/dashboard";
import MainLayout from "./layouts/main";
import PrivateRoute from "./components/private-route";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <MainLayout /> }>
        <Route path="/event/:eventId" element={ <PrivateRoute component={ <Event /> } /> } />
        <Route path="/dashboard" element={ <PrivateRoute component={ <Dashboard /> } /> } />
      </Route>
    </Routes>
  );
}

export default App
