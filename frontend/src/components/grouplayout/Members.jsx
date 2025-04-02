import React from 'react'
import { images } from '../../assets/assets'
import { Minus, Plus } from 'lucide-react'

const Members = ({user,addUser}) => {
  return (
    <div className='w-full bg-cm-green-deep p-1 gap-15 rounded-sm flex justify-between items-center px-2'>
      <div className='flex items-center gap-2 shrink-0'>
        <div className='w-8 h-8 overflow-hidden flex shrink-0 items-center justify-center'>
            <img className='w-full h-full rounded-full' src={user.profileimage?user.profileimage:images.avatar} alt="" />
        </div>
        <h3 className='text-white'>{user.fullname}</h3>
      </div>
      <button onClick={()=>addUser(user) } className='shrink-0 text-white w-8 h-8 rounded-full bg-cm-green flex items-center justify-center'>
      <Plus/>
      </button>
    </div>
  )
}

export default Members
