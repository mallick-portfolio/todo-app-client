import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header.jsx";
import AddTask from "./Components/AddTask.jsx";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import AllTask from "./Components/AllTask.jsx";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import RequireAuth from "./Components/RequireAuth.jsx";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AllTask />} />
        <Route
          path="/add-task"
          element={
            <RequireAuth>
              <AddTask />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
