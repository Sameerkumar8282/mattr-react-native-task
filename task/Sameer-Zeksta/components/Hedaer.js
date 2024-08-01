import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <Text style={styles.title}>Daily Connections</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FilterPage')}>
        <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.refreshButton} onPress={() => console.log('Refresh Pressed')}>
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterText: {
    fontSize: 16,
    color: 'purple',
  },
  refreshButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderColor: 'purple',
    borderWidth: 1,
  },
  refreshText: {
    fontSize: 16,
    color: 'purple',
  },
});

export default Header;
