import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { Context as LocationContext } from '../states/contexts/LocationContext';
import Spacer from './Spacer';
import { NavigationEvents, withNavigation } from 'react-navigation';
import useTracks from '../hooks/useTracks';

const TrackForm = ({ navigation }) => {
    const { 
        state: { name, isRecording, locations }, 
        setTrackName, 
        startRecording, 
        stopRecording, 
        resetLocation 
    } = useContext(LocationContext);
    const [ _, saveTrack ] = useTracks();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSaveTrack = useCallback(async ()=>{
        if(!name){
            setError("Name is required");
            return;
        }
        setLoading(true);
        setError('');
        await saveTrack();
        setLoading(false);
    },[saveTrack]);

    const handleReset = useCallback(()=>{
        resetLocation();
        setError('');
    },[]);

    return (
        <View style={styles.trackForm}>
            <NavigationEvents
                onWillBlur={()=>setError('')}
            />
            <TextInput
                placeholder='Type track name' 
                style={styles.inputStyle} 
                value={name}
                onChangeText={setTrackName}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
            <Spacer/>
            <Spacer/>
            <TouchableOpacity
                style={styles.btnStyle}
                disabled={loading}
                onPress={isRecording ? stopRecording : startRecording}
            >
                <Text style={styles.loginText} >{isRecording ? 'Stop' : locations.length === 0 ? 'Start Recording' : 'Continue Recording'}</Text>
            </TouchableOpacity>
            
            {locations?.length > 0 && !isRecording
                ?   <>
                        <Spacer/>
                        <TouchableOpacity
                            style={styles.btnOutlineStyle}
                            onPress={handleSaveTrack}
                            disabled={loading}
                        >
                            {loading ?
                                <ActivityIndicator size={"small"} color="rgb(12, 165, 242)" />
                                :
                                <Text style={styles.saveText} >Save Track</Text>
                            }
                        </TouchableOpacity>
                    </>
                :   null
            }
            {locations?.length > 0
                ?   <>
                        <Spacer/>
                        <TouchableOpacity
                            style={styles.btnSecondaryStyle}
                            onPress={handleReset}
                            disabled={loading}
                        >
                            <Text style={styles.resetText} >Reset Track</Text>
                        </TouchableOpacity>
                    </>
                :   null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    trackForm:{

    },
    inputStyle:{
        paddingVertical: 10,
        borderBottomColor: "rgb(227, 232, 234)",
        borderBottomWidth: 1,
        fontSize: 16,
        fontFamily: "Poppins",
    },
    btnStyle:{
        backgroundColor: "rgb(12, 165, 242)",
        padding: 10,
        borderRadius: 5
    },
    btnOutlineStyle:{
        borderColor: "rgb(12, 165, 242)",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5
    },
    btnSecondaryStyle:{
        backgroundColor: "rgb(237, 232, 232)",
        padding: 10,
        borderRadius: 5
    },
    loginText:{
        fontSize: 18,
        textAlign: "center",
        color: "#fff",
        fontFamily: "Poppins"
    },
    saveText:{
        fontSize: 18,
        textAlign: "center",
        color: "rgb(12, 165, 242)",
        fontFamily: "Poppins"
    },
    resetText:{
        fontSize: 18,
        textAlign: "center",
        color: "#000",
        fontFamily: "Poppins"
    },
    errorMessage:{
        color: "red",
        marginTop: 5,
        fontFamily: "Poppins"
    }
});

export default withNavigation(TrackForm);