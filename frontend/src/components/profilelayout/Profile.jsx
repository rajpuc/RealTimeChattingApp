import React from 'react'
import useAuthStore from '../../store/useAuthStore'
import { images } from '../../assets/assets';
import { CalendarDays, Mail } from 'lucide-react';
import dayjs from 'dayjs';

const Profile = () => {
  const{loggedInUser} = useAuthStore();
  return (
    <div className='h-full'>
      <div className='relative border-b-1 border-b-gray-400/40'>
          <h1 className="font-popin absolute top-5 px-5 font-medium text-xl gradient-text">
            My Profile
          </h1>
          <img className='h-[160px] w-full object-center object-cover' src={images.profilebg} alt="" />
          <img className='w-25 h-25 object-top object-cover rounded-full absolute top-[160px] -translate-y-1/2 left-1/2 -translate-x-1/2 ' src={loggedInUser.profileimage?loggedInUser.profileimage:images.avatar} alt="" />
          <h1 className='mt-[65px] text-center text-lg font-medium font-popin mb-5'>{loggedInUser.fullname}</h1>
      </div>
      <div className='h-[calc(100%-274px)] overflow-y-auto cm-scrollbar py-5'>
        <div className='flex items-center w-full justify-center gap-2'>
          <Mail size={18}/>
          <p>{loggedInUser.email}</p>
        </div>
        <div className='flex items-center w-full justify-center gap-2 mt-5'>
          <CalendarDays size={18}/>
          <p>{dayjs(loggedInUser.dateofbirth).format('DD MMM YYYY')}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
