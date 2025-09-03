import React, { use } from "react";
import { CiSearch } from "react-icons/ci";
import { FiMinusCircle } from "react-icons/fi";
import useAuthStore from "../store/userStore";

const ChatList = () => {
const { input, setInput, chatList, deleteUser } = useAuthStore();


  return (
    <div className="mt overflow-auto">
      <div className="flex flex-col gap-4 p-2 " id="main-container">
        <div className="relative " id="search">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="search"
            placeholder="Search..."
            className="outline-none rounded-md pl-6 bg-[#c2c2c2]/40 text-xs p-1 font-extralight "
          />
          <span className="absolute top-1.5 left-1">
            <CiSearch />
          </span>
        </div>
        <h1 className="font-extrabold">Chats</h1>

        {chatList.map((t, index) => (
          <div
            className="flex items-center j gap-2  bg-white/30 rounded-md p-1 transition-all duration-300 hover:bg-white/70"
            key={index}
            id="profile-info"
          >
            <img className="h-8 w-8 rounded-full" src="./avatar.png" alt="" />
            <div
              className="flex items-center  gap-4 text-xs"
              id="icons-container"
            >
              <button className="cursor-pointer"
              onClick={()=>deleteUser(t.id)}
              >
                <FiMinusCircle />
              </button>
              <h1>{t.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
