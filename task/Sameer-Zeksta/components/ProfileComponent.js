import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileCard = ({ profile }) => { 
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {profile.photos && profile.photos.length > 0 ? (
          <Image source={{ uri: profile.photos[0].path }} style={styles.image} /> // Display first image
        ) : (
          <Text style={styles.imagePlaceholder}></Text>
        )}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>TOP MATCH</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>
          {profile.first_name} {profile.last_name}, {profile.score}
        </Text>
        <Text style={styles.locationText}>
          {profile.location.city}, {profile.location.country}
        </Text>
        <TouchableOpacity style={styles.viewProfileButton} onPress={() => navigation.navigate('ViewProfilePage', { profile })}>
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
    backgroundColor: '#C71585', // Adjust this to match the pink color in your image
    height: 150,
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
