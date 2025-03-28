import React from 'react'
import { images } from '../../assets/assets'
import { ArrowLeft } from 'lucide-react'
import useChatStore from '../../store/useChatStore'
const ChatHeader = ({profileImg,fullName}) => {
  const {isChatActive,setIsChatActive} = useChatStore();
  return (
    <header className='w-full flex items-center gap-2 bg-[#F3F3F3] px-10 p-5 dark:bg-[#2E2E2E]'>
        <button onClick={()=>setIsChatActive(false)} className='bg-white p-0.5 rounded-full hover:bg-cm-dark-chat/20 hover:text-white block cm-xmd:hidden'><ArrowLeft/></button>
      <img src={profileImg?profileImg:images.avatar} className='w-8 h-8 rounded-full'/>
      <h1 className='font-popin font-medium text-[14px] dark:text-white'>{fullName}</h1>
    </header>
  )
}

export default ChatHeader
