import React from 'react'
import SmallSidebar from '../components/SmallSidebar'
import MiddleBar from '../components/MiddleBar'
import ChatBar from '../components/ChatBar'
import useChatStore from '../store/useChatStore'

const AppPage = () => {
    const {isChatActive} = useChatStore();
    console.log("------------------",isChatActive);
    return (
        <main className='h-screen'>
            <div className=' relative h-full flex flex-col-reverse cm-xmd:flex-row overflow-x-hidden'>
                <section className='basis-[59px] cm-xmd:basis-[74px] shrink-0 h-full '>
                    <SmallSidebar/>
                </section>
                <section className='h-[calc(100vh-59px)]  w-full cm-xmd:h-full cm-xmd:w-[300px] shrink-0 '>
                    <MiddleBar/>
                </section>
                <section className={`absolute top-0 bottom-0  cm-xmd:static w-full h-full transition-transform duration-300  ${isChatActive?'translate-x-0':'translate-x-full'} cm-xmd:translate-x-0`}>
                    <ChatBar/>
                </section>
            </div>
        </main>
    )
}

export default AppPage
