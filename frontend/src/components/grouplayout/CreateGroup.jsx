import { Camera, Loader as LoaderIcon, MoveRight, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { images } from "../../assets/assets";
import useAuthStore from "../../store/useAuthStore";
import useChatStore from "../../store/useChatStore";
import Loader from "../Loader";
import Members from "./Members";
import SelectedGroupMembers from "./SelectedGroupMembers";

const CreateGroup = () => {
  const [inputText, setInputText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const {
    getAllusers,
    setAllUsers,
    allusers,
    isAlluserFatching,
    setIsCreateGroupActive,
    isCreateGroupActive,
    createGroup 
  } = useChatStore();
  const {uploadFile,isUploadFile,loggedInUser} = useAuthStore();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [files, setFiles] = useState(null);
  const [groupName,setGroupName] = useState('');
  const [groupDes,setGroupDes] = useState('');


  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

  // Add user
  const addUser = (user) => {
    if (!isUserSelected(user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // Remove user
  const removeUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== userId));
  };

  // Check if user is selected
  const isUserSelected = (userId) => {
    return selectedUsers.some((u) => u._id === userId);
  };

  const getAllFriends = async () => {
    const response = await getAllusers();
    if (response.status === "success") {
      return setAllUsers(response.data);
    } else {
      return toast.error(response.message);
    }
  };

  const handleFilter = (e) => {
    const value = e.target.value.trim();
    setInputText(value);
    if (!value) {
      setFilteredUsers([]);
      return;
    }
    const regex = new RegExp(value, "i");
    setFilteredUsers(
      allusers.filter((user) => {
        return regex.test(user.fullname);
      })
    );
  };

  useEffect(() => {
    getAllFriends();
    return () => {
      setAllUsers([]);
    };
  }, []);

  const createGroupReq = async () =>{
    if (isUploadFile) return toast.error("Please wait for the image to load.");
    setIsCreatingGroup(true);
    const users = selectedUsers.map(item=>item._id);
    users.push(loggedInUser._id);
    if(!groupName.trim()) {
      setIsCreatingGroup(false);
      return toast.error("Group name required.");
    }
    if(users.length<3){
      setIsCreatingGroup(false);
      return toast.error("A group must have at least three members");
    } 
    const data={
      name:groupName,
      description:groupDes,
      profileImage:files, 
      admin:loggedInUser._id,
      users
    }
    const response = await createGroup(data);
    setIsCreatingGroup(false);
    if(response.status==="success") return toast.success(response.message);
    else return toast.error(response.message);
    
  }

  return (
    <div className="w-full  flex flex-col gap-5  p-5">
      <button
        onClick={() => setIsCreateGroupActive(!isCreateGroupActive)}
        className="ml-auto text-white bg-cm-green-deep"
      >
        <X />
      </button>
      {/* Form input */}
      <div className="size-20 self-center  rounded-full flex items-center justify-center relative">
        <label className="absolute z-[999] bottom-1 right-1 cursor-pointer">
          <Camera color="rgb(128,229,88)" fill="#fff" />
          <input
            type="file"
            onChange={uploadImage}
            className="hidden"
            accept="image/*"
          />
        </label>
        <div className="w-full h-full overflow-hidden rounded-full flex items-center justify-center">
          {(
            isUploadFile && <div className="absolute w-full h-full flex items-center justify-center">
            <LoaderIcon
              size={30}
              className="animate-spin text-cm-green-deep"
            />
          </div>
          )}
          <img
            className="w-full object-contain "
            src={files?files:images.avatar}
            alt=""
          />
        </div>
      </div>
      <div className="w-full">
        <input value={groupName} onChange={(e)=>setGroupName(e.target.value)} placeholder="Group Name" type="text" className="w-full min-w-[300px] bg-transparent placeholder:text-gray-100 outline-none p-1 border-b-white text-white border-b-2 pr-6" />
      </div>
      <div className="w-full">
        <input value={groupDes} onChange={(e)=>setGroupDes(e.target.value)} placeholder="Group Description" type="text" className="w-full min-w-[300px] bg-transparent placeholder:text-gray-100 outline-none p-1 border-b-white text-white border-b-2 pr-6" />
      </div>
      <div className="w-full relative">
        <input
          type="text"
          value={inputText}
          onChange={handleFilter}
          placeholder="Search user by name..."
          className="w-full min-w-[300px] placeholder:text-gray-100 bg-transparent  outline-none p-1 border-b-white text-white border-b-2 pr-6"
        />
        <Search color="white" size={18} className="absolute bottom-2 right-0" />
      </div>
      {selectedUsers.length > 0 && (
        <div className="">
          <h6 className="text-white text-[12px] font-popin text-medium">
            Selected users
          </h6>
          <div className="flex flex-wrap gap-2 ">
            {selectedUsers.map((user) => (
              <SelectedGroupMembers
                removeUser={removeUser}
                key={user._id}
                user={user}
              />
            ))}
            {selectedUsers && (
              <button onClick={createGroupReq} className="bg-cm-green-deep px-3 hover:bg-white hover:text-cm-dark-chat rounded-full text-white flex items-center gap-2 text-[14px]">
                <span>Create Group</span>
                {isCreatingGroup?<LoaderIcon size={15} className="animate-spin"/>:<MoveRight size={15} />}
              </button>
            )}
          </div>
        </div>
      )}
      {isAlluserFatching ? (
        <Loader />
      ) : allusers.length === 0 ? (
        <h1>No user Found</h1>
      ) : inputText ? (
        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto cm-scrollbar">
          {filteredUsers.map((item) =>
            isUserSelected(item._id) ? null : (
              <Members key={item._id} user={item} addUser={addUser} />
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto cm-scrollbar">
          {allusers.map((item) =>
            isUserSelected(item._id) ? null : (
              <Members key={item._id} user={item} addUser={addUser} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CreateGroup;
