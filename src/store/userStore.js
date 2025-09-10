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
} from "firebase/firestore";

const db = getFirestore(app);

const useAuthStore = create((set, get) => ({
  currentUser: null,
  isLoading: true,
  input: "",
  inputText: "",
  chatList: [],
  messagesOwn: [],
  results: [],
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
        set({ currentUser: userSnap.data(), isLoading: false });
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
          list.push(d.data());
        }
      });
      set({ results: list });
    } catch (error) {
      console.log("Error just happened", error);
    }
  },

  /* Add User */

  addUser: async (user) => {
    const { chatList, currentUser } = get();
    if (!chatList.find((t) => t.id === user.id)) {
      const updatedList = [...chatList, user];
      set({ chatList: updatedList });
      await setDoc(doc(db, "userChats", currentUser.id), {
        userAdded: updatedList,
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
        set({ chatList: snap.data().userAdded || [] });
      } else {
        set({ chatList: [] });
      }
    } catch (error) {
      console.log("an error happened while getting chats", error);
    }
  },

  /* Messages Own  (active sesion)*/

  messagesActive: async (id) => {
    const { inputText, messagesOwn, setInputText, currentUser } = get();
    const updatedChat = [...messagesOwn, inputText];
    setInputText("");
    set({ messagesOwn: updatedChat });
    const ref = doc(db, "chatMessages", currentUser.id);
    await updateDoc(ref, {
      messages: updatedChat,
    });
  },

  /* Load Messages  */

  loadMessages: async () => {
    const { currentUser, messagesOwn } = get();

    if (!currentUser) return;

    try {
      const chatRef = doc(db, "chatMessages", currentUser.id);
      const chatSnap = await getDoc(chatRef);
      if (chatSnap.exists()) {
        console.log("Messages Loaded", chatSnap.data());
        set({ messagesOwn: chatSnap.data().messages || [] });
      } else {
        set({ messagesOwn: [] });
      }
    } catch (error) {
      console.log("Error while loading savedMessages", error);
    }
  },

  logOut: () => set({ currentUser: null }),
}));

export default useAuthStore;
