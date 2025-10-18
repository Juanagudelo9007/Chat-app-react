import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "../firebase/firebase";
import useAuthStore from "../store/userStore";
import uploads from "../firebase/uploads";
import { motion } from "framer-motion";

const Login = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [isRegistered, setIsRegistered] = useState(false);
  const { userInfo, isLoading, setIsLoading } = useAuthStore();
  const [photo, setPhoto] = useState({
    file: null,
    url: "",
  });

  {
    /* Compress img*/
  }

  const [localLoading, setLocalLoading] = useState(false);

  const handlerPhoto = (e) => {
    if (e.target.files[0]) {
      setPhoto({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    setIsLoading(true);
    const name = e.target.name?.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!isRegistered) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const imgUrl = await uploads(photo.file);
        await updateProfile(res.user, { displayName: name });
        await setDoc(doc(db, "Users", res.user.uid), {
          id: res.user.uid,
          avatar: imgUrl,
          name: name.toLowerCase(),
          email,
        });
        await setDoc(doc(db, "userChats", res.user.uid), {
          userAdded: [],
        });

        console.log("User saved:", res.user);
        await userInfo(res.user.uid);
      } catch (error) {
        const errorCode = error.code;
        console.log("Error while  creating user", errorCode);
      }
    } else {
      try {
        const logged = await signInWithEmailAndPassword(auth, email, password);
        await userInfo(logged.user.uid);
        console.log("User Logged In:", logged.user);
      } catch (error) {
        console.log("Error while logging in", error);
      }
    }
    setLocalLoading(false);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-full ">
      {!isLoading && !localLoading && (
        <form
          className="flex flex-col gap-5 items-center bg-gray-500/30 p-5 rounded-sm shadow-[0px_0px_5px_rgba(255,255,255,0.8)]"
          onSubmit={handleForm}
        >
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={handlerPhoto}
          />
          {!isRegistered && (
            <>
              <label
                htmlFor="file"
                className="cursor-pointer hover:underline text-xs flex flex-col items-center"
              >
                {" "}
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={photo.url || "./avatar.png"}
                  alt=""
                />
                Upload Image
              </label>
              <input
                className="outline-none border-b-2 border-b-slate-100/30"
                type="text"
                name="name"
                placeholder="User Name"
                id="name"
              />
            </>
          )}
          <input
            className="outline-none border-b-2 border-b-slate-100/30"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          <input
            className="outline-none border-b-2 border-b-slate-100/30"
            type="password"
            name="password"
            placeholder="Password"
            id="password"
          />
          <motion.button
            className="bg-[#2e2e2e] w-full rounded-sm py-1 cursor-pointer font-bold tracking-wide shadow-[0px_2px_3px_rgba(0,0,0,0.8)]"
            whileHover={{
              backgroundColor: "#1e1e1e",
            }}
            whileTap={{
              scale: 0.75,
            }}
            transition={{
              stiffness: 300,
              type: "spring",
              damping: 20,
            }}
            type="submit"
          >
            {isRegistered ? "Login" : "Register"}
          </motion.button>
          <button
            className="cursor-pointer underline"
            type="button"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {!isRegistered ? "Already have an account ?" : "Create an Account"}
          </button>
        </form>
      )}

      {(isLoading || localLoading) &&
        createPortal(
          <div className="fixed flex flex-col gap-4 inset-0 items-center justify-center bg-black/70 z-10 backdrop-blur-xl ">
            <div className="w-12 h-12 border-6 border-white border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>,
          document.getElementById("overlay")
        )}
    </div>
  );
};

export default Login;
