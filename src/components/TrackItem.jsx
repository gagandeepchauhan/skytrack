import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { Feather } from "@expo/vector-icons";

const TrackItem = ({ data, navigation }) => {

  return (
    <TouchableOpacity
        onPress={()=>navigation.navigate("TrackDetail", { data })}
    >
        <View style={styles.container}>
            <Text style={styles.registrationNumber}>{data?.name}</Text>
            <Feather name="chevrons-right" size={20}/>
        </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        borderBottomColor: "rgb(227, 232, 234)",
        borderBottomWidth: 0.8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    registrationNumber:{
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Poppins",
        textTransform: "capitalize"
    },
    type:{
        fontFamily: "Poppins",
        fontSize: 14
    }
});

export default withNavigation(TrackItem);