import React from "react";
import ChatList from "./ChatList";
import useAuthStore from "../store/userStore";

const UserInfo = () => {
  const { currentUser } = useAuthStore();

  return (
    <div className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col p-2 gap-4 bg-white/70 rounded-md text-black">
      <div className="justify-between items-center p-4 border-b-1 hidden md:flex  ">
        <div className="flex justify-center items-center gap-3 ">
          <img
            className="h-9 w-9 rounded-full object-cover hover:scale-150 transition-all duration-500"
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
