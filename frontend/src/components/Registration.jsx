import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../assets/assets.js";
import { Camera, Eye, EyeClosed, Loader } from "lucide-react";
import useAuthStore from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const Registration = () => {
  const {uploadFile,isUploadFile,signup,isSigningUp} = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateofbirth: "",
    gender: "",
    profileImage:null,
  });

  const updateFormData = (e) => {
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;
        const response = await uploadFile({file:base64Image});
        if(response.status === "success"){
          setFormData((prev) => ({ ...prev, [e.target.name]: response.data }));
        }else{
          toast.error(response.error);
        }
      };
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleFormData = async(e) => {
    e.preventDefault();
    const validationResult = validateForm();
    if(validationResult){
        const response =await signup(formData);
        if(response.status==="success") {
          toast.success(response.message);
          navigate('/');
        }
        else toast.error(response.message);
    }
  };

  //helper function to add errors in a comma-separated format
  const addError = (errors, field, message) => {
    if (!errors[field]) {
      errors[field] = message;
    } else {
      errors[field] += `, ${message}`;
    }
  };

  const validateForm = () => {
    const fullname = formData.fullname;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const dateofbirth = formData.dateofbirth;
    const gender = formData.gender;
    const profileImage = formData.profileImage;

    const errors = {};

    //Full Name validation
    if (!fullname.trim()) {
      addError(errors, "fullname", "Fullname is Required");
    } else if (fullname.length <= 3) {
      addError(errors, "fullname", "Name must be greater than 3 characters");
    }

    //Email validation
    if (!email.trim()) {
      addError(errors, "email", "Email is required");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        addError(errors,"email", "Invalid email format");
    }

    // Password Validation
    if (!password.trim()) {
      addError(errors, "password", "Password is required");
    } else {
        const missing = [];
    
        if (password.length < 8) {
            addError(errors,"password", "Min 8 chars required");
        }
        if (!/[A-Z]/.test(password)) {
            missing.push("1 uppercase letter");
        }
        if (!/[0-9]/.test(password)) {
            missing.push("1 number");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            missing.push("1 special character");
        }
    
        // Add the combined message if any condition is missing
        if (missing.length > 0) {
            addError(errors, "password", `Must contain at least ${missing.join(", ")}`);
        }
    }

    // Confirm Password Validation
    if (!confirmPassword.trim()) {
      addError(errors, "confirmPassword", "Confirm Password is required");
    }else if(confirmPassword !== password) {
      addError(errors, "confirmPassword", "Passwords do not match");
    }

    // Date of Birth Validation
    if (!dateofbirth.trim()) {
      addError(errors, "dateofbirth", "Date of Birth is required");
    } else {
      const dob = new Date(dateofbirth);
      if (isNaN(dob.getTime())) {
        addError(errors, "dateofbirth", "Invalid Date of Birth");
      }
    }

    // Gender Validation
    if (!gender.trim()) {
      addError(errors, "gender", "Gender is required");
    }

    //Profile Image Validation (Optional)
    // if (!profileImage) {
    //   addError(errors, "profileImage", "Profile image is required");
    // }

    // Update state with errors
    setErrors(errors);

    // Return validation status
    return Object.keys(errors).length === 0;
  };


  return (
    <div className="bg-white rounded-2xl">
      <div className="p-6">
        <div className="my-6">
          <div>
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-2xl font-semibold">Register Account</h3>
            </div>
            <p className="text-gray-500/50 font-popin text-center text-[14px]">
              Get your free <span className="gradient-text font-bold">ChatVerse</span> account now.
            </p>
          </div>
        </div>
        <div className="mx-auto w-[100%] sm:w-[70%] cm-xmd:w-[45%]! mt-8">
          <form onSubmit={handleFormData} className="flex flex-col gap-6">
            {/* Profile Picture */}
            <div className="size-35 sm:size-40 self-center  rounded-full flex items-center justify-center relative">
              <label className="absolute z-[999] bottom-3 right-4 sm:bottom-4 sm:right-4 cursor-pointer">
                <Camera color="rgb(128,229,88)" fill="#fff" />
                {/* <input type="file"> does not support the value attribute. */}
                <input
                  type="file"
                  onChange={updateFormData}
                  name="profileImage"
                  className="hidden"
                  accept="image/*"
                />
              </label>
              <div className="w-full h-full overflow-hidden rounded-full flex items-center justify-center">
                {isUploadFile && <div className="absolute w-full h-full flex items-center justify-center"><Loader size={24} color="rgb(0, 0, 0)" className="animate-spin"/></div>}
                <img
                  className="w-full object-contain "
                  src={
                    formData.profileImage
                      ? formData.profileImage
                      : images.avatar
                  }
                  alt=""
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer text-[14px] font-medium font-popin"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                className="border border-gray-500/60 rounded-sm px-3 py-1.5 outline-none text-[14px]"
                placeholder="Enter Full Name"
                value={formData.fullname}
                onChange={updateFormData}
                type="text"
                id="fullname"
                name="fullname"
              />
              {errors.fullname && (
                <p className="text-[11px] text-red-500">{errors.fullname}</p>
              )}
            </div>

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
              {errors.email && (
                <p className="text-[11px] text-red-500">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="text-[11px] text-red-500">{errors.password}</p>
              )}
            </div>
            {/* Confirm Password */}
            <div className="flex flex-col gap-2 relative">
              <label
                className="cursor-pointer text-[14px] font-medium font-popin"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="border border-gray-500/60 rounded-sm px-3 py-1.5 outline-none text-[14px] pr-7 w-full"
                  placeholder="Enter Password"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={updateFormData}
                />
                <button
                  className="absolute bottom-2 right-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmPassword((prev) => !prev);
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeClosed size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            {/* DOB */}
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer text-[14px] font-medium font-popin"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                className="border border-gray-500/60 rounded-sm px-3 py-1.5 outline-none text-[14px]"
                type="date"
                id="dob"
                name="dateofbirth"
                value={formData.dateofbirth}
                onChange={updateFormData}
              />
              {errors.dateofbirth && (
                <p className="text-[11px] text-red-500">{errors.dateofbirth}</p>
              )}
            </div>
            {/* Gender */}
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer text-[14px] font-medium font-popin">
                Gender
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    className="w-4 h-4 border border-gray-500/60 rounded-full flex items-center justify-center cursor-pointer"
                    value={"male"}
                    onChange={updateFormData}
                  />
                  Male
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    className="w-4 h-4 border border-gray-500/60 rounded-full flex items-center justify-center cursor-pointer"
                    value={"female"}
                    onChange={updateFormData}
                  />
                  Female
                </label>
              </div>
              {errors.gender && (
                <p className="text-[11px] text-red-500">{errors.gender}</p>
              )}
            </div>
            <p className="">
              By registering you agree to the ChatVerse{" "}
              <Link className="text-cm-green-deep">Terms of Use</Link>
            </p>

            <button
              type="submit"
              className="bg-cm-green text-white font-popin p-1.5 rounded-sm cursor-pointer"
            >
              {isSigningUp?<Loader color="#fff" className="mx-auto animate-spin"/>:"Register"}
            </button>
            <p className="text-center ">
              Already have an account ?{" "}
              <Link to="/" className="text-cm-green-deep underline">
                Login
              </Link>
            </p>
          </form>
          <p className="text-center text-sm text-gray-600 mt-20">
            © 2025 <span className="gradient-text font-bold">ChatVerse</span> Crafted
            with ❤️ by{" "}
            <a
              href="https://my-personal-portfolio-dh7s.vercel.app/"
              target="_blank"
              className="font-popin font-medium text-cm-green-deep underline"
            >
              Rajesh Pal
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
