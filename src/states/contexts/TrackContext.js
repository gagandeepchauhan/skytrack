import createDataContext from "./createDataContext"
import api from "../../api";
import { navigate } from "../../navigationRef";

const trackReducer = (state, action) => {
    switch(action.type){
        case "set_tracks" :
            return { errorMessage: '', tracks: action.payload };
        case "add_error" : 
            return { ...state, errorMessage: action.payload };
        case "reset" :
            return { errorMessage: '', tracks: [] };
        default:
            return state;
    }
};

const fetchTracks = dispatch => async (callback) => {
    try{
        const response = await api.get('/tracks');
        dispatch({
            type: "set_tracks",
            payload: response.data?.data || [] // response.data = { count, data: [ list of track objects ] }
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
        await api.post('/tracks', {
            name,
            locations
        });
    }catch(err){
        // console.log(err);
        dispatch({
            type: "add_error",
            payload: "Unable to add a track"
        });
    }
};

const deleteTrack = dispatch => async (id) => { 
    try{
        await api.delete(`/tracks/${id}`);
        navigate("TrackList");
    }catch(err){
        console.log(err?.response);
        dispatch({
            type: "add_error",
            payload: "Unable to delete a track"
        });
    }
};

const reset = dispatch => () => {
    dispatch({
        type: "reset"
    });
};

const initialValue = {
    errorMessage: '',
    tracks: []
};

export const { Context, Provider } = createDataContext(
    trackReducer, 
    { fetchTracks, createTrack, reset, deleteTrack }, 
    initialValue
);