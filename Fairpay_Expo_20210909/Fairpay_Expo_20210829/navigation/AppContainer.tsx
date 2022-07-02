import React from "react";
import * as Analytics from "expo-firebase-analytics";
import * as SplashScreen from "expo-splash-screen";
import { enableScreens } from "react-native-screens";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import createStackNavigator from "./createStackNavigator";
import useAuth from "hooks/useAuth";

import IntroNavigator from "./IntroNavigator";
import AuthNavigator from "./AuthNavigator";
import ActivityNavigator from "./ActivityNavigator";
import GroupNavigator from "./GroupNavigator";
import ExpenseNavigator from "./ExpenseNavigator";
import FriendNavigator from "./FriendNavigator";
import ProfileNavigator from "./ProfileNavigator";
import MainNavigator from "./MainNavigator";

import ModalScreen from "screens/ModalScreen";
import NotFoundScreen from "screens/NotFoundScreen";

import Loading from "./Loading";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList } from "./types";
import { LogBox, View } from "react-native";
import { useTheme } from "@ui-kitten/components";

enableScreens();

interface AppContainerProps {
  cachedResources: boolean;
}

LogBox.ignoreAllLogs();

const Stack = createStackNavigator<RootStackParamList>();

const AppContainer: React.FC<AppContainerProps> = ({ cachedResources }) => {
  const themes = useTheme();
  const navigationRef = React.useRef<NavigationContainerRef>(null);
  const routeNameRef = React.useRef<string | undefined>(undefined);
  const { isInitialized, isSignedIn, isIntro } = useAuth();
  React.useEffect(() => {
    const stopAutoHideSplash = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    };
    stopAutoHideSplash();
  }, []);

  React.useEffect(() => {
    const hideSplash = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };
    if (cachedResources && isInitialized) {
      hideSplash();
    }
  }, [cachedResources, isInitialized]);

  const getInitialRouteName = React.useCallback(() => {
    if (!isIntro) {
      return "Intro"; //Intro
    }
    if (isSignedIn) {
      return "Main";
    }
    return "Auth"; //Sign In
  }, [isIntro, isSignedIn]);

  if (!cachedResources) {
    return <Loading />;
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      onReady={() =>
        (routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        if (previousRouteName !== currentRouteName) {
          await Analytics.setCurrentScreen(currentRouteName);
        }
      }}
    >
      <View
        style={{ backgroundColor: themes["background-basic-color-1"], flex: 1 }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={getInitialRouteName()}
        >
          <Stack.Screen name="Intro" component={IntroNavigator} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Activities" component={ActivityNavigator} />
          <Stack.Screen name="Groups" component={GroupNavigator} />
          <Stack.Screen name="Expense" component={ExpenseNavigator} />
          <Stack.Screen name="Friends" component={FriendNavigator} />
          <Stack.Screen name="Profile" component={ProfileNavigator} />
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="ModalScreen" component={ModalScreen} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
