import { create } from "zustand";
import { app } from "../firebase/firebase";
import {
  getFirestore,
  query,
  where,
  doc,
  getDoc,
  collection,
  limit,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";

const db = getFirestore(app);

const useAuthStore = create((set, get) => ({
  receiver: null,
  currentUser: null,
  isLoading: true,
  input: "",
  inputText: "",
  chatList: [],
  messages: [],
  results: [],
  newMessage: [],
  setNewMessage: (value) => set({ newMessage: value }),
  setMessages: (value) => set({ messages: value }),
  setReceiver: (user) => set({ receiver: user }),
  setInputText: (value) => set({ inputText: value }),
  setIsLoading: (value) => set({ isLoading: value }),
  setInput: (value) => set({ input: value }),

  /* Function to fetch the user info  */
  userInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docUser = doc(db, "Users", uid);
      const userSnap = await getDoc(docUser);

      if (userSnap.exists()) {
        set({
          currentUser: { id: userSnap.id, ...userSnap.data() },
          isLoading: false,
        });
        console.log("User Info:", userSnap.data());
      } else {
        set({ currentUser: null, isLoading: false });
        console.log("Document didn't exists:", userSnap.data());
      }
    } catch {
      set({ currentUser: null, isLoading: false });
    }
  },

  /* Find User */

  findUser: async () => {
    const { input, currentUser } = get();
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, "Users"),
        where("name", "==", input.toLowerCase()),
        limit(5)
      );
      const userSnap = await getDocs(q);
      const list = [];
      userSnap.forEach((d) => {
        if (d.id !== currentUser.id) {
          list.push({ id: d.id, ...d.data() });
        }
      });
      set({ results: list });
    } catch (error) {
      console.log("Error just happened", error);
    }
  },
  /* Add User */

  addUser: async (user) => {
    console.log("User added:", user);
    const { chatList, currentUser, chatId } = get();
    if (!chatList.find((t) => t.id === user.id)) {
      const updatedList = [...chatList, user];
      set({ chatList: updatedList });
      await setDoc(doc(db, "userChats", currentUser.id), {
        currentReceiver: user.id,
        userAdded: updatedList,
      });
    }
    set({ receiver: user });

    const idChat = chatId(currentUser.id, user.id);
    console.log("chatId :", idChat);
    const ref = doc(db, "chats", idChat);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        users: [currentUser.id, user.id],
        createdAt: serverTimestamp(),
        messages: [],
        lastMessage: [],
      });
    }
  },

  deleteUser: async (id) => {
    const { chatList, currentUser } = get();
    const updatedList = chatList.filter((user) => user.id !== id);
    set({ chatList: updatedList });

    await setDoc(doc(db, "userChats", currentUser.id), {
      userAdded: updatedList,
    });
    await clearChat(id);
  },

  /* Load and persist added users  */

  loadChats: async () => {
    const { currentUser } = get();

    if (!currentUser) return;
    try {
      const ref = doc(db, "userChats", currentUser.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        console.log("chatList Loaded:", snap.data());
        const data = snap.data();
        set({ chatList: data.userAdded || [] });
        const userReceiver = (data.userAdded || []).find(
          (u) => u.id === data.currentReceiver
        );
        set({ receiver: userReceiver || null });
      } else {
        set({ chatList: [], receiver: null });
      }
    } catch (error) {
      console.log("an error happened while getting chats", error);
    }
  },

  /* Messages Own  (active sesion)*/

  messagesActive: async () => {
    const {
      inputText,
      messages,
      setInputText,
      chatId,
      currentUser,
      receiver,
      messageNotification,
    } = get();
    if (!inputText.trim() || !currentUser || !receiver) return;
    const idChat = chatId(currentUser.id, receiver.id);
    if (!idChat) return;

    const newMessage = {
      text: inputText,
      senderId: currentUser.id,

      /* Best thing i can do now, serverTimeStamp doesn't work with updateDoc and array union */
      timestamp: new Date().toISOString(),
    };

    /* Testing LastMessage */

    const updatedChat = [...messages, newMessage];
    setInputText("");
    set({ messages: updatedChat });

    const ref = doc(db, "chats", idChat);
    await updateDoc(ref, {
      messages: arrayUnion(newMessage),
      lastMessage: newMessage,
    });
    await messageNotification(newMessage);
    console.log("chatUpdated:", updatedChat);
  },

  /* Load Messages user active  */

  loadMessages: async () => {
    const { currentUser, receiver, chatId } = get();

    if (!currentUser || !receiver) return;
    const idChat = chatId(currentUser.id, receiver.id);
    if (!idChat) return;

    try {
      const chatRef = doc(db, "chats", idChat);
      const chatSnap = await getDoc(chatRef);
      if (chatSnap.exists()) {
        const data = chatSnap.data();
        console.log("Messages Loaded", data);
        set({ messages: data.messages || [] });
      } else {
        set({ messages: [] });
      }
      console.log("chat restored:", chatRef);
    } catch (error) {
      console.log("Error while loading saved Messages", error);
    }
  },

  messageNotification: (n) => {
    set({ newMessage: n });
  },

  /* ChatId */

  chatId: (id1, id2) => {
    if (!id1 || !id2) return null;
    return id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
  },

  /* Clear chat after delete user */

  clearChat: async (id) => {
    const { chatList, currentUser, chatId, set } = get();
    if (!currentUser) return;

    const idChat = chatId(currentUser.id, id);
    if (idChat) {
      const chatRef = doc(db, "chats", idChat);
      try {
        await updateDoc(chatRef, {
          messages: [],
          lastMessage: [],
        });
      } catch (error) {
        console.log("Error while deleting chat");
      }
    }

    const listUpdated = chatList.filter((user) => user.id !== id);

    set({
      chatList: listUpdated,
      messages: [],
      receiver: null,
    });
    try {
      await setDoc(doc(db, "userChats", currentUser.id), {
        userAdded: listUpdated,
      });
    } catch (error) {
      console.log("error", error);
    }
  },

  logOut: () => set({ currentUser: null, receiver: null }),
}));

export default useAuthStore;
