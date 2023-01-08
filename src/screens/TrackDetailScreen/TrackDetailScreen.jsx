import { View, Text, Touchable, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import styles from "./TrackDetailScreenStyles";
import Map from '../../components/Map';
import Spacer from '../../components/Spacer';
import { Context as TrackContext } from "../../states/contexts/TrackContext";

const TrackDetailScreen = ({ navigation }) => {
  const data = navigation.getParam("data"); 
  const start = new Date(data?.locations?.[0]?.timestamp)?.toString();
  const end = new Date(data?.locations?.[data.locations.length -1]?.timestamp)?.toString();
  const { deleteTrack } = useContext(TrackContext);
  const [loading, setLoading] = useState(false);

  const handleDeleteTrack = useCallback(async ()=>{
    setLoading(true);
    await deleteTrack(data._id);
    setLoading(false);
  },[data]);

  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.registrationNumber}>{data?.name}</Text>
        <TouchableOpacity
          onPress={handleDeleteTrack}
          style={styles.delete}
        >
          {loading ?
              <ActivityIndicator size={"small"} color="#fff" />
              :
              <Text style={styles.deleteText}>Delete</Text>
          }
        </TouchableOpacity>
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