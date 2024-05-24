import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";

import AsyncStorage from "@react-native-async-storage/async-storage";

import WelcomeScreen from "./screens/Welcome";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import DetailScreen from "./screens/DetailScreen";

import { View, Text, Platform } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PlacesTab from "./screens/Tabs/Places";
import MapTab from "./screens/Tabs/Map";
import ProfileTab from "./screens/Tabs/Profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    checkUserInfo();
    async function checkUserInfo() {
      const _userInfo = await AsyncStorage.getItem("userInfo");
      console.log("AsyncStorage _userInfo : ", _userInfo);
      setUserInfo(_userInfo);
    }
  }, []);

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 60,
      backgroundColor: "#344955",
    },
  };

  function MainTabNavigator() {
    return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Places"
          component={PlacesTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo
                  name="home"
                  size={24}
                  color={focused ? "#F7F7F7" : undefined}
                />
                <Text style={{ fontSize: 12, color: "#F7F7F7" }}>HOME</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: Platform.OS == "ios" ? -10 : -20,
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  borderRadius: Platform.OS == "ios" ? 20 : 20,
                  backgroundColor: focused ? "#323643" : "#606470",
                }}
              >
                <Entypo
                  name="map"
                  size={24}
                  color={focused ? "white" : undefined}
                />
                <Text style={{ fontSize: 12, color: "#E3FEF7" }}>Map</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome5
                  name="user"
                  size={24}
                  color={focused ? "white" : undefined}
                />
                <Text style={{ fontSize: 12, color: "#E3FEF7" }}>PROFILE</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Welcome">
        {userInfo ? (
          <>
            <Stack.Screen
              name="Home"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{ headerShown: true }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
