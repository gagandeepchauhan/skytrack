import { View, Text } from 'react-native';
import React from 'react';
import styles from "./TrackDetailScreenStyles";
import Map from '../../components/Map';

const TrackDetailScreen = ({ navigation }) => {
  const data = navigation.getParam("data"); 

  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.registrationNumber}>{data?.name}</Text>
      </View>
      <Map
        points={ [ ...data?.locations?.map( loc => loc?.coords ) ] }
      />
    </View>
  )
};

TrackDetailScreen.navigationOptions = () => {
  return {
    title: "Track Detail"
  }
}

export default TrackDetailScreen;