import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header.jsx";
import AddTask from "./Components/AddTask.jsx";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div>
      <Header />
      <AddTask />
      <ToastContainer />
    </div>
  );
}

export default App;
