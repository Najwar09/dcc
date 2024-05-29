import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Article from '../pages/Article';
import Activity from '../pages/Activity';
import Profile from '../pages/Profile';


const Tab = createBottomTabNavigator();
const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Article') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Activity') {
            iconName = focused ? 'compass' : 'compass-outline';
          }else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          // Anda bisa mengembalikan komponen Icon di sini
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {/* <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Article" component={Article} />
      <Tab.Screen name="Activity" component={Activity} /> */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="SplashScreen" component={Splash} />
        <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
// end tab navigation