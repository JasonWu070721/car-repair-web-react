import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import SignIn from "./pages/SignIn";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Customer" element={<Customer />} />
      </Routes>
    </Router>
  );
}

export default App;
