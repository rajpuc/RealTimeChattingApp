import React from 'react'
import { images } from '../../assets/assets'

const ChatHome = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='flex flex-col items-center gap-3'>
                <div className='w-20 h-20 bg-[#D2E4D8] rounded-full flex items-center justify-center'>
                    <img className='w-3/4 h-3/4' src={images.logo} alt="" />
                </div>
                <h1 className='text-xl sm:text-3xl font-semibold font-popin text-center dark:text-white '>Welcome to <span className='gradient-text'>Chatverse</span> App</h1>
                <p className="dark:text-white font-popin text-center text-[14px]">
                    Connect, Chat, and Collaborate in Real Time! 🚀
                </p>
            </div>
        </div>
    )
}

export default ChatHome
