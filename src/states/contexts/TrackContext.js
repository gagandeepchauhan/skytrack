import createDataContext from "./createDataContext"
import api from "../../api";

const trackReducer = (state, action) => {
    switch(action.type){
        case "set_tracks" :
            return { ...state, errorMessage: '' }
        case "create_track" :
            return { errorMessage: '', tracks: [...state.tracks, action.payload] }
        case "add_error" : 
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
};

const fetchTracks = dispatch => async (callback) => {
    try{
        // const response = await api.get('/tracks');
        dispatch({
            type: "set_tracks",
            payload: [] // response.data = { count, data: [ list of track objects ] }
        });
    }catch(err){
        console.log(err);
        dispatch({
            type: "add_error",
            payload: "Unable to fetch tracks"
        });
    }finally{
        if(callback) callback();
    }
};

const createTrack = dispatch => async (name, locations) => { // track is like { name, _id, locations : [ { timestamp, coords: { latitute, longitude, accuracy, speed, altitude, altitudeAccuracy } }, ... ] }
    try{
        // const response = await api.post('/tracks', {
        //     name,
        //     locations
        // });
        dispatch({
            type: "create_track",
            payload: { name, locations }
        });
    }catch(err){
        console.log(err);
        dispatch({
            type: "add_error",
            payload: "Unable to add a track"
        });
    }
}

const initialValue = {
    errorMessage: '',
    tracks: []
};

export const { Context, Provider } = createDataContext(
    trackReducer, 
    { fetchTracks, createTrack }, 
    initialValue
);