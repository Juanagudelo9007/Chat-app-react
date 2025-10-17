import React from "react";
import ChatMessages from "../components/ChatMessages";
import UserInfo from "../components/UserInfo";

const Home = () => {
  return (
    <div className="flex flex-col md:h-full w-full md:flex-row  h-[820px]">
      <UserInfo />
      <ChatMessages />
    </div>
  );
};

export default Home;
