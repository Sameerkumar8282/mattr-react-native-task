import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import data from '../data.json';

const FilterPage = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState(null); 
  const [ageRange, setAgeRange] = useState(null); 
  const [sortBy, setSortBy] = useState('Score');

  const calculateAge = useCallback((dob) => {
    const birthDate = new Date(dob.split('/').reverse().join('-'));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }, []);

  const filterProfiles = useCallback((data, gender, ageRange, sortBy) => {
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
  }, [calculateAge]);

  const filteredData = useMemo(() => {
    return filterProfiles(data, gender, ageRange, sortBy);
  }, [filterProfiles, gender, ageRange, sortBy]);

  const handleGenderChange = useCallback((selectedGender) => {
    setGender(selectedGender);
  }, []);

  const handleAgeRangeChange = useCallback((selectedAgeRange) => {
    setAgeRange(selectedAgeRange);
  }, []);

  const handleSortByChange = useCallback((selectedSortBy) => {
    setSortBy(selectedSortBy);
  }, []);

  const handleApplyFilters = useCallback(() => {
    console.log('Filters applied:', { gender, ageRange, sortBy });
    navigation.navigate('Activity', { filteredData });
  }, [filteredData, gender, ageRange, sortBy, navigation]);

  const handleClearFilters = useCallback(() => {
    setGender(null);
    setAgeRange(null);
    setSortBy('Score');
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  clearButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  clearButtonText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
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
