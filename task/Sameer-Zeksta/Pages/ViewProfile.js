import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ViewProfilePage = () => {
  const route = useRoute();
  const { profile } = route.params;

  return (
    <View>
      <ScrollView>
        {profile.photos && profile.photos.length > 0 ? (
          <Image
            style={styles.image}
            source={{ uri: profile.photos[0].path }} 
          />
        ) : (
          <Text style={styles.imagePlaceholder}>No Image</Text>
        )}
        <View style={styles.details}>
          <Text style={styles.name}>{profile.first_name} {profile.last_name}, {profile.score}</Text>
          <Text style={styles.location}>
            {profile.location.city}, {profile.location.country}
          </Text>
          <Text style={styles.description}>{profile.description}</Text>
          <Text style={styles.interestText}>Interests</Text>
          <View style={styles.interestRow}>
            {profile.interests && profile.interests.map((interest, index) => (
              <View key={index} style={styles.interestCol}>
                <Text style={styles.interest}>{interest.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
  },
  details: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 20,
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
    flexWrap: 'wrap',
  },
  interestCol: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 3,
    backgroundColor: '#ce1694',
    borderRadius: 15,
    marginBottom: 10,
  },
  interest: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 11,
  },
});

export default ViewProfilePage;
