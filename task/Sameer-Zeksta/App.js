import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Header from './components/Hedaer'; // Import Header component
import ProfilePage from './Pages/ProfilePage'; 
import MyProfile from './Pages/MyProfile';
import ViewProfile from './Pages/ViewProfile';
import FilterPage from './Pages/FilterPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ActivityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="FilterPage" component={FilterPage} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
    </Stack.Navigator>
  );
};

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
      <MyProfile />
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
          name="ActivityStack"
          component={ActivityStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color }}></Text>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color }}></Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
