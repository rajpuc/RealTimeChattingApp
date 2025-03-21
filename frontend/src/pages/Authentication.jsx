import React from "react";
import { Outlet } from "react-router-dom";
import { images } from "../assets/assets.js";

const Authentication = () => {
  return (
    <main className="flex relative flex-col gap-6 cm-xmd:flex-row w-full min-h-screen bg-cm-green p-6">
      <div className=" w-full  cm-xmd:w-[30%] max-h-dvh">
        <div>
          <div className="flex items-center justify-center cm-xmd:justify-start mb-2">
            <div className="flex items-center ">
              <img className="size-8" src={images.logo} alt="" />
            </div>
            <h1 className="chat-heading">ChatVerse</h1>
          </div>
          <p className="text-white font-popin text-center cm-xmd:text-start text-[12px] cm-xmd:text-[14px]">
            ChatVerse – Connect, Chat, and Collaborate in Real Time! 🚀
          </p>
        </div> 
      </div>
      <div className="hidden pointer-events-none cm-xmd:block absolute top-[43.2vh] cm-xmd:w-[49%] cm-xlmd:w-[40%] ">
          <img
            className=""
            src={images.display}
            alt=""
          />
        </div>
      <div className=" w-full ">
        <Outlet />
      </div>
    </main>
  );
};

export default Authentication;
