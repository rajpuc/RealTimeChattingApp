import React, { useState } from "react";
import { images } from "../assets/assets.js";
import SmalllSidebarBtn from "./SmalllSidebarBtn.jsx";
import useThemeStore from "../store/useThemeStore.js";
import { Sun, SunMoon } from "lucide-react";
import useDataStore from "../store/useDataStore.js";
import useAuthStore from "../store/useAuthStore.js";

const SmallSidebar = () => {
  const { darkMode, setDarkMode } = useThemeStore();
  const { upperMenuItems, setActiveMenu } = useDataStore();
  const { loggedInUser ,logout} = useAuthStore();
  const [isSubLinksActive, setIsSubLinksActive] = useState(false);
  return (
    <div className="flex  cm-xmd:flex-col items-center w-full h-full bg-cm-dark justify-between cm-xmd:gap-10 px-4 cm-xmd:px-4 cm-xmd:py-4">
      <div className="w-fit order-2 cm-xmd:order-0 cm-xmd:flex items-center justify-center hidden">
        <img src={images.logo} className="w-10 h-10" alt="" />
      </div>

      {/* Sidebar Buttons */}
      {Object.entries(upperMenuItems).map(([key, item]) => (
        <SmalllSidebarBtn
          key={item.id}
          icon={
            <item.icon className={`w-[20px] h-[20px] cm-xmd:w-[24px] cm-xmd:h-[24px] ${item.active ? 'text-cm-green-deep' : ''}`} />
          }
          name={item.name}
          isActive={item.active}
          onClick={() => {
            setActiveMenu(key);
          }}
        />
      ))}

      <a
        href="#"
        onClick={() => setDarkMode()}
        className="block text-cm-icon cm-xmd:mt-auto"
      >
        {darkMode ? <Sun size={28} /> : <SunMoon size={28} />}
      </a>
      <div className="relative">
        {
          isSubLinksActive && <div className="border-gray-400/50 border right-0 cm-xmd:right-auto
           absolute top-0 -translate-y-[calc(100%+5px)] bg-white p-2 shadow-2xl rounded-sm">
            <button className="cursor-pointer" onClick={() => {
              setActiveMenu("Profile");
            }}>Profile</button>
            <button className="cursor-pointer" onClick={async ()=>{
              await logout();
            }}>Logout</button>
          </div>
        }
        <button onClick={() => setIsSubLinksActive(prev => !prev)} className="block text-cm-icon ">

          <img src={loggedInUser ? loggedInUser.profileimage : images.avatar} className="w-10 h-10 rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default SmallSidebar;
