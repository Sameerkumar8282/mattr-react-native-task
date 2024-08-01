import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
const data = require('../data.json'); 

const MyProfile = () => {
  const user = data[0]; 

  return (
    <View>
      <ScrollView>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {user.photos.map((photo) => (
            <Image key={photo.id} style={styles.image} source={{ uri: photo.path }} />
          ))}
        </ScrollView>
        <View style={styles.details}>
          <Text style={styles.name}>{`${user.first_name} ${user.last_name}, ${new Date().getFullYear() - new Date(user.dob.split('/').reverse().join('/')).getFullYear()}`}</Text>
          <Text style={styles.location}>{`${user.location.city}, ${user.location.country}`}</Text>
          <Text style={styles.description}>{user.bio}</Text>
          <Text style={styles.interestText}>Interests</Text>
          <View style={styles.interestRow}>
            {user.interests.map((interest) => (
              <View key={interest.id} style={styles.interestCol}>
                <Text style={styles.interest}>{interest.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
  details: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '400',
  },
  description: {
    paddingVertical: 20,
    fontSize: 14,
  },
  interestText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  interestRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  interestCol: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 3,
    backgroundColor: '#ce1694',
    borderRadius: 15,
  },
  interest: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 11,
  },
});

export default MyProfile;
