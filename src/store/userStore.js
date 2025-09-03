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
} from "firebase/firestore";

const db = getFirestore(app);

const useAuthStore = create((set, get) => ({
  currentUser: null,
  results: [],
  input: "",
  chatList: [],
  isLoading: true,
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
  addUser: (user) => {
    const { chatList } = get();
    if (!chatList.find((t) => t.id !== user.id)) {
      set({ chatList: [...chatList, user] });
    }
  },

  deleteUser: (id) => {
    set((state) => ({
      chatList: state.chatList.filter((p) => p.id !== id),
    }));
  },

  logOut: () => set({ currentUser: null }),
}));

export default useAuthStore;
