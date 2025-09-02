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
      <div
        className="flex-1 flex-col overflow-scroll bg-[#c2c2c2]/30 rounded-md"
        id="mid-messages"
      >
        <div id="messages">
          <div className="flex flex-col p-2 gap-1 w-[70%]" id="otherUser">
            <img className="w-6 h-6 rounded-full" src="./avatar.png" alt="" />
            <div className="flex flex-col  rounded-md">
              <p className=" bg-black p-2 rounded-md text-[9px] text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consectetur voluptate non, aspernatur placeat assumenda hic
                saepe dolorum exercitationem incidunt doloribus praesentium
                voluptatum quas nihil vitae inventore, similique alias molestias
                nemo?
              </p>
              <i className="text-[7px] font-light">2 min ago</i>
            </div>
          </div>
          <div className="flex flex-col p-2 gap-1 " id="userOn">
            <div className="flex flex-col items-end rounded-md">
              <p className=" bg-white/30 p-2 rounded-md text-[9px]  text-justify w-[60%]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consectetur voluptate non, aspernatur placeat assumenda hic
                saepe dolorum exercitationem incidunt doloribus praesentium
                voluptatum quas nihil vitae inventore, similique alias molestias
                nemo?
              </p>
              <i className="text-[7px] font-light">2 min ago</i>
            </div>
          </div>
        </div>
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
