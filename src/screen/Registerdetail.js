import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Postcode from '@actbase/react-daum-postcode';
import {launchImageLibrary} from 'react-native-image-picker';
import {DefaultPicker} from '../components/Select';

import {DetailHead} from '../components/header';
import API_CALL from '../ApiCall';

const classPicker = [
  {label: '사업자 아님', value: 'no'},
  {label: '개인', value: 'Private'},
  {label: '법인', value: 'Corporate'},
];

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Boxwidth = Width - 40;
const Boxheight = Height - 100;

const Register = ({navigation}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent?.setOptions({tabBarVisible: false});
    return () => parent?.setOptions({tabBarVisible: true});
  }, []);
  const {member} = useSelector(state => state.login);
  const [check, setCheck] = useState(false);
 
  //   const [nickCheck, setNickCheck] = useState(true);
  const [postcode, setPostcode] = useState(false);
  const [posttype, setPosttype] = useState('');
  // JSON 데이터 상태값
  const [mt_idx,setMt_idx] = useState(member.mt_idx)
  const [mt_id,setMt_id] = useState(member.mt_id)
  const [mt_login_type, setLogin_type] = useState(member.mt_login_type);
  const [mt_seller, setSeller] = useState(member.mt_seller);
  const [mt_name, setName] = useState(member.mt_name);
  const [mt_nickname, setNickname] = useState(member.mt_nickname);
  const [mt_pwd, setPwd] = useState('');
  const [mt_pwd_re, setPwd_re] = useState('');
  const [mt_zip, setZip] = useState(member.mt_zip);
  const [mt_add1, setAdd1] = useState(member.mt_add1);
  const [mt_add2, setAdd2] = useState(member.mt_add2);
  const [mt_hp, setHp] = useState(member.mt_hp);
  const [mt_level, setLevel] = useState(member.mt_level);
  const [memo,setMemo] = useState(member.mt_memo);
  const postInfo = async () => {
    const form = new FormData();
    if(mt_pwd!==mt_pwd_re)return;
    form.append('method', 'proc_add_modify');
    form.append('mt_idx', mt_idx);
    form.append('mt_id', mt_id);
    form.append('mt_login_type', mt_login_type);
    form.append('mt_seller', mt_seller);
    form.append('mt_name', mt_name);
    form.append('mt_nickname', mt_nickname);
    form.append('mt_pwd', mt_pwd);
    form.append('mt_zip', mt_zip);
    form.append('mt_add1', mt_add1);
    form.append('mt_hp', mt_hp);
    form.append('mt_level', mt_level);
    form.append('mt_add2', mt_add2);
    form.append('mt_memo', memo);
    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    const api = await API_CALL(url + path, form, false);
    const {
      data: {result, message,item},
    } = api;
    if (result === '0') {
      return Alert.alert('', message);
    } else if (result === '1') {      
      Alert.alert('', message);
      dispatch({
        type : 'LOGIN',
        payload : item[0]
      })
      navigation.goBack();
    }
  };

  //패스워드 일치 확인
  const ConfirmPwd = () => {
    if (mt_pwd <= 0) {
      return <></>;
    } else if (mt_pwd == mt_pwd_re) {
      return (
        <Text
          style={{
            fontSize: 13,
            fontFamily: 'NotoSansKR-Regular',
            lineHeight: 20,
            color: '#447DD1',
            paddingLeft: 10,
          }}>
          비밀번호가 일치합니다.
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            fontSize: 13,
            fontFamily: 'NotoSansKR-Regular',
            lineHeight: 20,
            color: '#FC6060',
            paddingLeft: 10,
          }}>
          비밀번호가 일치하지 않습니다.
        </Text>
      );
    }
  };

  // 주소검색 API
  const handleComplete = data => {
    let zipcode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    if (posttype === 'personal') {
      setZip(zipcode);
      setAdd1(fullAddress);
      setPostcode(false);
    } else if (posttype === 'business') {
      setBusiness_zip(zipcode);
      setBusiness_add(fullAddress);
      setPostcode(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DetailHead title="회원 정보 수정" />
      <ScrollView>
        <View style={{padding: 20, paddingBottom: 30}}>
          {/* 회원 정보 */}
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              아이디 <Text style={styles.seltext}></Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{mt_id}</Text>
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              회원명
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.contitle}>
                {mt_name}
              </Text>
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              닉네임 
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.inputstyle}
                placeholder="닉네임"
                placeholderTextColor="#C9C9C9"
                value={mt_nickname}
                onChangeText={text => setNickname(text)}
              />
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              비밀번호
            </Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="비밀번호"
              placeholderTextColor="#C9C9C9"
              secureTextEntry={true}
              value={mt_pwd}
              onChangeText={text => setPwd(text)}
              maxLength={12}
            />
            <TextInput
              style={styles.inputstyle}
              placeholder="비밀번호 확인"
              placeholderTextColor="#C9C9C9"
              secureTextEntry={true}
              value={mt_pwd_re}
              onChangeText={text => setPwd_re(text)}
              maxLength={12}
            />
            <ConfirmPwd />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              주소 
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[styles.inputstyle, {flex: 1, color: '#222'}]}
                placeholder="주소를 입력해주세요."
                placeholderTextColor="#C9C9C9"
                editable={false}
                value={mt_zip}
                onChangeText={text => setZip(text)}
              />
              <TouchableOpacity
                onPress={() => {
                  setPosttype('personal');
                  setPostcode(!postcode);
                }}
                style={{
                  height: 35,
                  width: 100,
                  backgroundColor: '#477DD1',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 13,
                    lineHeight: 20,
                    fontFamily: 'NotoSansKR-Medium',
                  }}>
                  주소 찾기
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.inputstyle, {color: '#222'}]}
              editable={false}
              value={mt_add1}
              onChangeText={text => setAdd1(text)}
            />
            <TextInput
              style={styles.inputstyle}
              placeholder="상세주소"
              placeholderTextColor="#C9C9C9"
              value={mt_add2}
              onChangeText={text => setAdd2(text)}
            />
            <Modal
              transparent={true}
              animationType="fade"
              visible={postcode}
              onRequestClose={() => setPostcode(false)}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                }}>
                <View
                  style={{
                    width: Width,
                    height: Height,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Postcode
                    style={{
                      width: Boxwidth,
                      height: Boxheight,
                      marginBottom: 10,
                    }}
                    jsOptions={{animated: true}}
                    // onSelected={data => alert(JSON.stringify(data))}
                    onSelected={handleComplete}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              휴대폰 번호 
            </Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="휴대폰 번호"
              keyboardType="numeric"
              placeholderTextColor="#C9C9C9"
              value={mt_hp.replace(/-/gi, "")}
              onChangeText={text => setHp(text)}
            />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              소개글
            </Text>
            <TextInput
              style={styles.memostyle}
              placeholder="소개글"              
              placeholderTextColor="#C9C9C9"
              value={memo}
              numberOfLines={5}
              onChangeText={text => setMemo(text)}
            />
          </View>
        </View>
        {/* 회원정보 끝 */}
        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#447DD1',
              height: 56,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
            onPress={() => postInfo()}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontFamily: 'NotoSansKR-Medium',
              }}>
              회원정보수정
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contbox: {
    paddingBottom: 20,
  },
  contitle: {
    fontSize: 14,
    fontFamily: 'NotoSansKR-Medium',
    lineHeight: 20,
    paddingBottom: 10,
  },
  inputstyle: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    height: 35,
    paddingLeft: 10,
    paddingVertical: 0,
    marginBottom: 5,
    flex: 1,
    fontFamily: 'NotoSansKR-Regular',
    lineHeight: 20,
    color: '#000',
  },
  memostyle:{
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingLeft: 10,
    paddingVertical: 0,
    marginBottom: 5,
    flex: 1,
    fontFamily: 'NotoSansKR-Regular',
    lineHeight: 20,
    color: '#000',
  },
  graybox: {
    backgroundColor: '#EBEBEB',
    borderRadius: 9,
    padding: 10,
  },
  grayboxtext: {
    fontSize: 13,
    fontFamily: 'NotoSansKR-Medium',
    lineHeight: 20,
  },
  seltext: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'NotoSansKR-Regular',
  },
});

export default Register;
