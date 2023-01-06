import { useCallback, useContext, useEffect, useState } from "react";
import { Context as TrackContext } from "../states/contexts/TrackContext";
import { Context as LocationContext } from "../states/contexts/LocationContext";
import { navigate } from "../navigationRef";
import useDebounce from "./useDebounce";


const useTracks = (query) => {
    const { state, createTrack } = useContext(TrackContext);
    const { state: { name, locations }, resetLocation } = useContext(LocationContext);
    const [tracks, setTracks] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useDebounce(()=>{
        setDebouncedQuery(query);
    }, [query], 500);

    const getSortOrder = useCallback((term, search)=>{
        if(term.toLowerCase() === search.toLowerCase()) return 0;
        if(term.toLowerCase().startsWith(search.toLowerCase())) return 1;
        return 2;
    },[]);

    const getSortedTracks = useCallback(()=>{
        if(!debouncedQuery){
        setTracks(state.tracks);
        return;
        }
        let tempTracks = state.tracks
        .filter(item=>item.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
        .sort((a,b) => getSortOrder(a.name,debouncedQuery) - getSortOrder(b.name,debouncedQuery));
        setTracks(tempTracks);
    },[state, debouncedQuery, getSortOrder]);

    useEffect(()=>{
        setTracks(state.tracks);
    },[state]);

    useEffect(()=>{
        getSortedTracks();
    }, [debouncedQuery]);

    const saveTrack = useCallback(async () => {
        await createTrack(name, locations);
        resetLocation();
        navigate('TrackList');
    },[name, locations]);

    return [ tracks, saveTrack ];
}

export default useTracks;