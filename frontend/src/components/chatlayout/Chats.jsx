import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import ChatItems from "./ChatItems";
import useChatStore from "../../store/useChatStore";
import toast from "react-hot-toast";
import Loader from "../Loader";
import useAuthStore from "../../store/useAuthStore";

const Chats = () => {
  const [scrolling, setScrolling] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const {
    allusers,
    isAlluserFatching,
    getAllusers,
    setAllUsers,
    setSelectedUser,
    selectedUser,
    setIsChatActive,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const handleScroll = () => {
    setScrolling(true);
    setTimeout(() => {
      return setScrolling(false);
    }, 1000);
  };

  const getAllFriends = async () => {
    const response = await getAllusers();
    if (response.status === "success") {
      return setAllUsers(response.data);
    } else {
      return toast.error(response.message);
    }
  };

  useEffect(() => {
    getAllFriends();
    return () => {
      setAllUsers([]);
      setSelectedUser(null);
    };
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.trim();
    if (!value) {
      setFilteredUsers([]);
      return;
    }
    const regex = new RegExp(value, "i");
    setFilteredUsers(
      allusers.filter((user) => {
        return regex.test(user.fullname);
      })
    );
  };

  return (
    <div className="w-full h-full">
      <div className="w-full pt-6 pl-6 pr-6">
        <div className="mb-6">
          <h1 className="font-popin font-medium text-xl gradient-text">
            Chats
          </h1>
        </div>
        <div className="w-full flex bg-cm-gray rounded-sm overflow-hidden dark:bg-cm-dark mb-5">
          <input
            type="text"
            placeholder="Search here.."
            className="w-full p-2  pl-2 outline-none text-[14px]"
            onChange={handleFilter}
          />
          <button className="hover:bg-cm-gray-hover dark:hover:bg-cm-dark w-14 flex items-center justify-center">
            <Search className="dark:text-white" size={15} />
          </button>
        </div>
      </div>
      {/* Chat Containers */}
      <div
        onScroll={handleScroll}
        className={` h-[calc(100%-133px)] overflow-y-auto cm-scrollbar ${
          scrolling ? "cm-scrollbar" : "scrollbar-hide"
        }`}
      >
        {isAlluserFatching ? (
          <Loader />
        ) : allusers.length === 0 ? (
          <h1>No user Found</h1>
        ) : (
          filteredUsers.length > 0 ? filteredUsers.map((item) => (
            <ChatItems
              key={item._id}
              user={item}
              onClick={(e) => {
                e.preventDefault();
                setSelectedUser(item);
                setIsChatActive(true);
              }}
              isOnline={onlineUsers.includes(item._id)}
              isActive={item._id === selectedUser?._id}
            />
          )) : allusers.map((item) => (
            <ChatItems
              key={item._id}
              user={item}
              onClick={(e) => {
                e.preventDefault();
                setSelectedUser(item);
                setIsChatActive(true);
              }}
              isOnline={onlineUsers.includes(item._id)}
              isActive={item._id === selectedUser?._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Chats;
