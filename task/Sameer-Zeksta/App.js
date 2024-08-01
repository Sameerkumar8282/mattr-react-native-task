import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Header from './components/Hedaer'; 
import ProfilePage from './Pages/ProfilePage'; 
// import ImageScroller from './components/ImageScroller';
import ImageScroller from './components/ImageScroller';

const Tab = createBottomTabNavigator();

const ActivityScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView>
        <ProfilePage />
      </ScrollView>
    </View>
  );
};
const ProfileScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <Text>fifefenvkj</Text>
        <ImageScroller/>
     </SafeAreaView>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#C71585',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { borderTopColor: '#C71585' },
        }}
      >
        <Tab.Screen 
          name="Activity" 
          component={ActivityScreen} 
          options={{ 
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color }}>📍</Text> 
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ 
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color }}>👤</Text> 
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
