import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
   DarkTheme,
   DefaultTheme,
   NavigationContainer,
} from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuthState } from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import LoginScreen from '../screens/LoginScreen';
import LinkingConfiguration from './LinkingConfiguration';
import { navigationRef } from './RootNavigation';
import RegisterScreen from '../screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import globalStyle from '../constants/Colors';
import { ImagesScreen } from '../screens/ImagesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
   return (
      <Tab.Navigator
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
               let iconName;

               if (route.name === 'Zgłoszenia') {
                  iconName = focused
                     ? 'ios-information-circle'
                     : 'ios-information-circle-outline';
               } else if (route.name === 'Zgłoś') {
                  iconName = focused ? 'ios-alert-circle' : 'ios-alert-circle-outline';
               } else if (route.name === 'Moje zgłoszenia') {
                  iconName = focused ? 'ios-list' : 'ios-list-outline';
               } else if (route.name === 'Searching') {
                  iconName = focused ? 'ios-search' : 'ios-search-outline';
               }

               return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: {
               backgroundColor: globalStyle.light.backgroundDarker,
               paddingBottom: 6,
            },
            tabBarActiveTintColor: globalStyle.light.primary,
            tabBarInactiveTintColor: 'gray',
         })}
      >
         <Tab.Screen
            name="Zgłoszenia"
            component={HomeScreen}
            options={{ headerShown: false }}
         />
         <Tab.Screen
            name="Zgłoś"
            component={InfoScreen}
            options={{ headerShown: false }}
         />
         <Tab.Screen
            name="Moje zgłoszenia"
            component={HomeScreen}
            options={{ headerShown: false }}
            initialParams={{ userAnswers: [] }}
         />
      </Tab.Navigator>
   );
}

export default function Navigation({
   colorScheme,
}: {
   colorScheme: ColorSchemeName;
}) {
   const {
      state: { authToken },
   } = useAuthState();

   return (
      <NavigationContainer
         linking={LinkingConfiguration}
         theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
         ref={navigationRef}
      >
         <Stack.Navigator
            screenOptions={{
               contentStyle: {
                  backgroundColor: globalStyle.light.background,
               },
            }}
         >
            <Stack.Screen
               name="Tabs"
               component={Tabs}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Login"
               component={LoginScreen}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Register"
               component={RegisterScreen}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Images"
               component={ImagesScreen}
               options={{ headerShown: false }}
               />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
