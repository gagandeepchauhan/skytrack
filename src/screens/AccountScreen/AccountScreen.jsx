import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext } from 'react';
import styles from "./AccountScreenStyles";
import { Context as AuthContext } from "../../states/contexts/AuthContext";
import { Context as TrackContext } from "../../states/contexts/TrackContext";
import Spacer from '../../components/Spacer';
import { Feather } from "@expo/vector-icons";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  const { reset: resetTracks } = useContext(TrackContext);

  const handleSignout = useCallback(() => {
    resetTracks();
    signout();
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Account Settings</Text>
      <Spacer/>
      <TouchableOpacity
        onPress={handleSignout}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  )
};

AccountScreen.navigationOptions = () => {
  return {
    title: "Account",
    tabBarIcon: <Feather name="settings" size={20} />
  }
}

export default AccountScreen;