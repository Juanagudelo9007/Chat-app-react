import React, { useEffect } from "react";
import useAuthStore from "../store/userStore";
import { app } from "../firebase/firebase";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";

const ChatMessages = () => {
  const {
    findUser,
    results,
    input,
    addUser,
    currentUser,
    messagesActive,
    messages,
    inputText,
    setInputText,
    receiver,
    loadMessages,
    chatId,
    setMessages,
  } = useAuthStore();

  const db = getFirestore(app);

  useEffect(() => {
    if (input) {
      findUser();
      console.log("User type:", input);
    }
  }, [input]);

  useEffect(() => {
    console.log("currentUser:", currentUser);
    console.log("receiver:", receiver);
  }, [currentUser, receiver]);

  useEffect(() => {
    if (!currentUser || !receiver) return;
    const id = chatId(currentUser.id, receiver.id);
    const unSub = onSnapshot(doc(db, "chats", id), (d) => {
      setMessages(d.data().messages || []);
    });
    return () => unSub();
  }, [currentUser, receiver, inputText]);

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
          <div className="flex flex-col p-2 gap-1 " id="userOn">
            {messages.map((t, id) => (
              <div
                key={id}
                className={`flex flex-col p-2 gap-1 max-w-[70%] ${
                  t.senderId === currentUser.id
                    ? "self-end items-end"
                    : "self-start items-start"
                }`}
              >
                <p
                  className={`p-2 text-[10px] rounded-lg ${
                    t.senderId === currentUser.id
                      ? "bg-white/40 rounded-br-none"
                      : "bg-black/70 text-white rounded-bl-none"
                  }`}
                >
                  {t.text}
                </p>
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
            onClick={() => {
              console.log("btn sent clicked");
              messagesActive();
            }}
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
