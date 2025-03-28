import React, { useEffect, useState } from "react";
import useChatStore from "../../store/useChatStore";
import useAuthStore from "../../store/useAuthStore";
import ChatMessagesContainer from "./ChatMessagesContainer";
import ChatInput from "./ChatInput";
import toast from "react-hot-toast";
import Loader from "../Loader";
import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
  const { selectedUser, messages, getChatId, getMessages, subscribeToMessages, unsubscribeToMessages } = useChatStore();
  const { loggedInUser } = useAuthStore();
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoding] = useState(false);

  const retrivedMessages = async (req, res) => {
    setIsLoding(true);
    const chatIdResponse = await getChatId({
      users: [selectedUser._id, loggedInUser._id],
    });
    setChatId(chatIdResponse.data._id);
    const messagesResponse = await getMessages(chatIdResponse.data._id);
    if (messagesResponse.status !== "success")
      toast.error(messagesResponse.message);
    setIsLoding(false);
  };

  useEffect(() => {
    retrivedMessages();
    subscribeToMessages();
    return ()=>(
      unsubscribeToMessages() 
    )
  }, [selectedUser._id, loggedInUser._id]);

  console.log(selectedUser)
  return (
    <div className={`w-full h-full`}>
      <ChatHeader fullName={selectedUser.fullname} profileImg={selectedUser.profileimage}/>
      {isLoading ? <Loader /> : <ChatMessagesContainer messages={messages} />}
      <ChatInput chat={chatId} />
    </div>
  );
};

export default ChatContainer;
