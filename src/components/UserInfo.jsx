import React from "react";
import ChatList from "./ChatList";
import useAuthStore from "../store/userStore";

const UserInfo = () => {
  const { currentUser } = useAuthStore();

  return (
    <div className="w-full md:w-1/2 md:h-full flex flex-col p-2 gap-4 bg-white/70 rounded-md text-black h-[250px]">
      <div className="justify-between items-center p-4 border-b-1 border-gray-300 hidden md:flex  ">
        <div className="flex justify-center items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover hover:scale-150 transition-all duration-500 border-2 border-gray-400"
            src={currentUser.avatar}
            alt=""
          />
          <h1 className="capitalize font-bold">{currentUser.name}</h1>
        </div>
      </div>
      <ChatList />
    </div>
  );
};

export default UserInfo;
