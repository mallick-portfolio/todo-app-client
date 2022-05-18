import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header.jsx";
import AddTask from "./Components/AddTask.jsx";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import AllTask from "./Components/AllTask.jsx";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AllTask />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
