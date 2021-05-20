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
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Postcode from '@actbase/react-daum-postcode';
import autoHypenPhone_2 from '../components/utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {DefaultPicker} from '../components/Select';

import {DetailHead} from '../components/header';
import API_CALL from '../ApiCall';

const classPicker = [
  {label: '사업자 아님', value: 'no'},
  {label: '개인', value: 'Private'},
  {label: '법인', value: 'Corporate'},
];

const RegisterFailed = () => {
  useEffect(() => {
    Toast.show({
      type: 'my_custom_type',
      text1: '회원가입을 완료하지 못했습니다.',
    });
  }, []);
};

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Boxwidth = Width - 40;
const Boxheight = Height - 100;

const Register = ({navigation}) => {
  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent?.setOptions({tabBarVisible: false});
    return () => parent?.setOptions({tabBarVisible: true});
  }, []);

  const [check, setCheck] = useState(false);
  const [response, setResponse] = useState(null);
  const [iddoublecheck, setIdDoubleCheck] = useState(true);

  //   const [nickCheck, setNickCheck] = useState(true);
  const [postcode, setPostcode] = useState(false);
  const [posttype, setPosttype] = useState('');
  // JSON 데이터 상태값
  const [mt_login_type, setLogin_type] = useState('1');
  const [mt_seller, setSeller] = useState(false);
  const [mt_id, setId] = useState('');
  const [mt_name, setName] = useState('');
  const [mt_nickname, setNickname] = useState('');
  const [mt_pwd, setPwd] = useState('');
  const [mt_pwd_re, setPwd_re] = useState('');
  const [mt_zip, setZip] = useState('');
  const [mt_add1, setAdd1] = useState('');
  const [mt_add2, setAdd2] = useState('');
  const [mt_hp, setHp] = useState('');
  const [mt_level, setLevel] = useState(2);
  const [mt_sms_certify, setSms_certify] = useState(false);
  const [mt_company_name, setCompany_name] = useState('');
  const [mt_business_type, setBusiness_type] = useState([]);
  const [mt_business_number, setBusiness_number] = useState('');
  const [mt_mail_number, setMail_number] = useState('');
  const [mt_business_status, setBusiness_status] = useState('');
  const [mt_ceo, setCeo] = useState('');
  const [mt_business_tel, setBusiness_tel] = useState('');
  const [mt_ceo_tel, setCeo_tel] = useState('');
  const [mt_business_zip, setBusiness_zip] = useState('');
  const [mt_business_add, setBusiness_add] = useState('');
  const [mt_business_add2, setBusiness_add2] = useState('');
  const [mt_invoice_email, setInvoice_email] = useState('');
  const [business_image, setBusiness_Image] = useState('');
  const [mt_bank, setBank] = useState('');
  const [mt_account, setAccount] = useState('');
  const [mt_account_name, setAccount_name] = useState('');
  const [mt_account_certify, setAccount_certify] = useState(false);
  const [mt_image1, setImage1] = useState('');
  const [mt_license, setLicense] = useState('');

  const postInfo = async () => {
    if (!iddoublecheck) {
      return Alert.alert('제목', '아이디 중복체크를 해주세요');
    }
    const form = new FormData();
    form.append('method', 'proc_add_member');
    form.append('mt_login_type', mt_login_type);
    form.append('mt_seller', mt_seller);
    form.append('mt_id', mt_id);
    form.append('mt_name', mt_name);
    form.append('mt_nickname', mt_nickname);
    form.append('mt_pwd', mt_pwd);
    form.append('mt_pwd_re', mt_pwd_re);
    form.append('mt_zip', mt_zip);
    form.append('mt_add1', mt_add1);
    form.append('mt_hp', mt_hp);
    form.append('mt_level', mt_level);
    mt_add2 ?? form.append('mt_add2', mt_add2);
    mt_sms_certify ?? form.append('mt_sms_certify', mt_sms_certify);
    mt_company_name ?? form.append('mt_company_name', mt_company_name);
    mt_business_type ?? form.append('mt_business_type', mt_business_type);
    mt_business_number ?? form.append('mt_business_number', mt_business_number);
    mt_mail_number ?? form.append('mt_mail_number', mt_mail_number);
    mt_business_status ?? form.append('mt_business_status', mt_business_status);
    mt_ceo ?? form.append('mt_ceo', mt_ceo);
    mt_business_tel ?? form.append('mt_business_tel', mt_business_tel);
    mt_ceo_tel ?? form.append('mt_ceo_tel', mt_ceo_tel);
    mt_business_zip ?? form.append('mt_business_zip', mt_business_zip);
    mt_business_add ?? form.append('mt_business_add', mt_business_add);
    mt_business_add2 ?? form.append('mt_business_add2', mt_business_add2);
    mt_invoice_email ?? form.append('mt_invoice_email', mt_invoice_email);
    mt_bank ?? form.append('mt_bank', mt_bank);
    mt_account ?? form.append('mt_account', mt_account);
    mt_account_name ?? form.append('mt_account_name', mt_account_name);
    mt_account_certify ?? form.append('mt_account_certify', mt_account_certify);
    mt_image1 ?? form.append('mt_image1', mt_image1);
    mt_license ?? form.append('mt_license', mt_license);

    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';

    const api = await API_CALL(url + path, form, false);
    const {
      data: {result, message},
    } = api;
    if (result === '0') {
      return Alert.alert('제목', message);
    } else if (result === '1') {
      navigation.navigate('Main');
    }
  };

  const pickImg = () => {
    const options = {
      title: '사진',
      takePhotoButtonTitle: '카메라',
      chooseFromLibraryButtonTitle: '이미지 선택',
      cancelButtonTitle: '취소',
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setBusiness_Image(response.uri); // 저는 여기서 uri 값을 저장 시킵니다 !
      }
    });
  };
  const idDobleCheck = async () => {
    try {
      const form = new FormData();
      form.append('method', 'proc_duplicate_id');
      form.append('mt_id', mt_id);

      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';

      const api = await API_CALL(url + path, form, false);
      const {
        data: {result, message},
      } = api;
      if (result === '0') {
        setIdDoubleCheck(true);
        return Alert.alert('제목', message);
      } else if (result === '1') {
        setIdDoubleCheck(false);
        return Alert.alert('제목', message);
      }
    } catch {
      console.log('Double Check Error');
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
      <DetailHead title="회원가입" />
      <ScrollView>
        <View style={{padding: 20, paddingBottom: 30}}>
          {/* 회원 정보 */}
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              아이디 <Text style={styles.seltext}>(필수)</Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.inputstyle}
                placeholder="아이디"
                placeholderTextColor="#C9C9C9"
                value={mt_id}
                editable={iddoublecheck}
                selectTextOnFocus={iddoublecheck}
                onChangeText={text => setId(text)}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  height: 35,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 100,
                  marginLeft: 5,
                }}
                disabled={!iddoublecheck}
                onPress={() => {
                  idDobleCheck();
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#fff',
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 20,
                  }}>
                  중복확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              닉네임 <Text style={styles.seltext}>(필수)</Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.inputstyle}
                placeholder="닉네임"
                placeholderTextColor="#C9C9C9"
                value={mt_nickname}
                onChangeText={text => setNickname(text)}
              />
              {/* <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  height: 35,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 100,
                  marginLeft: 5,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#fff',
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 20,
                  }}>
                  중복확인
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              회원명 <Text style={styles.seltext}>(필수)</Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.inputstyle}
                placeholder="회원명"
                placeholderTextColor="#C9C9C9"
                value={mt_name}
                onChangeText={text => setName(text)}
              />
            </View>
          </View>

          <View style={styles.contbox}>
            <Text style={styles.contitle}>ㄹ
              비밀번호 <Text style={styles.seltext}>(필수)</Text>
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
            {/* <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20,color:'#aaa',paddingLeft:10,}}>비밀번호가 일치합니다.</Text>
                        <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20,color:'#FC6060',paddingLeft:10,}}>비밀번호가 일치하지 않습니다.</Text> */}
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              주소 <Text style={styles.seltext}>(필수)</Text>
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
              휴대폰 번호 <Text style={styles.seltext}>(필수)</Text>
            </Text>
            <Text
              style={{
                position: 'absolute',
                top: 2,
                right: 5,
                fontSize: 13,
                fontFamily: 'NotoSansKR-Regular',
                lineHeight: 20,
                color: '#447DD1',
              }}>
              인증완료
            </Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="휴대폰 번호"
              placeholderTextColor="#C9C9C9"
              value={mt_hp}
              onChangeText={text => setHp(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#447DD1',
                width: '100%',
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: 'NotoSansKR-Medium',
                  lineHeight: 20,
                }}>
                휴대폰 인증
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 회원정보 끝 */}
        {/* 판매자 정보 */}
        <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 20,
              paddingBottom: 15,
            }}>
            판매자 정보
          </Text>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>계좌</Text>
            <Text
              style={{
                position: 'absolute',
                top: 2,
                right: 5,
                fontSize: 13,
                fontFamily: 'NotoSansKR-Regular',
                lineHeight: 20,
                color: '#447DD1',
              }}>
              인증완료
            </Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="은행명"
              placeholderTextColor="#C9C9C9"
              value={mt_bank}
              onChangeText={text => setBank(text)}
            />
            <TextInput
              style={styles.inputstyle}
              placeholder="계좌번호"
              placeholderTextColor="#C9C9C9"
              keyboardType="numeric"
              value={mt_account}
              onChangeText={text => setAccount(text)}
            />
            <TextInput
              style={styles.inputstyle}
              placeholder="예금주"
              placeholderTextColor="#C9C9C9"
              value={mt_account_name}
              onChangeText={text => setAccount_name(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#447DD1',
                width: '100%',
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: 'NotoSansKR-Medium',
                  lineHeight: 20,
                }}>
                계좌 인증
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 20,
              paddingBottom: 15,
            }}>
            사업자 정보
          </Text>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>구분</Text>
            <View>
              <DefaultPicker placeholder="사업자 구분" picker={classPicker} />
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>사업자 등록 번호</Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="사업자 등록 번호"
              placeholderTextColor="#C9C9C9"
              value={mt_business_number}
              onChangeText={text => setBusiness_number(text)}
            />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>사업자 등록증</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <TextInput
                style={[styles.inputstyle, {flex: 1, marginBottom: 0}]}
                placeholder="사업자 등록 번호"
                placeholderTextColor="#C9C9C9"
                editable={false}
                value={mt_license}
                onChangeText={text => setLicense(text)}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  borderRadius: 8,
                  height: 35,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}
                onPress={() => pickImg()}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 20,
                    color: '#fff',
                  }}>
                  파일 선택
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>통신 판매업 번호</Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="통신 판매업 번호"
              placeholderTextColor="#C9C9C9"
              value={mt_mail_number}
              onChangeText={text => setMail_number(text)}
            />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>업태/업종</Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="업태/업종"
              placeholderTextColor="#C9C9C9"
              value={mt_business_status}
              onChangeText={text => setBusiness_status(text)}
            />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>대표자명</Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="대표자명"
              placeholderTextColor="#C9C9C9"
              value={mt_ceo}
              onChangeText={text => setCeo(text)}
            />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>사업장 연락처</Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="사업장 연락처"
              placeholderTextColor="#C9C9C9"
              value={mt_business_tel}
              onChangeText={text => setBusiness_tel(text)}
            />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>대표자 연락처</Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="대표자 연락처"
              placeholderTextColor="#C9C9C9"
              value={mt_ceo_tel}
              onChangeText={text => setCeo_tel(text)}
            />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>이메일 주소</Text>
            <TextInput
              style={styles.inputstyle}
              placeholder="이메일 주소"
              placeholderTextColor="#C9C9C9"
              value={mt_invoice_email}
              onChangeText={text => setInvoice_email(text)}
            />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>사업장 주소</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={[styles.inputstyle, {flex: 1}]}
                placeholder="주소를 입력해주세요."
                placeholderTextColor="#C9C9C9"
                editable={false}
                value={mt_business_zip}
                onChangeText={text => setBusiness_zip(text)}
              />
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 100,
                  backgroundColor: '#477DD1',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}
                onPress={() => {
                  setPosttype('business');
                  setPostcode(!postcode);
                }}>
                <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                  주소 찾기
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.inputstyle}
              editable={false}
              value={mt_business_add}
              onChangeText={text => setBusiness_add(text)}
            />
            <TextInput
              style={styles.inputstyle}
              placeholder="상세주소"
              placeholderTextColor="#C9C9C9"
              value={mt_business_add2}
              onChangeText={text => setBusiness_add2(text)}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrivacyPolicy')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#EBEBEB',
              paddingVertical: 8,
              paddingHorizontal: 12,
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 13, fontFamily: 'NotoSansKR-Medium'}}>
              개인정보 처리방침
            </Text>
            <Icon name="arrow-forward-ios" size={20} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsOfService')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#EBEBEB',
              paddingVertical: 8,
              paddingHorizontal: 12,
              marginBottom: 20,
            }}>
            <Text style={{fontSize: 13, fontFamily: 'NotoSansKR-Medium'}}>
              딜메이트 이용약관
            </Text>
            <Icon name="arrow-forward-ios" size={20} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCheck(!check)}
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            {check === false ? (
              <Icon name="check-box-outline-blank" size={24} color="#eee" />
            ) : (
              <Icon name="check-box" size={24} color="#447DD1" />
            )}
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 16,
                paddingLeft: 5,
              }}>
              위의 글을 모두 읽고 동의합니다.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: check === false ? '#eee' : '#447DD1',
              height: 56,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
            onPress={check === false ? null : () => postInfo()}>
            <Text
              style={{
                fontSize: 16,
                color: check === false ? '#999' : '#fff',
                fontFamily: 'NotoSansKR-Medium',
              }}>
              다음
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
