import React, { useState, useCallback } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Alert,
} from 'react-native';
import API_CALL from '../ApiCall';
import { DetailHead } from '../components/header';
import {CommonActions} from '@react-navigation/native';
export const Width = Dimensions.get('window').width / 4;

const PWfindScreen = props => {
    const {navigation} = props;
    const [current, setCurrent] = useState('id');
    const [name, setName] = useState('');
    const [id, setID] = useState('');
    const [phone, setPhone] = useState('');

    const findId = async () => {
        try {
            const form = new FormData();
            let ph = phone;
            let regExp = /^\d{3}-\d{3,4}-\d{4}$/;
            if(regExp.test(ph)===false){
                ph=ph.length==11?`${ph.substr(0,3)}-${ph.substr(3,4)}-${ph.substr(7,4)}`:ph.length==10?`${ph.substr(0,3)}-${ph.substr(3,3)}-${ph.substr(6,4)}`:null
            } 
            form.append('method', 'proc_search_pass');
            form.append('mt_id', id);
            form.append('mt_name', name);
            form.append('mt_hp', ph);
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, false);        
            const {
                data: { result, message, item },
            } = api;            
            if (result === '0') {
                return Alert.alert('', message);
            } else if (result === '1') {
                console.log(item)
                Alert.alert('', item&&String(item[0].mt_passsword));
                navigation.dispatch(
                    CommonActions.reset({
                      index:1,
                      routes:[{name:'Login'}]
                    })
                  )
            }
        } catch (e) {
            console.log('비밀번호찾기', e)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <DetailHead title="비밀번호 찾기" />
            <View style={{ padding: 20, flex: 1 }}>
                <View>
                    <Text
                        style={{
                            padding: 5,
                            fontSize: 16,
                            fontFamily: 'NotoSansKR-Bold',
                            lineHeight: 20,
                            marginBottom: 12
                        }}>
                        인증방법
                    </Text>
                    <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                        <TouchableOpacity style={{ paddingHorizontal: 5, flexDirection: 'row' }}>
                            <View style={{
                                height: 24,
                                width: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: current === 'id' ? '#477DD1' : '#C9C9C9',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 5
                            }}>
                                {current === 'id' &&
                                    <View style={{
                                        height: 12,
                                        width: 12,
                                        borderRadius: 6,
                                        backgroundColor: '#477DD1',
                                    }} />
                                }
                            </View>
                            <Text style={{ lineHeight: 24, fontSize: 16, fontWeight: '600' }}>회원아이디</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{paddingHorizontal:12,flexDirection:'row'}}>
            <View style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#C9C9C9',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight:5
            }}>
                <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#477DD1',
                }} />
            </View>
          <Text style={{lineHeight:24,fontSize:16}}>휴대전화</Text>
          </TouchableOpacity> */}
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'NotoSansKR-Bold',
                                lineHeight: 20,
                                marginBottom: 12
                            }}>
                            회원아이디로 비밀번호 찾기
                        </Text>
                        <TextInput
                            style={{
                                fontSize: 13,
                                borderWidth: 1,
                                borderColor: '#eee',
                                borderRadius: 8,
                                height: 35,
                                paddingLeft: 10,
                                paddingVertical: 0,
                                marginBottom: 5,
                                fontFamily: 'NotoSansKR-Regular',
                                lineHeight: 20,
                                color: '#000',
                            }}
                            value={id}
                            onChangeText={text => setID(text)}
                            placeholder="가입한 회원아이디 입력"
                            placeholderTextColor="#C9C9C9"
                        />
                    </View>
                    <View style={{ padding: 5 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'NotoSansKR-Bold',
                                lineHeight: 20,
                                marginBottom: 12
                            }}>
                            회원명
                        </Text>
                        <TextInput
                            style={{
                                fontSize: 13,
                                borderWidth: 1,
                                borderColor: '#eee',
                                borderRadius: 8,
                                height: 35,
                                paddingLeft: 10,
                                paddingVertical: 0,
                                marginBottom: 5,
                                fontFamily: 'NotoSansKR-Regular',
                                lineHeight: 20,
                                color: '#000',
                            }}
                            value={name}
                            onChangeText={text => setName(text)}
                            placeholder="가입한 회원명 입력"
                            placeholderTextColor="#C9C9C9"
                        />
                    </View>
                    <View style={{ padding: 5, marginBottom: 12 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'NotoSansKR-Bold',
                                lineHeight: 20,
                                marginBottom: 12
                            }}>
                            휴대전화
                        </Text>
                        <TextInput
                            style={{
                                fontSize: 13,
                                borderWidth: 1,
                                borderColor: '#eee',
                                borderRadius: 8,
                                height: 35,
                                paddingLeft: 10,
                                paddingVertical: 0,
                                marginBottom: 5,
                                fontFamily: 'NotoSansKR-Regular',
                                lineHeight: 20,
                                color: '#000',
                            }}
                            keyboardType="numeric"
                            placeholder="공백없이 입력"
                            placeholderTextColor="#C9C9C9"
                            value={phone}
                            onChangeText={text => setPhone(text)}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: '#477DD1',
                            borderRadius: 10,
                        }}>
                        <TouchableOpacity
                            onPress={() => setIsvisible(true)}
                            style={{
                                height: 57,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => findId()}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontFamily: 'NotoSansKR-Bold',
                                    lineHeight: 20,
                                }}>
                                인증하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PWfindScreen;
