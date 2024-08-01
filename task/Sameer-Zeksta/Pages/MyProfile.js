import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const MyProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileImageContainer}>
        {/* <Image source={require('./profile_image.jpg')} style={styles.profileImage} /> */}
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.name}>Frank Stark, 23</Text>
        <Text style={styles.location}>London, United Kingdom</Text>

        <Text style={styles.description}>
          Hey, I'm Frank, a 23-year-old marketing enthusiast who loves outdoor
          adventures. Whether it's hiking or a cozy night in, I embrace every
          moment with enthusiasm. My infectious humor and love for deep
          conversations define me. I'm seeking a partner ready for genuine
          connections and new adventures. Connect with me and let's dive in!
        </Text>
      </View>

      <View style={styles.interests}>
        <Text style={styles.interestsTitle}>Interests</Text>
        <View style={styles.interestContainer}>
          <Text style={styles.interest}>RUNNING</Text>
          <Text style={styles.interest}>HIKING</Text>
          <Text style={styles.interest}>OUTDOORS</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0080', // Assuming the background color is pink
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    color: 'white',
    fontSize: 16,
  },
  description: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  interests: {
    alignItems: 'center',
  },
  interestsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  interestContainer: {
    flexDirection: 'row',
  },
  interest: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
});

export default MyProfile;
