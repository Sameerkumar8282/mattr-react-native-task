import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const ViewProfilePage = () => {
  const route = useRoute();
  const { profile } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false); 
  const flatListRef = useRef(null);

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const keyExtractor = (item) => item.id.toString();

  const renderDot = (index) => (
    <View
      key={index}
      style={[styles.dot, currentIndex === index && styles.activeDot]}
    />
  );

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.path }} style={styles.image} />
  );

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
    <View>
      <ScrollView>
        {profile.photos && profile.photos.length > 0 ? (
          <>
            <FlatList
              ref={flatListRef}
              data={profile.photos}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              horizontal
              pagingEnabled
              onViewableItemsChanged={viewableItemsChanged}
              showsHorizontalScrollIndicator={false}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50,
              }}
            />
            <View style={styles.dotsContainer}>
              {profile.photos.map((_, index) => renderDot(index))}
            </View>
          </>
        ) : (
          <Text style={styles.imagePlaceholder}>No Image</Text>
        )}
        <View style={styles.details}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profile.first_name} {profile.last_name}, {age}</Text>
            <TouchableOpacity onPress={toggleLike}>
              <Icon
                name={liked ? 'heart' : 'heart-outline'}
                size={32}
                color={liked ? 'red' : 'black'}
                style={styles.heartIcon}
              />
            </TouchableOpacity>
          </View>
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
    paddingBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  heartIcon: {
    marginLeft: 10,
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
