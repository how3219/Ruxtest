import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
//패키지
import Icon from 'react-native-vector-icons/Ionicons';
//컴포넌트
import Header, {DetailHead} from '../components/header';
import Footer from '../components/footer';
import {DefaultPicker} from '../components/Select';
import Product from '../components/product';
import API_CALL from '../ApiCall';
import { getType } from '@reduxjs/toolkit';

export const Width = Dimensions.get('window').width / 4;
//나중에 member.mt_sms_certify를 비교하여 인증 여부 확인후 진행하게끔 처리예정
const payment = [
  {label: '직거래', value: '직거래'},
  {label: '택배거래', value: '택배거래'},
  {label: '안전거래', value: '안전거래'},
];

const Bidding = props => {
  const {
    route: {params},
  } = props;
  useEffect(() => {
      getType()    
  }, [])
  
  const {member} = useSelector(state => state.login);
  const [isvisible, setIsvisible] = useState(false);
  const [mt_idx, setMt_idx] = useState(member.mt_idx);
  const [idx, setIdx] = useState(params.idx);
  const [bidprice, setBidprice] = useState(0);
  const [pt_deal_type, setPt_deal_type] = useState('');
  const [defaultdealtype,setDeafultDealtype] = useState([]);
  const getType =async() => {
    try{
      const form = new FormData();
      form.append('method', 'proc_deal_type');
      form.append('pt_idx',params.idx);
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data:{result,message,item}
      } = api;
      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        setDeafultDealtype(item&&item.deal_type.map((row,idx)=>{
          return {label:row,value:row}
        }))
      
      }
    }catch(e){

    }
  }
  const pressbidding = async () => {
    try {
      const form = new FormData();
      if (parseInt(bidprice) <= 0) return;
      if (!pt_deal_type) return;
      form.append('method', 'proc_product_tender');
      form.append('mt_idx', mt_idx);
      form.append('pt_idx', idx);
      form.append('pt_deal_type', pt_deal_type);
      form.append('td_price', bidprice);
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data:{result,message,item}
      } = api;
      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        props.navigation.navigate('ChatDetail',{
          mt_idx:item
        })
      }
    } catch(e) {
      console.log(e);
      
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DetailHead title="입찰하기" />
      <View style={{padding: 20, flex: 1}}>
        <View
          style={{
            paddingBottom: 10,
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}>
          <Product {...props} />
        </View>
        <View style={{borderWidth: 1, borderColor: '#eee', borderRadius: 10}}>
          <Text
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 20,
            }}>
            입찰정보
          </Text>
          <View style={{padding: 12}}>
            <Text
              style={{
                paddingBottom: 6,
                fontSize: 13,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 16,
              }}>
              입찰금액
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 6,
                lineHeight: 20,
                height: 30,
                paddingVertical: 0,
                paddingHorizontal: 10,
                marginBottom: 12,
                fontFamily: 'NotoSansKR-Medium',
                fontSize: 12,
                color: '#000',
              }}
              placeholder="210,000원"
              placeholderTextColor="#C9C9C9"
              keyboardType="numeric"
              onChangeText={text => setBidprice(text)}
            />
            <Text
              style={{
                paddingBottom: 6,
                fontSize: 13,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 16,
              }}>
              거래유형
            </Text>
            <View style={{width: 150}}>
              <DefaultPicker
                placeholder="거래방식 선택"
                picker={defaultdealtype}
                onChange={setPt_deal_type}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#477DD1',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                width: '50%',
                height: 57,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 1,
                borderRightColor: '#fff',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'NotoSansKR-Bold',
                  lineHeight: 20,
                }}>
                취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsvisible(true)}
              style={{
                width: '50%',
                height: 57,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => pressbidding()}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: 'NotoSansKR-Bold',
                  lineHeight: 20,
                }}>
                입찰하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        visible={isvisible}
        transparent={true}
        style={{flex: 1}}
        animationType="fade"
        onRequestClose={() => setIsvisible(false)}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              paddingVertical: 30,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            <Icon name="alert-circle" size={20} color="#447DD1" />
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'NotoSansKR-Regular',
                lineHeight: 20,
                paddingLeft: 10,
              }}>
              상품 주문, 입찰을 하시기 위해 휴대폰 인증이 우선시 되어야 합니다.
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Bidding;
