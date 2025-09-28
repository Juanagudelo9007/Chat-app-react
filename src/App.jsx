import React, { useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { app } from "./firebase/firebase";
import useAuthStore from "./store/userStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const { currentUser, userInfo, logOut, setIsLoading, loadChats,  } =
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
    <div className="w-[90vw] h-[90vh] bg-black/70 backdrop-blur-sm rounded-md p-2">
      {currentUser ? <Home /> : <Login />}
    </div>
  );
};

export default App;
