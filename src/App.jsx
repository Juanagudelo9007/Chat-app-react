import React, { useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { app } from "./firebase/firebase";
import useAuthStore from "./store/userStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const {
    currentUser,
    userInfo,
    logOut,
    isLoading,
    setIsLoading,
  } = useAuthStore();
  const auth = getAuth(app);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setIsLoading(true);
        userInfo(userFirebase.uid);
   
      } else {
        logOut();
      }
    });

    return () => unSub();
  }, [userInfo, logOut]);

  return (
    <div className="w-[90vw] h-[90vh] bg-black/50 backdrop-blur-md rounded-md p-2">
      {currentUser ? <Home /> : <Login />}
    </div>
  );
};

export default App;
