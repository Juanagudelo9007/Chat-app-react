import { CiSearch } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import useAuthStore from "../store/userStore";
import { useEffect, useRef } from "react";
import { app } from "../firebase/firebase";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import UseDebounced from "../Hooks/UseDebounced";

const ChatList = () => {
  const {
    input,
    setInput,
    chatList,
    deleteUser,
    currentUser,
    loadChats,
    setReceiver,
    loadMessages,
    newMessage,
    setNewMessage,
    receiver,
    chatId,
    clearChat,
    findUser,
  } = useAuthStore();
  const debouncedInput = UseDebounced(input, 500);

  useEffect(() => {
    if (debouncedInput.trim() !== "") {
      findUser();
    }
  }, [debouncedInput]);

  const db = getFirestore(app);
  const ref = useRef([]);

  useEffect(() => {
    if (!currentUser || chatList.length === 0) return;

    {
      /* Only way  that i found to listen to all the chats and clean them after user click on them */
    }

    ref.current.forEach((unsub) => unsub && unsub());
    ref.current = [];

    chatList.forEach((chatUser) => {
      const id = chatId(currentUser.id, chatUser.id);
      const unsub = onSnapshot(doc(db, "chats", id), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.lastMessage) {
            setNewMessage({ chatId: id, message: data.lastMessage });
          }
        }
      });
      ref.current.push(unsub);
    });

    return () => {
      ref.current.forEach((unsub) => unsub && unsub());
    };
  }, [currentUser, chatList]);

  useEffect(() => {
    if (!currentUser) return;
    loadChats();
  }, [currentUser]);

  return (
    <div className="overflow-auto">
      <div className="flex flex-col gap-4 p-3" id="main-container">
        <div className="relative" id="search">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="search"
            placeholder="Search..."
            className="outline-none rounded-md pl-6 bg-[#c2c2c2]/40 text-xs p-1 font-extralight"
          />
          <span className="absolute top-1.5 left-1">
            <CiSearch />
          </span>
        </div>
        <h1 className="font-extrabold">Chats</h1>

        {chatList.map((t, index) => {
          const id = chatId(currentUser.id, t.id);
          const isNewMessage =
            newMessage?.chatId === id && receiver?.id !== t.id;

          return (
            <div
              key={index}
              id="profile-info"
              onClick={() => {
                loadMessages();
                setReceiver(t);
                if (newMessage?.chatId === id) {
                  setNewMessage(null);
                }
              }}
              className={`flex items-center  gap-2 p-2 transition-all duration-300 cursor-pointer overflow-hidden   border-b border-gray-300 
                ${
                  isNewMessage
                    ? "bg-green-800  animate-pulse hover:bg-green-400"
                    : "bg-none "
                }
              ${!isNewMessage && "hover:bg-black"} hover:scale-105 `}
            >
              <img
                src={t.avatar}
                alt=""
                className="h-8 w-8 object-cover rounded-full "
              />

              <div
                className="flex items-center gap-4 text-xs"
                id="icons-container"
              >
                <button
                  className="cursor-pointer text-[15px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteUser(t.id);
                    clearChat(t.id);
                  }}
                >
                  <AiFillDelete />
                </button>
                <h1 className="text-[14px] capitalize font-bold ">{t.name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
