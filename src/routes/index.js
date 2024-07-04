import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Splash from '../pages/Splash';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Article from '../pages/Article';
import Activity from '../pages/Activity';
import Profile from '../pages/Profile';
import Quiz from '../pages/Quiz';
import Question from '../pages/Question';
import OnboardingScreen from '../pages/OnboardingSreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormRegis from '../pages/FormRegis';
import BeforeForm from '../pages/BeforeForm';
import AfterForm from '../pages/AfterForm';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Article':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
            case 'Activity':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Article" component={Article} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export default function Router() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    try {
      const onboarded = await AsyncStorage.getItem('onboarded');
      console.log(onboarded);
      if (onboarded === '1') {
        // hide onboarding
        setShowOnboarding(false);
      } else {
        // show onboarding
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Failed to fetch the data from storage', error);
      setShowOnboarding(true); // default to showing onboarding if error occurs
    }
  };

  // Tunggu hingga status showOnboarding terinisialisasi
  if (showOnboarding === null) {
    return null; // Anda bisa menambahkan loading indicator di sini jika diperlukan
  }

  if (showOnboarding) {
    // ketika pertama kali menjalankan aplikasi 
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={Splash} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="FormRegis" component={FormRegis} />
          <Stack.Screen name="BeforeForm" component={BeforeForm} />
          <Stack.Screen name="AfterForm" component={AfterForm} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    // ketika sudah pernah membuka aplikasi sebelumnya
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={Splash} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="Question" component={Question} />
          <Stack.Screen name="FormRegis" component={FormRegis} />
          <Stack.Screen name="BeforeForm" component={BeforeForm} />
          <Stack.Screen name="AfterForm" component={AfterForm} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
