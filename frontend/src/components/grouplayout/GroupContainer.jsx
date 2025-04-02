import React, { useEffect, useState } from 'react'
import GroupHeader from './GroupHeader';
import useChatStore from '../../store/useChatStore';
import GroupInput from './GroupInput';
import GroupMessageContainer from './GroupMessageContainer';
import toast from 'react-hot-toast';
import Loader from '../Loader';

const GroupContainer = () => {
  const {selectedGroup, groupMessages, getGroupMessages,setGroupMessages,subscribeToGroupMessage,unsubscribeToGroupMessage} = useChatStore();
  const [isLoading, setIsLoding] = useState(false);


  const retrivedMessages = async () => {
    setIsLoding(true);
    const response = await getGroupMessages(selectedGroup._id);
    if(response.status !== "success")  toast.error(response.message);
    setIsLoding(false);
  };

  useEffect(()=>{
    retrivedMessages();
    subscribeToGroupMessage();
    return ()=>{
      unsubscribeToGroupMessage();
      setGroupMessages([]);
    }
  },[selectedGroup._id]);

  return (
      <div className={`w-full h-full`}>
        <GroupHeader fullName={selectedGroup.name} profileImg={selectedGroup.profileImage} />
        {isLoading ? <Loader /> : <GroupMessageContainer messages={groupMessages} />}
        <GroupInput group={selectedGroup._id} />
      </div>

  )
}

export default GroupContainer
