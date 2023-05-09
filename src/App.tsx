import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import Orders from "./Orders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
