import React, { useState, useRef, useCallback } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, FlatList } from 'react-native';
const data = require('../data.json');

const MyProfile = () => {
  const user = data[0];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

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

  const age = getAge(user.dob);

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const renderDot = (index) => (
    <View
      key={index}
      style={[styles.dot, currentIndex === index && styles.activeDot]}
    />
  );

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.path }} style={styles.image} />
  );

  return (
    <View>
      <ScrollView>
        {user.photos && user.photos.length > 0 ? (
          <>
            <FlatList
              ref={flatListRef}
              data={user.photos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              pagingEnabled
              onViewableItemsChanged={viewableItemsChanged}
              showsHorizontalScrollIndicator={false}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50,
              }}
            />
            <View style={styles.dotsContainer}>
              {user.photos.map((_, index) => renderDot(index))}
            </View>
          </>
        ) : (
          <Text style={styles.imagePlaceholder}>No Image</Text>
        )}
        <View style={styles.details}>
          <Text style={styles.name}>
            {`${user.first_name} ${user.last_name}, ${age}`}
          </Text>
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
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#c2c2c2',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#edebeb',
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

export default MyProfile;
