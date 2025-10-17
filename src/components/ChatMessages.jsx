import React, { useEffect, useState } from "react";
import useAuthStore from "../store/userStore";
import { app } from "../firebase/firebase";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { GiExitDoor } from "react-icons/gi";
import { IoSend } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { motion } from "framer-motion";

const ChatMessages = () => {
  const [closeSesion, setCloseSesion] = useState(false);

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
    chatId,
    setMessages,
    logOut,
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

  return (
    <div className="relative flex flex-2 p-2 flex-col gap-3  h-[500px] md:h-full text-black">
      <div
        id="top"
        className="w-full flex flex-col p-3 border-b border-gray-400 "
      >
        <div
          id="relative profile"
          className="flex justify-between items-center gap-4"
        >
          <div className="flex items-center gap-2 " id="receivers info">
            {receiver && (
              <img
                src={receiver.avatar}
                alt=""
                className="h-14 w-14 rounded-2xl object-cover transition-all duration-300 hover:scale-110 rounded-bl-none "
              />
            )}
            {receiver && (
              <h1 className="capitalize font-bold">{receiver.name}</h1>
            )}
          </div>

          <div
            className="absolute right-0 top-0 flex gap-2 items-center p-2"
            id="current user-logout"
          >
            <img
              src={currentUser.avatar}
              alt=""
              className="h-8 w-8  object-cover rounded-full cursor-pointer transition-all duration-300 hover:scale-110 border-2 border-gray-900"
              onClick={() => setCloseSesion((prev) => !prev)}
            />
            {closeSesion && (
              <button
                className="cursor-pointer text-black text-2xl"
                onClick={logOut}
              >
                <GiExitDoor />
              </button>
            )}
          </div>
        </div>
      </div>
      {receiver ? (
        <>
          <div
            className="flex-1 flex-col overflow-auto bg-white/10 rounded-md"
            id="mid-messages"
          >
            <div id="messages">
              <div className="flex flex-col p-2 gap-1 " id="userOn">
                {messages.map(
                  (t, id) => (
                    console.log(
                      "time",
                      new Date(t.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    ),
                    (
                      <div
                        key={id}
                        className={`flex flex-col p-2 gap-1 w-full ${
                          t.senderId === currentUser.id
                            ? "self-end items-end"
                            : "self-start items-start"
                        }`}
                      >
                        <p
                          className={`p-2 text-[10px] font-bold rounded-lg ${
                            t.senderId === currentUser.id
                              ? "bg-gray-300 rounded-br-none"
                              : "bg-black/70 text-white rounded-bl-none"
                          }`}
                        >
                          {t.text}
                        </p>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
          <div id="bottom">
            <div className=" relative flex justify-between items-center gap-2 ">
              <input
                className=" bg-[#c2c2c2]/70 text-xs py-1 rounded-md pl-2 outline-none w-full font-bold"
                type="text"
                value={inputText}
                placeholder="Type something..."
                onChange={(e) => setInputText(e.target.value)}
              />

              <motion.button
                className="text-lg cursor-pointer"
                onClick={() => {
                  console.log("btn sent clicked");
                  messagesActive();
                }}
                whileTap={{
                  scale: 0.75,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <IoSend />
              </motion.button>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-lg text-white/60 font-bold mt-10 md:text-xl p-4">
          🔍 Add a contact to begin chatting
        </div>
      )}

      {input.trim() !== "" &&
        results.length > 0 &&
        results.map((t, index) => (
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center"
            key={index}
          >
            <div className="bg-white/40  border-white   text-black w-[180px]  rounded-md p-2 flex justify-between items-center ">
              <img
                src={t.avatar}
                alt=""
                className="h-9 w-9 object-cover rounded-full"
              />
              <p className="font-extrabold text-black/70 capitalize">
                {t.name}
              </p>
              <button
                className="px-4 py-1 text-xl text-white rounded-md cursor-pointer"
                onClick={() => addUser(t)}
              >
                <IoMdPersonAdd />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatMessages;
