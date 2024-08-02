import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ProfileCard from '../components/ProfileComponent';
import Header from '../components/Hedaer'; 
import data from '../data.json';

const getRandomProfiles = (data, count) => {
  const uniqueProfiles = new Set();
  
  while (uniqueProfiles.size < count) {
    const randomIndex = Math.floor(Math.random() * data.length);
    uniqueProfiles.add(data[randomIndex]);
  }

  return Array.from(uniqueProfiles);
};

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);

  const refreshProfiles = () => {
    const randomProfiles = getRandomProfiles(data, 5);
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
