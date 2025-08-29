import React, { useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";

const ChatMessages = () => {
  const [emoji, setEmoji] = useState(false);
  return (
    <div className="flex flex-2 p-2 flex-col gap-2">
      <div id="top" className="w-full flex flex-col p-2">
        <div id="profile" className="flex justify-start items-center gap-4">
          <img src="./avatar.png" alt="" className="h-14 w-14 rounded-xl" />
          <div id="name-lastOnline" className="flex flex-col">
            <h1>Baner</h1>
            <i className="text-[8px] text-white/40">Last time Online</i>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-[#c2c2c2]/30 rounded-md" id="mid-messages">
        <div></div>
      </div>
      <div id="bottom">
        <div className=" relative flex justify-between items-center gap-2 ">
          <input
            className=" bg-[#c2c2c2]/40 text-xs py-1 rounded-md pl-2 outline-none w-full font-extralight"
            type="text"
            placeholder="Type something..."
          />
         
          <button className="bg-black/70 px-2 py-1 rounded-md text-xs cursor-pointer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
