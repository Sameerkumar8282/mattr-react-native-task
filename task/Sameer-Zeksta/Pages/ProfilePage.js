import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ProfileCard from '../components/ProfileComponent';
import Header from '../components/Hedaer'; 
import data from '../data.json';

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);

  const refreshProfiles = () => {
    const randomProfiles = shuffleArray(data).slice(0, 5);
    setProfiles(randomProfiles);
  };

  useEffect(() => {
    refreshProfiles();
  }, []); 

  return (
    <View style={styles.container}>
      <Header refreshProfiles={refreshProfiles} />
      <ScrollView>
        {profiles.map((profile, index) => (
          <ProfileCard key={index} profile={profile} isTopMatch={index === 0} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfilePage;
