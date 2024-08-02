import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
const FilterPage = () => {
  const [gender, setGender] = useState('FEMALE'); // Default to female
  const [ageRange, setAgeRange] = useState('25-30'); // Default to 25-30
  const [sortBy, setSortBy] = useState('Score'); // Default to Score

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleAgeRangeChange = (selectedAgeRange) => {
    setAgeRange(selectedAgeRange);
  };

  const handleSortByChange = (selectedSortBy) => {
    setSortBy(selectedSortBy);
  };

  const handleApplyFilters = () => {
    console.log('Filters applied:', { gender, ageRange, sortBy });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Filter</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Gender</Text>
        <TouchableOpacity
          style={[styles.button, gender === 'MALE' && styles.selectedButton]}
          onPress={() => handleGenderChange('MALE')}
        >
          <Text style={[styles.buttonText, gender === 'MALE' && styles.selectedButtonText]}>MALE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, gender === 'FEMALE' && styles.selectedButton]}
          onPress={() => handleGenderChange('FEMALE')}
        >
          <Text style={[styles.buttonText, gender === 'FEMALE' && styles.selectedButtonText]}>FEMALE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Age Ranges</Text>
        <TouchableOpacity
          style={[styles.button, ageRange === '20-24' && styles.selectedButton]}
          onPress={() => handleAgeRangeChange('20-24')}
        >
          <Text style={[styles.buttonText, ageRange === '20-24' && styles.selectedButtonText]}>20-24</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, ageRange === '25-30' && styles.selectedButton]}
          onPress={() => handleAgeRangeChange('25-30')}
        >
          <Text style={[styles.buttonText, ageRange === '25-30' && styles.selectedButtonText]}>25-30</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, ageRange === '30-40' && styles.selectedButton]}
          onPress={() => handleAgeRangeChange('30-40')}
        >
          <Text style={[styles.buttonText, ageRange === '30-40' && styles.selectedButtonText]}>30-40</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, ageRange === '40+' && styles.selectedButton]}
          onPress={() => handleAgeRangeChange('40+')}
        >
          <Text style={[styles.buttonText, ageRange === '40+' && styles.selectedButtonText]}>40+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sort By</Text>
        <TouchableOpacity
          style={[styles.button, sortBy === 'Score' && styles.selectedButton]}
          onPress={() => handleSortByChange('Score')}
        >
          <Text style={[styles.buttonText, sortBy === 'Score' && styles.selectedButtonText]}>Score</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, sortBy === 'Date Joined' && styles.selectedButton]}
          onPress={() => handleSortByChange('Date Joined')}
        >
          <Text style={[styles.buttonText, sortBy === 'Date Joined' && styles.selectedButtonText]}>Date Joined</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  selectedButton: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 14,
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#f00',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterPage;
