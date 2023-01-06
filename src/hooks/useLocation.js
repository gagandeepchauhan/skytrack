import { useEffect, useState } from 'react';
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';

const useLocation = (shouldTrack, callback) => {
    const [error, setError] = useState();

    useEffect(()=>{
        let subscriber;
        const startWatching = async () => {
            try{
                const { granted } = await requestForegroundPermissionsAsync();
                if(!granted){
                    throw new Error("Location service need to be enable for this")
                }
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                },callback);
            }catch(err){
                setError(err instanceof String ? err : "Something went wrong");
            }
        };
        if(shouldTrack){
            startWatching();
        }else{
            if(subscriber){
                subscriber.remove();
            }
            subscriber = null;
        }
        return () => {
            if(subscriber)
                subscriber.remove();
        };
    },[shouldTrack, callback]);

    return [error];
};

export default useLocation;