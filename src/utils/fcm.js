import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

export const getToken = async () => {
    try{
        const token = await requestUserPermissionForFCM();
        if(token){
            return token
        }else{
            return token 
        }
    }catch(e){
        console.log(e)
    }
}

const requestUserPermissionForFCM = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        const token = await messaging().getToken();
        // await messaging().subscribeToTopic('Ruxbox');
        return token;
    } else {
        return null;
    }
}

export default getToken;