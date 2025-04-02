import React, { useEffect } from 'react'
import ChatBar from '../components/ChatBar'
import CreateGroup from '../components/grouplayout/CreateGroup'
import MiddleBar from '../components/MiddleBar'
import SmallSidebar from '../components/SmallSidebar'
import useChatStore from '../store/useChatStore'
import useAuthStore from '../store/useAuthStore'

const AppPage = () => {
    const {isChatActive, isGroupActive, isCreateGroupActive} = useChatStore();


    return (
        <main className='h-screen relative'>
            <div className=' relative h-full flex flex-col-reverse cm-xmd:flex-row overflow-x-hidden'>
                <section className='basis-[59px] cm-xmd:basis-[74px] shrink-0 h-full '>
                    <SmallSidebar/>
                </section>
                <section className='h-[calc(100vh-59px)]  w-full cm-xmd:h-full cm-xmd:w-[300px] shrink-0 '>
                    <MiddleBar/>
                </section>
                <section className={`absolute top-0 bottom-0  cm-xmd:static w-full h-full transition-transform duration-300  ${isChatActive||isGroupActive?'translate-x-0':'translate-x-full'} cm-xmd:translate-x-0`}>
                    <ChatBar/>
                </section>
            </div>

            {/* Pop up components Area */}
            {
                isCreateGroupActive && <div className='absolute top-0 left-0 w-full h-screen bg-yellow-50/40 flex items-center justify-center px-10'>
                    <div className='w-full max-w-[500px] min-w-[300px] bg-cm-green shadow-xl rounded-md '>
                        <CreateGroup/>
                    </div>
                </div>
            }
        </main>
    )
}

export default AppPage
