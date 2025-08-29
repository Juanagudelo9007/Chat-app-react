import React from "react";
import { CiSearch } from "react-icons/ci";
import { MdAddCircleOutline } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";

const ChatList = () => {
  return (
    <div className="mt">
      <div className="flex flex-col gap-4" id="main-container">
        <div className="relative" id="search">
          <input
            type="search"
            className="outline-none rounded-md border-1 pl-6"
          />
          <span className="absolute top-1.5 left-1.5">
            <CiSearch />
          </span>
        </div>
        <div
          className="flex items-center gap-2 border-b-1  border-white p-1 "
          id="profile-info"
        >
          <img className="h-8 w-8 rounded-full" src="./avatar.png" alt="" />
          <div className="flex items-center gap-2 text-xs" id="icons-container">
            <span>
              <FiMinusCircle />
            </span>
            <h1>Baner</h1>
            <span>
              <MdAddCircleOutline />
            </span>
          </div>
        </div>
        <div
          className="flex items-center gap-2 border-b-1  border-white p-1 "
          id="profile-info"
        >
          <img className="h-8 w-8 rounded-full" src="./avatar.png" alt="" />
          <div className="flex items-center gap-2 text-xs" id="icons-container">
            <span>
              <FiMinusCircle />
            </span>
            <h1>Baner</h1>
            <span>
              <MdAddCircleOutline />
            </span>
          </div>
        </div>
        <div
          className="flex items-center gap-2 border-b-1  border-white p-1 "
          id="profile-info"
        >
          <img className="h-8 w-8 rounded-full" src="./avatar.png" alt="" />
          <div className="flex items-center gap-2 text-xs" id="icons-container">
            <span>
              <FiMinusCircle />
            </span>
            <h1>Baner</h1>
            <span>
              <MdAddCircleOutline />
            </span>
          </div>
        </div>
        <div
          className="flex items-center gap-2 border-b-1  border-white p-1 "
          id="profile-info"
        >
          <img className="h-8 w-8 rounded-full" src="./avatar.png" alt="" />
          <div className="flex items-center gap-2 text-xs" id="icons-container">
            <span>
              <FiMinusCircle />
            </span>
            <h1>Baner</h1>
            <span>
              <MdAddCircleOutline />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
