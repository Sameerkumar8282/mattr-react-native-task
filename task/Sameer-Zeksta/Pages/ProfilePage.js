import React from 'react';
import { ScrollView } from 'react-native';
import ProfileCard from '../components/ProfileComponent';
import data from '../data.json';

const shuffleArray = (array) => {
  let shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ProfilePage = () => {
  const randomProfiles = shuffleArray(data).slice(0, 5); 

  return (
    <ScrollView>
      {randomProfiles.map((profile, index) => (
        <ProfileCard key={index} profile={profile} /> 
      ))}
    </ScrollView>
  );
};

export default ProfilePage;
