import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ViewProfilePage = () => {
  const route = useRoute();
  const { profile } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

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
};

const styles = StyleSheet.create({
  image: {
    width: 392,
    height: 650,
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
