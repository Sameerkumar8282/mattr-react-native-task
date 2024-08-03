import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileCard = ({ profile, isTopMatch }) => { 
  const navigation = useNavigation();

  const getAge = (dob) => {
    const [day, month, year] = dob.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = getAge(profile.dob);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {profile.photos && profile.photos.length > 0 ? (
          <Image source={{ uri: profile.photos[0].path }} style={styles.image} /> 
        ) : (
          <Text style={styles.imagePlaceholder}>No Image</Text>
        )}
        {isTopMatch && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>TOP MATCH</Text>
          </View>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>
          {profile.first_name} {profile.last_name}, {age}
        </Text>
        <Text style={styles.locationText}>
          {profile.location.city}, {profile.location.country}
        </Text>
        <TouchableOpacity style={styles.viewProfileButton} onPress={() => navigation.navigate('ViewProfile', { profile })}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
  },
  imageContainer: {
    backgroundColor: '#C71585',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    fontSize: 40,
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 10,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    color: 'gray',
  },
  viewProfileButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: '#C71585',
    borderWidth: 1,
    borderRadius: 20,
  },
  viewProfileText: {
    color: '#C71585',
    fontSize: 16,
  },
});

export default ProfileCard;
