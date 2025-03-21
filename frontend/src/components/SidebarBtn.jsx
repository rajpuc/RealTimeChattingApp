import { Sun, SunMoon } from 'lucide-react'
import React from 'react'
import useThemeStore from '../store/useThemeStore.js'

const SidebarBtn = () => {
  const {darkMode,setDarkMode} = useThemeStore();
  return (
    <button className='cursor-pointer' onClick={()=>setDarkMode()}>
        {darkMode?<Sun size={28}/>: <SunMoon size={28}/>}
    </button>    
  )
}

export default SidebarBtn
