import React from 'react'
import useDataStore from '../store/useDataStore'
import Chats from './chatlayout/Chats';
import Profile from './chatlayout/Profile';
import Groups from './chatlayout/Groups';
import Settings from './chatlayout/Settings';

const MiddleBar = () => {
  const {upperMenuItems} = useDataStore();
  return (
    <div className='w-full h-full  bg-white dark:bg-cm-lightdark dark:text-cm-textcolor'>
      {upperMenuItems.Profile.active && <Profile />}
      {upperMenuItems.Chats.active && <Chats />}
      {upperMenuItems.Groups.active && <Groups />}
      {upperMenuItems.Settings.active && <Settings />}
    </div>
  )
}

export default MiddleBar
