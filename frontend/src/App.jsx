import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import { Toaster } from "react-hot-toast";



// ROOT ELEMENT
const Root = ()=>{
  // Check Token
  const isAuthenticated = !!localStorage.getItem("token")

  // Redirect The Location
  return isAuthenticated ?( <Navigate to='/dashboard'/> ): (<Navigate to='/login' />)

}

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
      <Toaster toastOptions={{ className:"", style:{fontSize:"13px"}}}/>
    </div>
  );
};


export default App;
