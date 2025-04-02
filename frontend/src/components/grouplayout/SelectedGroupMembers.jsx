import React from 'react'
import { images } from '../../assets/assets'
import { X } from 'lucide-react'

const SelectedGroupMembers = ({user,removeUser}) => {
  return (
    <div className='flex p-1 gap-2 items-center bg-white w-fit rounded-2xl'>
      <img className='w-4 h-4 rounded-full' src={user.profileimage?user.profileimage:images.avatar} alt="" />
      <p className='text-[12px]'>{user.fullname.split(" ")[0]}</p>
      <button onClick={()=>removeUser(user._id)}><X className='w-4 h-4'/></button>
    </div>
  )
}

export default SelectedGroupMembers
