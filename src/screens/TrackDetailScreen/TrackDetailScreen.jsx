import { View, Text } from 'react-native';
import React from 'react';
import styles from "./TrackDetailScreenStyles";
import Map from '../../components/Map';
import Spacer from '../../components/Spacer';

const TrackDetailScreen = ({ navigation }) => {
  const data = navigation.getParam("data"); 
  const start = new Date(data?.locations?.[0]?.timestamp)?.toString();
  const end = new Date(data?.locations?.[data.locations.length -1]?.timestamp)?.toString();

  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.registrationNumber}>{data?.name}</Text>
      </View>
      <Map
        points={ [ ...data?.locations?.map( loc => loc?.coords ) ] }
      />
      <Spacer/>
      <Text style={styles.time}>Start - {start}</Text>
      <Text style={styles.time}>End - {end}</Text>
    </View>
  )
};

TrackDetailScreen.navigationOptions = () => {
  return {
    title: "Track Detail"
  }
}

export default TrackDetailScreen;