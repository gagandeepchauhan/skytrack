import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import styles from "./TrackListScreenStyles";
import { Context as TrackContext } from "../../states/contexts/TrackContext";
import TrackItem from '../../components/TrackItem';
import { TextInput } from 'react-native-gesture-handler';
import useTracks from '../../hooks/useTracks';
import { NavigationEvents } from 'react-navigation';

const TrackListScreen = ({navigation}) => {
  const { state: { errorMessage }, fetchTracks } = useContext(TrackContext);
  const [query, setQuery] = useState('');
  const [ tracks ] = useTracks(query);
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={async () => {
          setLoading(true);
          await fetchTracks();
          setLoading(false);
        }}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TextInput
        placeholder='search'
        style={styles.search}
        value={query}
        onChangeText={setQuery}
      />
      {loading ? <ActivityIndicator style={styles.loading}/> : null}
      {tracks?.length === 0 && !loading ? <Text style={styles.noMatchText}>No tracks found</Text> : null}
      <FlatList
        data={tracks}
        style={styles.trackList}
        keyExtractor={(_, idx) => idx}
        renderItem={({item}) => {
          return <TrackItem
            data={item}
          />
        }}
      />
    </View>
  )
};

TrackListScreen.navigationOptions = () => {
  return {
    title: "Tracks"
  }
}

export default TrackListScreen;