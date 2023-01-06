import { View, Text } from 'react-native';
import React, { useCallback, useContext } from 'react';
import styles from "./TrackCreateScreenStyles";
import Map from '../../components/Map';
import Spacer from '../../components/Spacer';
import { Context as LocationContext } from "../../states/contexts/LocationContext";
import useLocation from '../../hooks/useLocation';
import { withNavigationFocus } from 'react-navigation';
import TrackForm from '../../components/TrackForm';
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused, navigation }) => {
  const { state: { isRecording }, addLocation } = useContext(LocationContext);
  const locationCallback = useCallback((location) => {
    addLocation(location, isRecording);
  }, [isRecording]);
  const [error] = useLocation(isFocused || isRecording, locationCallback);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Create Track</Text>
      <Spacer/>
      <Map/>
      <Spacer/>
      <TrackForm/>
      <Spacer/>
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  )
};

TrackCreateScreen.navigationOptions = () => {
  return {
    title: "Add Track",
    tabBarIcon: <FontAwesome name="plus" size={20} />
  }
}

export default withNavigationFocus(TrackCreateScreen);