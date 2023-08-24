import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <h1 className="text-3xl font-bold underline text-red-500">Hello world!</h1> } />
    </Routes>
  );
}

export default App
