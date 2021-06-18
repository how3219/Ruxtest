import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,StyleSheet,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector,useDispatch} from 'react-redux';
import {MypageHeader} from '../components/header';
import API_CALL from '../ApiCall';
import AsyncStorage from "@react-native-community/async-storage"
import { memberInitial } from '../redux/reducer/loginReducer';
import {CommonActions} from '@react-navigation/native';
const Setting = ({navigation}) => {
    const {member} = useSelector(state => state.login)
    const dispatch = useDispatch()
    const setLogout = async () => {
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
            }
            Alert.alert("","로그아웃되었습니다.")
            navigation.dispatch(
                CommonActions.reset({
                  index:1,
                  routes:[{name:'Login'}]
                })
              )
            
        }
        catch(e){
            console.log(e)
            
        }
    } 
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <MypageHeader/>
            <View style={{width:'100%',height:60,justifyContent:'center',paddingLeft:20,}}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold'}}>환경설정</Text>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={() => navigation.push('RegisterDetail')}
                    >
                    <Text style={styles.text}>회원 정보 수정</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={() => navigation.push('Addmember')}
                    >
                    <Text style={styles.text}>{member.mt_seller=="N"||!member.mt_seller?'판매자 전환하기':'판매자 수정하기'}</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={() => navigation.push('NotiSetting')}
                    >
                    <Text style={styles.text}>알림 설정</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={() => navigation.push('Withdrawal')}
                    >
                    <Text style={styles.text}>회원탈퇴</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        backgroundColor:'#F8F8F8',
                        flexDirection:'row',
                        height:50,
                        justifyContent:'space-between',
                        alignItems:'center',
                        paddingHorizontal:20,
                        borderBottomColor:'#eee',
                        borderBottomWidth:0,
                    }}
                    onPress={() =>setLogout()}
                    >
                    <Text style={styles.text}>로그아웃</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    item:{
        backgroundColor:'#F8F8F8',
        flexDirection:'row',
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    text: {
        fontSize:15,
        lineHeight:20,
        fontFamily:'NotoSansKR-Regular',
    }
})

export default Setting;