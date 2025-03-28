import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useChatStore from '../../store/useChatStore';

const ChatMessagesContainer = ({messages}) => {
  const {isChatActive} = useChatStore();
  const goToView = useRef();
  useEffect(() => {
    goToView.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className={`w-full h-[calc(100%-152px)] overflow-y-auto px-10 py-3 flex flex-col gap-5 cm-scrollbar`}>
      {messages?.map((item => (
        <Message key={item._id} message={item}/>
      )))}
      <div ref={goToView}></div>
    </div>
  )
}

export default ChatMessagesContainer
