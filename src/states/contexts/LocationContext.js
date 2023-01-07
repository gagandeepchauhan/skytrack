import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
    switch(action.type){
        case "add_current_location":
            return { ...state, currentLocation: action.payload };
        case "add_location":
            return { ...state, locations: [ ...state.locations, action.payload ] };
        case "set_track_name":
            return { ...state, name: action.payload };
        case "start_recording":
            return { ...state, isRecording: true };
        case "stop_recording":
            return { ...state, isRecording: false };
        case "reset_location":
            return { ...state, locations: [], name: '', isRecording: false };
        default:
            return state;
    }
};

const addLocation = dispatch => (location, isRecording) => {
    // console.log("Location - ", location);
    if(isRecording){
        dispatch({
            type: "add_location",
            payload: location 
        });
    }
    dispatch({
        type: "add_current_location",
        payload: location
    });
};

const setTrackName = dispatch => (name) => {
    dispatch({
        type: "set_track_name",
        payload: name
    });
};

const startRecording = dispatch => () => {
    dispatch({
        type: "start_recording"
    });
};

const stopRecording = dispatch => () => {
    dispatch({
        type: "stop_recording"
    });
};

const resetLocation = dispatch => () => {
    dispatch({
        type: "reset_location"
    });
};


const initialValue = {
    currentLocation: null,
    locations: [],
    name: '',
    isRecording: false
};

export const { Context, Provider } = createDataContext(
    locationReducer,
    { addLocation, setTrackName, startRecording, stopRecording, resetLocation },
    initialValue
);