import React, { useEffect, useState } from 'react'
import useAuthStore from '../../store/useAuthStore';
import useChatStore from '../../store/useChatStore';
import toast from 'react-hot-toast';
import { Paperclip, Send, X } from 'lucide-react';
import Loader from '../Loader';

const GroupInput = ({group}) => {

    const { loggedInUser, uploadFile, isUploadFile } = useAuthStore();
    const { sendMessageToGroup, selectedGroup } = useChatStore();
    const [inputText, setInputText] = useState("");
    const [files, setFiles] = useState(null);
    const [isImageSelect, setIsImageSelect] = useState(false);
  
    const uploadImage = async (e) => {
      setFiles(null);
      const file = e.target.files[0];
      if (!file) return;
      setIsImageSelect(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;
        const response = await uploadFile({ file: base64Image });
        if (response.status === "success") {
          setFiles(response.data);
          toast.success(response.message);
        } else toast.error(response.message);
      };
    };
  
    const handleSendMessage = async () => {
      if(isUploadFile){
        toast.error("Please wait for image to be loaded.")
        return;
      }
      if (!inputText && !files)
        return toast.error("You can not send empty message.");

      const data = {
        sender: loggedInUser._id,
        context: inputText,
        files: files,
        group,
      };

      const response = await sendMessageToGroup(data);
      if (response.status !== "success") toast.error(response.message);
      setInputText("");
      setFiles(null);
      setIsImageSelect(false);
    };
  
    useEffect(() => {
      setInputText("");
    }, [selectedGroup]);
   
    return (
        <div className="w-full h-8 relative bg-[#F3F3F3] dark:bg-[#2E2E2E] flex items-center p-10 gap-5">
            {isImageSelect && (
                <div
                    className={`w-[150px] ${isUploadFile ? "h-[150px]" : ""
                        }  rounded-sm p-2 absolute top-0 -translate-y-full bg-white`}
                >
                    {files && (
                        <button onClick={() => {
                            setIsImageSelect(false);
                            setFiles(null);
                        }} className="bg-white hover:bg-gray-800/50 hover:text-white w-6 h-6 rounded-full p-1 absolute top-0 right-0 -translate-y-full translate-x-full flex items-center justify-center">
                            <X />
                        </button>
                    )}
                    <div className="w-full h-full  bg-gray-200 rounded-sm overflow-hidden">
                        {files ? (
                            <img className="w-full object-contain object-top" src={files} />
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            )}
            <input
                type="text"
                placeholder="Type your message here..."
                className="bg-white dark:bg-[#333333] px-2 outline-none rounded-sm p-1.5 w-full dark:text-gray-400 "
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />

            <label className="bg-white/90 block hover:bg-cm-dark-chat/10 dark:bg-red-50/10 p-1 rounded-full hover:dark:bg-red-50/20">
                <Paperclip className=" hover:text-white! text-cm-green-deep dark:text-gray-400" />
                <input
                    className="hidden"
                    onChange={uploadImage}
                    type="file"
                    accept="image/*"
                />
            </label>

            <button className="bg-white/90  hover:bg-cm-dark-chat/10 dark:bg-red-50/10 p-1 rounded-full hover:dark:bg-red-50/20">
                <Send
                    onClick={handleSendMessage}
                    className="hover:text-white! text-cm-green-deep dark:text-gray-400"
                />
            </button>
        </div>
    )
}

export default GroupInput
