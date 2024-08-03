import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ProfileCard from '../components/ProfileComponent';
import Header from '../components/Header'; 
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

const filterProfiles = (data, gender, ageRange, sortBy) => {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob.split('/').reverse().join('-'));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  let filteredData = data.filter(item => {
    const itemGender = item.gender.toUpperCase();
    const itemAge = calculateAge(item.dob);

    let ageMatch = true;
    if (ageRange === '20-24') ageMatch = itemAge >= 20 && itemAge <= 24;
    if (ageRange === '25-30') ageMatch = itemAge >= 25 && itemAge <= 30;
    if (ageRange === '30-40') ageMatch = itemAge >= 30 && itemAge <= 40;
    if (ageRange === '40+') ageMatch = itemAge > 40;

    return (
      (!gender || gender === itemGender) &&
      (!ageRange || ageMatch)
    );
  });

  if (sortBy === 'Score') {
    filteredData.sort((a, b) => b.score - a.score);
  } else if (sortBy === 'Date Joined') {
    filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  return filteredData;
};

const ProfilePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filters, setFilters] = useState({ gender: null, ageRange: null, sortBy: 'Score' });

  const refreshProfiles = () => {
    const randomProfiles = getRandomProfiles(data, 5);
    console.log("Refreshing profiles:", randomProfiles); // Debug log
    setProfiles(randomProfiles);
  };

  useEffect(() => {
    refreshProfiles();
  }, []);

  useEffect(() => {
    if (route.params?.filteredData) {
      console.log("Setting filtered profiles from route params:", route.params.filteredData); // Debug log
      setFilteredProfiles(route.params.filteredData);
    } else {
      console.log("Setting profiles:", profiles); // Debug log
      setFilteredProfiles(profiles);
    }
  }, [route.params?.filteredData, profiles]);

  useEffect(() => {
    const { gender, ageRange, sortBy } = filters;
    const filteredData = filterProfiles(data, gender, ageRange, sortBy);
    setFilteredProfiles(filteredData);
  }, [filters]);

  return (
    <View style={styles.container}>
      <Header refreshProfiles={refreshProfiles} />
      <ScrollView>
        {filteredProfiles.map((profile, index) => (
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
