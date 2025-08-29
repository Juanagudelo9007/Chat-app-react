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
            placeholder="Search"
            className="outline-none rounded-md pl-6 bg-[#c2c2c2]/40"
          />
          <span className="absolute top-1 left-1">
            <CiSearch />
          </span>
        </div>
        <div
          className="flex items-center gap-2   bg-white/30 rounded-md p-1 transition-all duration-300 hover:bg-white/70"
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
          className="flex items-center gap-2   bg-white/30 rounded-md p-1 "
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
          className="flex items-center gap-2   bg-white/30 rounded-md p-1 "
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
          className="flex items-center gap-2   bg-white/30 rounded-md p-1 "
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
