import React from "react";
import ProfileCard from "../components/ProfileComponent";
import data from "../data.json"

const ProfilePage = () => {
  return (
    <>
    {data.map((profile, index) => ( // Loop through data and render cards
      <ProfileCard key={index} index={index} /> // Pass index as a prop
    ))}
  </>
  );
};

export default ProfilePage;
