import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'ActivityStack') {
              iconName = 'compass-sharp';
            } else if (route.name === 'Profile') {
              iconName = 'person-sharp';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#C71585',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { borderTopColor: '#C71585' },
        })}
      >
        <Tab.Screen
          name="ActivityStack"
          component={ActivityStack}
          options={{
            headerShown: false,
            title: 'Activity',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
