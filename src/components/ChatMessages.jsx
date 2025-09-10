import React, { useEffect, useState } from "react";
import useAuthStore from "../store/userStore";

const ChatMessages = () => {
  const {
    findUser,
    results,
    input,
    addUser,
    currentUser,
    messagesActive,
    messagesOwn,
    inputText,
    setInputText,
    loadMessages,
  } = useAuthStore();

  useEffect(() => {
    if (input) {
      findUser();
      console.log("User type:", input);
    }
  }, [input]);

  useEffect(() => {
    if (!currentUser) return;
    loadMessages();
  }, [currentUser]);

  {
    /* Testing  messages */
  }

  return (
    <div className="relative flex flex-2 p-2 flex-col gap-2 ">
      <div id="top" className="w-full flex flex-col p-2">
        <div id="profile" className="flex justify-start items-center gap-4">
          <img src="./avatar.png" alt="" className="h-14 w-14 rounded-xl" />
          <div id="name-lastOnline" className="flex flex-col">
            <h1 className="capitalize">{currentUser.name}</h1>
            <i className="text-[8px] text-white/40">Last time Online</i>
          </div>
        </div>
      </div>
      <div
        className="flex-1 flex-col overflow-auto bg-[#c2c2c2]/30 rounded-md"
        id="mid-messages"
      >
        <div id="messages">
          <div className="flex flex-col p-2 gap-1 w-[70%]" id="otherUser">
            <img
              className="w-6 h-6 rounded-full object-cover"
              src="./avatar.png"
              alt=""
            />
            <div className="flex flex-col  rounded-md">
              <p className=" bg-black/70 p-2 rounded-lg text-[9px] text-justify rounded-bl-none">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consectetur voluptate non, aspernatur placeat assumenda hic
                saepe dolorum exercitationem incidunt doloribus praesentium
                voluptatum quas nihil vitae inventore, similique alias molestias
                nemo?
              </p>
              <i className="text-[7px] font-light text-white/60">2 min ago</i>
            </div>
          </div>
          <div className="flex flex-col p-2 gap-1 " id="userOn">
            {messagesOwn.map((t, id) => (
              <div className="flex flex-col items-end rounded-md" key={id}>
                <p className="bg-white/40 p-2 rounded-lg text-[9px]  text-base w-[60%] rounded-br-none">
                  {t}
                </p>
                <i className="text-[7px] font-light  text-white/60">
                  2 min ago
                </i>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="bottom">
        <div className=" relative flex justify-between items-center gap-2 ">
          <input
            className=" bg-[#c2c2c2]/40 text-xs py-1 rounded-md pl-2 outline-none w-full font-extralight"
            type="text"
            value={inputText}
            placeholder="Type something..."
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            className="bg-black/70 px-2 py-1 rounded-md text-xs cursor-pointer"
            onClick={messagesActive}
          >
            Send
          </button>
        </div>
      </div>
      {input.trim() !== "" &&
        results.length > 0 &&
        results.map((t, index) => (
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm flex justify-center items-center"
            key={index}
          >
            <div className="bg-white/30  text-black w-[180px] rounded-md p-2 flex justify-between items-center ">
              <p className="font-extrabold text-blue-500 capitalize">
                {t.name}
              </p>
              <button
                className="bg-slate-500 px-4 py-1 text-xs rounded-md cursor-pointer"
                onClick={() => addUser(t)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatMessages;
