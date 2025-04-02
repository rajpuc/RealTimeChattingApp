import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { images } from "../../assets/assets";
import { CalendarDays, Camera, Loader, Mail, Pencil, Save } from "lucide-react";
import dayjs from "dayjs";
import toast from "react-hot-toast";

const Settings = () => {
  const {
    loggedInUser,
    uploadFile,
    isUploadFile,
    updateProfile,
    isUpdatingProfile,
  } = useAuthStore();
  const [files, setFiles] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [fullname, setFullname] = useState(loggedInUser.fullname);
  const [email, setEmail] = useState(loggedInUser.email);
  const [dateofbirth, setDateofbirth] = useState(
    dayjs(loggedInUser.dateofbirth).format("YYYY-MM-DD")
  );

  const updateProfileData = async () => {
    if (isUploadFile) {
      toast.error("Please wait for image to be loaded.");
      return;
    }
    if (!email && !dateofbirth && !fullname)
      return toast.error("You can not update empty field.");

    const data = {
      fullname,
      email,
      dateofbirth,
      profileimage: files,
    };

    const response = await updateProfile(data);
    if (response.status === "success") toast.success(response.message);
    else toast.error(response.message);
    setFiles(null);
    setIsEdit((prev) => !prev);
  };

  const uploadImage = async (e) => {
    setFiles(null);
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      const response = await uploadFile({ file: base64Image });
      if (response.status === "success") {
        setFiles(response.data);
        toast.success(response.message);
      } else toast.error(response.message);
    };
  };

  return (
    <div className="h-full">
      <div className="relative border-b-1 border-b-gray-400/40">
        <div className="flex items-center justify-between w-full absolute top-5 px-5">
          <h1 className="font-popin  font-medium text-xl gradient-text">
            Settings
          </h1>
          {isUpdatingProfile ? (
            <button className="w-7 h-7 rounded-full flex items-center justify-center bg-cm-green text-white"><Loader className="animate-spin"/></button>
          ) : (
            <button
              onClick={() => {
                isEdit ? updateProfileData() : setIsEdit((prev) => !prev);
              }}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-cm-green text-white"
            >
              {isEdit ? <Save size={18} /> : <Pencil size={18} />}
            </button>
          )}
        </div>
        <img
          className="h-[160px] w-full object-center object-cover"
          src={images.profilebg}
          alt=""
        />
        <label className="w-25 h-25 absolute top-[160px] -translate-y-1/2 left-1/2 -translate-x-1/2  rounded-full">
          {isUploadFile ? (
            <>
              <img
                className="w-25 h-25 object-top object-cover rounded-full  "
                src={images.avatar}
                alt=""
              />
              <div className="top-0 w-full h-full absolute z-1 flex items-center justify-center">
                <Loader className="animate-spin text-cm-green-deep" />
              </div>
            </>
          ) : (
            <img
              className="w-25 h-25 object-top object-cover rounded-full  "
              src={
                files
                  ? files
                  : loggedInUser.profileimage
                  ? loggedInUser.profileimage
                  : images.avatar
              }
              alt=""
            />
          )}
          {isEdit ? (
            <div className="absolute bottom-0 right-4  text-white cursor-pointer">
              <Camera size={18} fill="#000" />
              <input onChange={uploadImage} type="file" className="hidden" />
            </div>
          ) : null}
        </label>
        {isEdit ? (
          <div className="w-full flex">
            <input
              className="mt-[65px] outline-none mb-5 border-b border-b-cm-green w-1/2 mx-auto text-center"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
        ) : (
          <h1 className="mt-[65px] text-center text-lg font-medium font-popin mb-5">
            {loggedInUser.fullname}
          </h1>
        )}
      </div>
      <div className="h-[calc(100%-274px)] overflow-y-auto cm-scrollbar py-5">
        <div className="flex items-center w-full justify-center gap-2">
          <Mail size={18} />
          {isEdit ? (
            <input
              className="outline-none border-b border-b-cm-green  text-center"
              type="email"
              value={email}
              onChange={(e) => set(e.target.value)}
            />
          ) : (
            <p>{loggedInUser.email}</p>
          )}
        </div>
        <div className="flex items-center w-full justify-center gap-2 mt-5">
          <CalendarDays size={18} />
          {isEdit ? (
            <input
              className="outline-none border-b border-b-cm-green  text-center"
              type="date"
              value={dateofbirth}
              onChange={(e) => setDateofbirth(e.target.value)}
            />
          ) : (
            <p>{dayjs(loggedInUser.dateofbirth).format("DD MMM YYYY")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
