import React from "react";
import ChatMessages from "../components/ChatMessages";
import UserInfo from "../components/UserInfo";


const Home = () => {
  return (
    <div className="flex h-full w-full ">
      <UserInfo />
      <ChatMessages />
    </div>
  );
};

export default Home;
