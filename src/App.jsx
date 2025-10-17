import React, { useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { app } from "./firebase/firebase";
import useAuthStore from "./store/userStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const { currentUser, userInfo, logOut, setIsLoading, loadChats } =
    useAuthStore();
  const auth = getAuth(app);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setIsLoading(true);
        userInfo(userFirebase.uid);
      } else {
        logOut();
        setIsLoading(false);
      }
    });
    return () => unSub();
  }, [userInfo, logOut]);

  useEffect(() => {
    if (currentUser) loadChats();
  }, [currentUser]);

  return (
    <div className="w-[90vw] md:h-[90vh] bg-white/30 h-[90vh] backdrop-blur-sm rounded-md p-2 border-1 shadow-[2px_4px_6px_2px_rgba(0,0,0,0.3)]">
      {currentUser ? <Home /> : <Login />}
    </div>
  );
};

export default App;
