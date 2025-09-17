import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "../firebase/firebase";
import useAuthStore from "../store/userStore";
import { toast, ToastContainer } from "react-toastify";

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
    /* Avatar Photo */
  }

  const handlerPhoto = (e) => {
    if (e.target.files[0]) {
      setPhoto({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  {
    /* Function to created users  */
  }

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const name = e.target.name?.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!isRegistered) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: name });
        await setDoc(doc(db, "Users", res.user.uid), {
          id: res.user.uid,
          name: name.toLowerCase(),
          email,
        });
        await setDoc(doc(db, "userChats", res.user.uid), {
          userAdded: [],
        });

        console.log("User saved:", res.user);
        userInfo(res.user.uid);
        toast.success("User Created", {
          autoClose: 2000,
          position: "bottom-right",
        });
      } catch (error) {
        const errorCode = error.code;
        console.log("Error while  creating user", errorCode);
      }
    } else {
      const logged = await signInWithEmailAndPassword(auth, email, password);
      userInfo(logged.user.uid);
      console.log("User Logged In:", logged.user);
    }
  };

  return (
    <div className="flex justify-center items-center h-full ">
      <form
        className="flex flex-col gap-5 bg-slate-100/20 p-5 rounded-sm "
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
              className="cursor-pointer hover:underline text-xs"
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
        <button
          className="bg-black/80 rounded-md py-1 cursor-pointer font-bold tracking-wide "
          type="submit"
        >
          {isRegistered ? "Login" : "Register"}
        </button>
        <button
          className="cursor-pointer"
          type="button"
          onClick={() => setIsRegistered(!isRegistered)}
        >
          {!isRegistered ? "Already have an account ?" : "Create an Account"}
        </button>
      </form>
      <ToastContainer />
      {isLoading && (
        <div className="fixed flex flex-col gap-4 inset-0 items-center justify-center bg-black/70 z-2 backdrop-blur-xl">
          <div className="w-12 h-12 border-6  border-white border-t-transparent rounded-full animate-spin "></div>
          Loading...
        </div>
      )}
    </div>
  );
};

export default Login;
