import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';

import Splash from '../pages/Splash';
import Login from '../pages/Login';
import Article from '../pages/Article';
import Activity from '../pages/Activity';
import Profile from '../pages/Profile';
import Quiz from '../pages/Quiz';
import Question from '../pages/Question';
import OnboardingScreen from '../pages/OnboardingSreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormRegis from '../pages/FormRegis';
import Form2 from '../pages/FormRegis/Form2';
import BeforeForm from '../pages/BeforeForm';
import AfterForm from '../pages/AfterForm';
import InfoDcc from '../pages/InfoDcc';
import Home from '../pages/Home';
import YouTubeVideos from '../pages/Youtube';
import Event from '../pages/Event';
import EventDetail from '../pages/Event/EventDetail';
import ArticleDetail from '../pages/Article/DetailArticle';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconStyle = {};

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Event':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
            case 'Activity':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            case 'E-Learning':
              iconName = focused ? 'film' : 'film-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          if (focused) {
            iconStyle = {
              backgroundColor: 'tomato',
              padding: 10,
              borderRadius: 50,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5, // Android shadow
            };
          }

          return (
            <View style={iconStyle}>
              <Icon name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Activity" component={Activity} /> */}
      <Tab.Screen name="E-Learning" component={YouTubeVideos} />
      <Tab.Screen name="Event" component={Event} />
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
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

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        {/* <Stack.Screen name="SplashScreen" component={Splash} /> */}
        {/* <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} /> */}
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="FormRegis" component={FormRegis} />
        <Stack.Screen name="BeforeForm" component={BeforeForm} />
        <Stack.Screen name="AfterForm" component={AfterForm} />
        <Stack.Screen name="InfoDcc" component={InfoDcc} />
        <Stack.Screen name="YouTubeVideos" component={YouTubeVideos} />
        <Stack.Screen name="Article" component={Article} />
        <Stack.Screen name="ArticleDetails" component={ArticleDetail} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="Form2" component={Form2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
