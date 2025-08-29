import { create } from "zustand";
import { app } from "../firebase/firebase";
import { getFirestore, query, where, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

const useAuthStore = create((set, get) => ({
  currentUser: null,
  input: "",
  chatList: [],
  isLoading: true,
  setIsLoading: (value)=>set({isLoading:value}),
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

  logOut: () => set({ currentUser: null }),
}));

export default useAuthStore;
