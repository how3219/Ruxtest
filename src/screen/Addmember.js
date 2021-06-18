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
import {DefaultPicker} from '../components/Select';
import DocumentPicker from 'react-native-document-picker';
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

const Addmember = ({navigation}) => {
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
  
  // JSON 데이터 상태값
  const [mt_idx,setMt_idx] = useState(member.mt_idx)
  const [mt_bank, setBank] = useState(member.mt_bank);
  const [mt_account, setAccount] = useState(member.mt_account);
  const [mt_account_name, setAccount_name] = useState(member.mt_account_name);
  const [mt_business_type, setBusiness_type] = useState(member.mt_business_type);
  const [mt_business_number, setBusiness_number] = useState(member.mt_business_number);
  const [mt_mail_number, setMail_number] = useState(member.mt_mail_number);
  const [mt_business_status, setBusiness_status] = useState(member.mt_business_status);
  const [mt_ceo, setCeo] = useState(member.mt_ceo);
  const [mt_business_tel, setBusiness_tel] = useState(member.mt_business_tel);
  const [mt_ceo_tel, setCeo_tel] = useState(member.mt_ceo_tel);
  const [mt_business_zip, setBusiness_zip] = useState(member.mt_business_zip);
  const [mt_business_add, setBusiness_add] = useState(member.mt_business_add);
  const [mt_business_add2, setBusiness_add2] = useState(member.mt_business_add2);
  const [mt_invoice_email, setInvoice_email] = useState(member.mt_invoice_email);
  const [mt_license, setMt_license] = useState(member.mt_license);
 
  

  const postInfo = async () => {
    const form = new FormData();
    form.append('method', 'proc_seller_change_add');
    form.append('mt_idx', mt_idx);
    form.append('mt_bank', mt_bank);
    form.append('mt_account', mt_account);
    form.append('mt_account_name', mt_account_name);
    mt_business_type&&form.append('mt_business_type', mt_business_type);
    mt_business_number&&form.append('mt_business_number', mt_business_number);
    mt_mail_number&&form.append('mt_mail_number', mt_mail_number);
    mt_business_status&&form.append('mt_business_status', mt_business_status);
    mt_ceo&&form.append('mt_ceo', mt_ceo);
    mt_business_tel&&form.append('mt_business_tel', mt_business_tel);
    mt_ceo_tel&&form.append('mt_ceo_tel', mt_ceo_tel);
    mt_business_zip&&form.append('mt_business_zip', mt_business_zip);
    mt_business_add&&form.append('mt_business_add', mt_business_add);
    mt_business_add2&&form.append('mt_business_add2', mt_business_add2);
    mt_invoice_email&&form.append('mt_invoice_email', mt_invoice_email);
    mt_license&&form.append('mt_license', mt_license);
    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    const api = await API_CALL(url + path, form, false);
    const {
      data: {result, message,item},
    } = api;
    if (result === '0') {
      return Alert.alert('', message);
    } else if (result === '1') {      
      dispatch({
        type : 'LOGIN',
        payload : item[0]
      })
      Alert.alert('', message);
      navigation.goBack();
    }
  };

 
// 파일 업로드 메소드
const filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setMt_license({
        uri: res.uri,
        type: res.type,
        name: res.name,
      });
     
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
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
  
      setBusiness_zip(zipcode);
      setBusiness_add(fullAddress);
      setPostcode(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DetailHead title={member.mt_seller=="N"||!member.mt_seller?"판매자회원 가입":"판매자회원정보 수정"} />
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
      <ScrollView>
        {/* 판매자 정보 */}
        <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 20,
              paddingVertical: 15,
            }}>
            필수입력
          </Text>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>계좌</Text>
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
            추가입력
          </Text>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>구분</Text>
            <View>
              <DefaultPicker placeholder="사업자 구분" picker={classPicker} onChange={setBusiness_type}/>
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
                placeholder="파일명"
                placeholderTextColor="#C9C9C9"
                editable={false}
                value={mt_license&&mt_license.name?mt_license.name:''}
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
                onPress={() => filePicker()}>
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
              keyboardType="numeric"
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
              keyboardType="numeric"
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
                onPress={() => {setPostcode(true);}}>
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
              {member.mt_seller=="N"||!member.mt_seller?"판매자회원 가입":"판매자회원정보 수정"}
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

export default Addmember;
