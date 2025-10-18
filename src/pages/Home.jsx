import React from "react";
import ChatMessages from "../components/ChatMessages";
import UserInfo from "../components/UserInfo";

const Home = () => {
  return (
    <div className="flex flex-col w-full md:flex-row  h-full">
      <UserInfo />
      <ChatMessages />
    </div>
  );
};

export default Home;
