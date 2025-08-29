import React from "react";
import useAuthStore from "../store/userStore";

const ProfileDetails = () => {
  const { logOut } = useAuthStore();
  return (
    <div className="flex flex-1">
      ProfileDetails
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default ProfileDetails;
