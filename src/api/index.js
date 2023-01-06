import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance =  axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use(
    async (config) => {
        try{
            const token = await AsyncStorage.getItem("skytrack_token");
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
        }catch(e){
            console.log(e);
        } 
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;