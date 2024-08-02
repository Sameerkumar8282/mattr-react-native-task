import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ProfileCard from '../components/ProfileComponent';
import Header from '../components/Hedaer';
import data from '../data.json';
import { useNavigation, useRoute } from '@react-navigation/native';

const getRandomProfiles = (data, count) => {
  const uniqueProfiles = new Set();
  
  while (uniqueProfiles.size < count) {
    const randomIndex = Math.floor(Math.random() * data.length);
    uniqueProfiles.add(data[randomIndex]);
  }

  return Array.from(uniqueProfiles);
};

const ProfilePage = () => {
  const navigate = useNavigation();
  const route = useRoute();
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState([]);

  const refreshProfiles = () => {
    const randomProfiles = getRandomProfiles(data, 5);
    setProfiles(randomProfiles);
  };

  useEffect(() => {
    refreshProfiles();
  }, []); 

  useEffect(() => {
    if (route.params?.filterData) {
      setFilter(route.params.filterData);
    } else {
      setFilter(profiles);
    }
  }, [route.params?.filterData, profiles]);


  return (
    <View style={styles.container}>
      <Header refreshProfiles={refreshProfiles} />
      <ScrollView>
        {filter?.map((profile, index) => (
          <ProfileCard key={profile.id} profile={profile} isTopMatch={index === 0} />
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
