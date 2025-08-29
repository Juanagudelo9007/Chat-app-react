import React from "react";

const ChatMessages = () => {
  return (
    <div className="flex flex-2 p-2">
      <div id="top" className="w-full flex flex-col p-2">
        <div id="profile" className="flex justify-start items-center gap-4">
          <img src="./avatar.png" alt="" className="h-14 w-14 rounded-xl" />
          <div id="name-lastOnline" className="flex flex-col">
            <h1>Gordito</h1>
            <i className="text-[8px]">Last time Online</i>
          </div>
        </div>
      </div>
      <div id="mid-messages"></div>
    </div>
  );
};

export default ChatMessages;
