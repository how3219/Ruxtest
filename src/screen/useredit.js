import React,{useEffect,useState} from 'react';
import {SafeAreaView,View,Text, Alert, ScrollView} from 'react-native';
import API_CALL from '../ApiCall';
import {WebView} from 'react-native-webview'
const Useredit = (props) => {
    const {route:{params}}=props;
    const [contents,setContents] = useState('')
    useEffect(() => {
        getUserEdit()       
    }, [])
    const getUserEdit = async( ) => {
        let form = new FormData();
        if(params.type==="terms"){
            form.append('method', 'proc_terms');
        }else if(params.type==="Privacy"){
            form.append('method', 'proc_privacy_policy');
        }
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        const {data:{result,message,item}} = api;
        if(result==='0'){Alert.alert('',message)}
        else if(result==='1'){
            setContents(item)
        }
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
           <WebView
                originWhitelist={['*']}
                source={{html: contents}}
                style={{width: '100%'}}
            />
        </SafeAreaView>
    );
};

export default Useredit;