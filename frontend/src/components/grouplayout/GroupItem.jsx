import React from 'react'
import { images } from '../../assets/assets'
import useChatStore from '../../store/useChatStore'

const GroupItem = ({group}) => {
  const {selectedGroup,setSelectedGroup,setIsGroupActive} = useChatStore();
  const isActive = selectedGroup?selectedGroup._id===group._id:false;
  return (
    <button onClick={()=>{
      setSelectedGroup(group);
      setIsGroupActive(true);
    }} className={`flex gap-2 items-center hover:bg-cm-lightdark/10 hover:dark:bg-white/10 ${isActive? 'bg-cm-green hover:bg-cm-green-deep! dark:text-white':null }`}>
      <img className='w-8 h-8 rounded-full' src={group.profileImage?group.profileImage:images.group} alt="" />
      <p className='font-popin font-medium'>{group.name}</p>
    </button>
  )
}

export default GroupItem
