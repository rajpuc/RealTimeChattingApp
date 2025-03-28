import React from 'react';
import { Link } from "react-router-dom"; 
import { images } from '../../assets/assets';

const ChatItems = ({ profileimage,onClick, user, isOnline = false, isActive=false}) => {
  return (
    <Link  onClick={onClick} className={`w-full py-1  px-6  block`}>
      <div className={`flex items-center  gap-2 ${isActive ? 'bg-cm-green text-white' : ''}`}>
        <div className="w-8 h-8 relative rounded-full">
          <img
            src={user.profileimage ? user.profileimage : images.avatar}
            alt="Chat Profile"
            className="w-full h-full rounded-full object-cover"
          />
          {isOnline && <div className='w-2 h-2 bg-cm-green-deep rounded-full absolute bottom-0.5 right-0.5 outline-1 outline-white dark:outline-cm-dark'></div>}
        </div>
        <h3>{user.fullname}</h3>
      </div>
    </Link>
  );
};

export default ChatItems;
