import { StyleSheet, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import MapView, { Circle, Polyline } from "react-native-maps";
import { Context as LocationContext } from "../states/contexts/LocationContext";

const Map = ({ points }) => {
    const { state: { currentLocation, locations } } = useContext(LocationContext);
    console.log("points -", points);
    if(points){
        return (
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    ...points[0],
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002
                }}
            >
                <Polyline
                    coordinates={points}
                    strokeWidth={2}
                />
                <Circle
                    center={points[0]}
                    radius={1}
                    strokeWidth={2}
                    strokeColor="rgba(100,200,100,1)"
                    fillColor="rgba(10,200,10,1)"

                /> 
                <Circle
                    center={points[points?.length - 1]}
                    radius={1}
                    strokeWidth={2}
                    strokeColor="rgba(100,200,100,1)"
                    fillColor="rgba(10,200,10,1)"
                /> 
            </MapView>
        )
    }

    if(!currentLocation){
        return <ActivityIndicator size={"small"} style={styles.loader} />
    }

    console.log("Locations - ", locations?.length);

    return (
        <MapView
            style={styles.mapStyle}
            initialRegion={{
                ...currentLocation?.coords,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
            region={{
                ...currentLocation?.coords,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
        >
            <Polyline
                coordinates={locations.map(loc => loc.coords)}
                strokeWidth={2}
            />
            <Circle
                center={currentLocation?.coords}
                radius={30}
                strokeWidth={2}
                strokeColor="rgba(100,200,100,1)"
                fillColor="rgba(10,200,10,0.3)"
            />   
        </MapView>
    )
};

const styles = StyleSheet.create({
    mapStyle:{
        height:300
    },
    loader:{
        marginTop: 50
    },
    errorMessage:{
        color: "red",
        marginTop: 10
    },
});

export default Map;