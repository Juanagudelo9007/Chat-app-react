import React from 'react'
import ChatList from './ChatList';
import { RiImageEditLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";

const UserInfo = () => {


  return (
    <div className="flex flex-1 flex-col p-2 gap-4">
      <div className="flex justify-between items-center p-4 border-b-1 ">
        <div className="flex justify-center items-center gap-2">
          <img className="h-8 w-8 rounded-full object-cover" src="./avatar.png" alt="" />
          <h1>Baner</h1>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span>
            <RiImageEditLine />
          </span>
          <span>
            <HiDotsHorizontal />
          </span>
        </div>
      </div>
      <ChatList />
    </div>
  );
}

export default UserInfo