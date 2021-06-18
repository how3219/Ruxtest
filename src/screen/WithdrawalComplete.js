import React from 'react';
import {SafeAreaView,  View ,Text, TouchableOpacity,StyleSheet} from 'react-native';
import {DetailHead} from '../components/header';
import {CommonActions} from '@react-navigation/native';
import { memberInitial } from '../redux/reducer/loginReducer';
import API_CALL from '../ApiCall';
import {useDispatch,useSelector} from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";
const WithdrawalComplete = ({navigation}) => {
    const dispatch = useDispatch();
    const {member} = useSelector(state => state.login);
    const Withdrawal = async() => {
        const form = new FormData()
        form.append('method', 'proc_logout_member')
        form.append('mt_id', member.mt_id)
        
        const url = 'http://dmonster1566.cafe24.com'
        const params = '/json/proc_json.php'
        try{
            const api = await API_CALL(url+params, form, false)
            const { data } = api;
            const { result } = data;
            if(result === "1"){
                await AsyncStorage.removeItem('saveLogin')
                dispatch({
                    type : 'logout'
                })
                dispatch({
                    type : 'LOGIN',
                    payload : memberInitial
                })
                navigation.dispatch(
                    CommonActions.reset({
                      index:1,
                      routes:[{name:'Login'}]
                    })
                  )
            }
            
        }
        catch(e){
            console.log(e)
        }
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <DetailHead title="회원 탈퇴 완료"/>
            <View style={{flex:1,padding:20,}}>
                <Text 
                style={{
                    fontSize:18,
                    fontFamily:'NotoSansKR-Medium',
                    color:'#447DD1'
                }}>회원탈퇴<Text style={{color:'#222'}}>가 완료되었습니다.</Text></Text>
                <View style={{paddingBottom:20,}}>
                    <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20,}}>그동안 Luxbox서비스를이용해 주셔서 감사합니다.</Text>
                    <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20,}}>보다 나은 서비스로 다시 찾아 뵙겠습니다.</Text>
                </View>
                <TouchableOpacity 
                onPress={() => {Withdrawal()}}
                style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    graybox: {
        backgroundColor: '#F8F8F8',
        padding:20,
        marginBottom:20,
    },
    grayboxtext:{
        fontSize:13,
        fontFamily:'NotoSansKR-Medium',
        lineHeight:20,
    },
    grayboxtext02:{
        fontSize:13,
        fontFamily:'NotoSansKR-Regular',
        lineHeight:20,
    },
    buttonStyle: {
        height:58,
        width:'100%',
        borderRadius:8,
        backgroundColor:'#447DD1',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    buttonText: {
        color:'#fff',
        fontSize:16,
        fontFamily:'NotoSansKR-Medium',
    }
})

export default WithdrawalComplete;

