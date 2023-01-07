import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

const instance =  axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
// console.log(API_URL)
instance.interceptors.request.use(
    async (config) => {
        try{
            const token = await AsyncStorage.getItem("skytrack_token");
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
        }catch(e){
            // console.log("interceptor err" ,e);
        } 
        return config;
    },
    (err) => {
        // console.log("interceptor error" ,err);
        return Promise.reject(err);
    }
);

export default instance;