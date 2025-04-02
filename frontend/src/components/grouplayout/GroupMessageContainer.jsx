import React, { useEffect, useRef } from 'react'
import Message from '../chatlayout/Message';
import useChatStore from '../../store/useChatStore';
import { images } from '../../assets/assets';
import GroupMessage from './GroupMessage';

const GroupMessageContainer = ({messages}) => {

    const {isGroupActive} = useChatStore();
    const goToView = useRef();
    useEffect(() => {
      goToView.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
      <div className={`w-full h-[calc(100%-152px)] overflow-y-auto px-10 py-3 flex flex-col gap-5 cm-scrollbar`}>
        {messages?.map((item => (
          <div className='flex gap-2'>
            <GroupMessage key={item._id} message={item}/>
          </div>
        )))}
        <div ref={goToView}></div>
      </div>
    )
  
}

export default GroupMessageContainer
