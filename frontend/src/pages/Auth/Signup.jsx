import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/helper";
import ProfileSelector from "../../components/Input/ProfileSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const Signup = () => {
  // Set States

  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  // Use Context
  const { updateUser } = useContext(UserContext);

  // Navigate
  const navigate = useNavigate();

  // Submit Handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Check Profile
    let profileImageUrl = "";
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

    // Check Name Condition
    if (!fullName) {
      setError("Plase Enter Password.");
      return;
    }

    setError("");

    // Signup API Call
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGSITER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Someting went Wronge. Please try again.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Hello!</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your deatils and create your account.
        </p>
        <form onSubmit={handleSignUp}>
          <ProfileSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Name"
              placeholder="Enter Your Name"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="email@gamil.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Password min 8 Character"
                type="password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 pb-2.5 text-xs">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGNUP
          </button>

          <p className="text-[13px] text-slate-800 mt-3 ">
            have an account?{" "}
            <Link className=" font-medium text-primary underline" to={"/login"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
