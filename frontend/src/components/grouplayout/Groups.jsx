import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import useChatStore from "../../store/useChatStore";
import useAuthStore from "../../store/useAuthStore";
import Loader from "../Loader";
import GroupItem from "./GroupItem";

const Groups = () => {
  const [scrolling, setScrolling] = useState(false)
  const [filteredGroups, setFilteredGroups] = useState([]);
  const {
    setIsCreateGroupActive,
    isCreateGroupActive,
    allGroups,
    setAllGroups,
    getAllGroups,
    setSelectedGroup,
    isAllGroupFatching
  } = useChatStore();
  const { loggedInUser } = useAuthStore();

  const handleScroll = () => {
    setScrolling(true);
    setTimeout(() => {
      return setScrolling(false);
    }, 1000);
  };

  useEffect(() => {

    getAllGroups(loggedInUser._id);

    return () => {
      setAllGroups([]);
      setSelectedGroup(null);
    };
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.trim();
    console.log(value)
    if (!value) {
      setFilteredGroups([]);
      return;
    }
    const regex = new RegExp(value, "i");
    setFilteredGroups(
      allGroups.filter((user) => {
        return regex.test(user.name);
      })
    );
  };

  return (
    <div className="w-full h-full">
      <div className="w-full pt-6 pl-6 pr-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="font-popin font-medium text-xl gradient-text">
            Groups
          </h1>
          <button
            onClick={() => setIsCreateGroupActive(!isCreateGroupActive)}
            className="text-cm-green-deep bg-cm-dark/20 hover:bg-cm-dark/10 dark:bg-cm-dark-chat p-0.5 rounded-sm hover:dark:bg-cm-dark/30"
          >
            <Plus />
          </button>
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
        {isAllGroupFatching ? (
          <Loader />
        ) : filteredGroups.length > 0 ? (
          <div className="px-5 flex flex-col gap-2">
            {filteredGroups.map((item) => (
              <GroupItem key={item._id} group={item} />
            ))}
          </div>
        ) : (
          <div className="px-5 flex flex-col gap-2">
            {allGroups.map((item) => (
              <GroupItem key={item._id} group={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
