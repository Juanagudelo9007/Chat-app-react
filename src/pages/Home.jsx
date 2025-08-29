import React from "react";

import ChatMessages from "../components/ChatMessages";
import UserInfo from "../components/UserInfo";
import ProfileDetails from "../components/ProfileDetails";

const Home = () => {
  return (
    <div className="flex h-full w-full ">
      <UserInfo />
      <ChatMessages />
      <ProfileDetails />
    </div>
  );
};

export default Home;
