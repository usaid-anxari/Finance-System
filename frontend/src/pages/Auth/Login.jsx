import React, { useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  // Set States
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate
  const navigate = useNavigate();

  // Submit Handler
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check Email Condition
   if (!validateEmail(email)) {
       setError("Plase enter a valid Email.");
       return;
     }
 
     // Check Password Condition
     if (!password) {
       setError("Plase Enter Password.");
       return;
     }

    setError("")

    // Login API Call

    

  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your email and password to login to your account.
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="email@gamil.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Password"
            type="password"
          />
          {error && <p className="text-red-500 pb-2.5 text-xs">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3 ">Don't have an account?{" "}
             <Link className=" font-medium text-primary underline" to={'/signup'}>Sign Up</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
