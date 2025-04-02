import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Eye, EyeClosed, Loader } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const { isSigningIn, signin} = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    const response = await signin(formData);

    if(response.status === "success"){
      toast.success(response.message);
      navigate("/chat");
    } 
    else toast.error(response.message);
  };

  return (
    <div className="">
      <>
        <div className="my-6">
          <div>
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-2xl font-semibold"> Welcome Back !</h3>
            </div>
            <p className="text-gray-500/50 font-popin text-center text-[14px]">
              Sign in to continue to{" "}
              <span className="gradient-text font-bold">ChatVerse</span> 
            </p>
          </div>
        </div>
        <div className="  mx-auto w-[100%] sm:w-[70%] cm-xmd:w-[45%]! mt-8">
          <form onSubmit={handleFormData} className="flex flex-col gap-6">


            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer text-[14px] font-medium font-popin"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border border-gray-500/60 rounded-sm px-3 py-1.5 outline-none text-[14px]"
                placeholder="Enter Email"
                value={formData.email}
                onChange={updateFormData}
                type="email"
                id="email"
                name="email"
              />
            </div>
            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer text-[14px] font-medium font-popin"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="border w-full border-gray-500/60 rounded-sm px-3 py-1.5 outline-none text-[14px] pr-7"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={updateFormData}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                />
                <button
                  className="absolute bottom-2 right-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <EyeClosed size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-cm-green text-white font-popin p-1.5 rounded-sm cursor-pointer"
            >
              {isSigningIn ? (
                <Loader color="#fff" className="mx-auto animate-spin" />
              ) : (
                "Login"
              )}
            </button>
            <p className="text-center ">
              Don't have an account ?{" "}
              <Link to="/register" className="text-cm-green-deep underline">
                Register
              </Link>
            </p>
          </form>
          <p className="text-center text-sm text-gray-600 mt-20 cm-xmd:mt-40 ">
            © 2025 <span className="gradient-text font-bold">ChatVerse</span>{" "}
            Crafted with ❤️ by{" "}
            <a
              href="https://my-personal-portfolio-dh7s.vercel.app/"
              target="_blank"
              className="font-popin font-medium text-cm-green-deep underline"
            >
              Rajesh Pal
            </a>
          </p>
        </div>
      </>
    </div>
  );
};

export default Login;
