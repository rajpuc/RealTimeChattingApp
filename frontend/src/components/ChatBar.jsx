import React from "react";
import { images } from "../assets/assets";
import ChatHome from "./chatlayout/ChatHome";
import useChatStore from "../store/useChatStore";
import ChatContainer from "./chatlayout/ChatContainer";
import useDataStore from "../store/useDataStore";
import GroupContainer from "./grouplayout/GroupContainer";
import useAuthStore from "../store/useAuthStore";

const ChatBar = () => {
  const { selectedUser,selectedGroup } = useChatStore();
  const { upperMenuItems } = useDataStore();
  return (
    <div
      className={`w-full h-full bg-cm-light-chat dark:bg-cm-dark-chat`}
      style={{ backgroundImage: `url(${images.background})` }}
    >
      {upperMenuItems.Chats.active && selectedUser ? (
        <ChatContainer />
      ) : upperMenuItems.Groups.active && selectedGroup ? (
        <GroupContainer />
      ) : (
        <ChatHome />
      )}
    </div>
  );
};

export default ChatBar;
