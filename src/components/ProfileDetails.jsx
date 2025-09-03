import React from "react";
import useAuthStore from "../store/userStore";

const ProfileDetails = () => {
  const { logOut } = useAuthStore();
  return (
    <div className="flex flex-1 p-1">
      <div className="flex flex-col gap-2 h-full w-full" id="container">
        <div className="flex flex-col items-end flex-1" id="profile">
          <img className="h-8 w-8 rounded-full" src="./avatar.png" alt="" />
          <h1 className="text-sm">Baner</h1>
        </div>
        <div className="flex-2" id="mid-recent-searches">
          Recent Searches
        </div>
        <div className="p-1" id="end-btns">
          <button
            className="bg-red-600 w-full rounded-md font-light cursor-pointer"
            onClick={logOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
