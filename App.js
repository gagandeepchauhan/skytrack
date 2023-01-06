import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";

import { setNavigator } from './src/navigationRef';

import { Provider as AuthProvider } from "./src/states/contexts/AuthContext";
import { Provider as LocationProvider } from "./src/states/contexts/LocationContext";
import { Provider as TrackProvider } from "./src/states/contexts/TrackContext";

import SigninScreen from './src/screens/SigninScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import AccountScreen from './src/screens/AccountScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const TrackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
});

TrackListFlow.navigationOptions = () => {
  return {
    title: "Tracks",
    tabBarIcon: <Feather name="list" size={20} />
  }
}

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
      Signin: SigninScreen,
      Signup: SignupScreen
    },{
      defaultNavigationOptions:{
        title: ""
      }
    }),
    mainFlow: createMaterialBottomTabNavigator({
      trackListFlow: TrackListFlow,
      TrackCreate: TrackCreateScreen,
      Account: AccountScreen
    })
  },{
    initialRouteName: "ResolveAuth"
  }
);

const App = createAppContainer(switchNavigator);

export default function (){
  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LocationProvider>
          <TrackProvider>
            <App ref={navigation => setNavigator(navigation)} />
          </TrackProvider>
        </LocationProvider>
      </AuthProvider>
    </SafeAreaProvider> 
  );
}
