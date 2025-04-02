import React from 'react'
import useAuthStore from '../../store/useAuthStore';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { images } from '../../assets/assets';
dayjs.extend(relativeTime);

const GroupMessage = ({ message }) => {
    const { loggedInUser } = useAuthStore();
    const sender = message.sender._id === loggedInUser._id;
    return (
        <div className={`flex w-full gap-2 ${sender ? "flex-row-reverse" : ""}`}>
            <img className='w-6 h-6 rounded-full' src={message.sender.profileimage ? message.sender.profileimage : images.avatar} alt="" />
            <div className={`w-full ${sender ? "ml-auto" : ""}`}>
                {message.files ? (
                    <img
                        className={`w-fit cm-xmd:max-w-[250px] max-w-[150px] mb-3 object-contain object-center ${sender ? "ml-auto" : ""}`}
                        src={message.files}
                        alt=""
                    />
                ) : (
                    ""
                )}
                {message.context && (
                    <div
                        className={`bg-cm-green/30 rounded-md text-[15px] font-popin dark:text-white p-1 px-3 w-fit max-w-1/2 ${sender ? "ml-auto" : ""
                            }`}
                    >
                        {message.context}
                    </div>
                )}
                <p
                    className={`text-[10px] dark:text-white w-fit ${sender ? "ml-auto" : ""
                        }`}
                >
                    {dayjs(message.createdAt).fromNow()}
                </p>
            </div>
        </div>
    );
}

export default GroupMessage
