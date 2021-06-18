import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import {useSelector} from 'react-redux';
import Header, {DetailHead} from '../components/header';
import Product from '../components/product';
import {DefaultPicker} from '../components/Select';
import API_CALL from '../ApiCall';

const location = [
  {label: '주문자와 동일', value: '1'},
  {label: '최근배송지', value: '2'},
  {label: '신규배송지', value: '3'},
];

const payment = [
  {label: '신용카드', value: 'C'},
  {label: '가상계좌', value: 'V'},
  {label: '계좌이체', value: 'A'},
];

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Boxwidth = Width - 40;
const Boxheight = Height - 100;

const PurchaseOrder = props => {
  const {route} = props;
  const {navigation} = props;
  const {params} = route;

  const {member} = useSelector(state => state.login);

  const [orderItem, setOrderItem] = useState({});
  const [postcode, setPostcode] = useState(false);
  const [orderAdd, setOrderAdd] = useState({});
  // 즉시구매
  const [mt_idx, setMt_idx] = useState(member.mt_idx);
  const [idx, setIdx] = useState(params.idx);
  const [ot_code, setOt_code] = useState('');
  const [pt_title, setPt_title] = useState('');
  const [pt_image1, setPt_image1] = useState('');
  const [pt_price, setPt_price] = useState('');
  const [ct_delivery_default_price, setCt_delivery_default_price] = useState(
    '',
  );
  const [commission, setCommission] = useState('');
  const [total_price, setTotal_price] = useState('');
  const [ct_delivery_type, setCt_delivery_type] = useState('');
  const [mt_sms_certify, setMt_sms_certify] = useState('');
  const [ot_rname, setOt_rname] = useState('');
  const [ot_rtel, setOt_rtel] = useState('');
  const [ot_rhp, setOt_rhp] = useState('');
  const [ot_rzip, setOt_rzip] = useState('');
  const [ot_radd1, setOt_radd1] = useState('');
  const [ot_radd2, setOt_radd2] = useState('');

  //주문 폼
  const [mdi_type, setMdi_type] = useState('');
  const [ot_rmemo, setOt_rmemo] = useState('');
  const [ot_pay_type, setOt_pay_type] = useState('');
  const [ot_price, setOt_price] = useState('');
  const [ot_delivery_charge, setOt_delivery_charge] = useState('');
  const [newaddr,setNewAddr] = useState([]);
  useEffect(() => {
    getOrderItem();
    getaddress();
  }, []);
  useEffect(() => {
    if(mdi_type=='1'||mdi_type=='2'||mdi_type=='3')checktype()
  }, [mdi_type])
  const checktype = () => {
    if(mdi_type=='1'){
      autowrite()
    }else if(mdi_type=='2'){
      setOt_rname(newaddr.ot_rname)
      setOt_rtel(newaddr.ot_rtel)  
      setOt_rhp(newaddr.ot_rhp)
      setOt_rzip(newaddr.ot_rzip)
      setOt_radd1(newaddr.ot_radd1)
      setOt_radd2(newaddr.ot_radd2)
    }else if(mdi_type=='3'){
      setOt_rname('');
      setOt_rtel('');  
      setOt_rhp('');
      setOt_rzip('');
      setOt_radd1('');
      setOt_radd2('');
    }
  }
  const getaddress =async() =>{
    const form = new FormData();
    form.append('method', 'proc_member_delivery_info');
    form.append('mt_idx', mt_idx);
    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    const api = await API_CALL(url + path, form, false);
    const {
      data: {method, result, message, count, item},
    } = api;
    if(result==='0')return Alert.alert('',message)
    else if(result==='1'){
      setNewAddr(item[0])
    }
    
  }
  const getOrderItem = async () => {
    const form = new FormData();

    form.append('method', 'product_d_buy');
    form.append('mt_idx', mt_idx);
    form.append('idx', idx);  
    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    const api = await API_CALL(url + path, form, false);
    const {
      data: {method, result, message, count, item},
    } = api;
    if(result==='0')return Alert.alert('',message)
    else if(result==='1'){
      props.route.params = {...props.route.params,...item[0]}
      setOrderItem(item[0]);
    }
    
  };
  const autowrite =() => {
    setOt_rname(orderItem.ot_rname)
    setOt_rtel(orderItem.ot_rtel)  
    setOt_rhp(orderItem.ot_rhp)
    setOt_rzip(orderItem.ot_rzip)
    setOt_radd1(orderItem.ot_radd1)
    setOt_radd2(orderItem.ot_radd2)
    setOt_pay_type(orderItem.ct_delivery_type)
  }
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
    setOt_rzip(zipcode);
    setOt_radd1(fullAddress);
    setPostcode(false);
  };
  ///////////////////////////////////////////////////////////////////////////

  const OrderAdd = async () => {
    try {
      const form = new FormData();
      if (!orderItem && orderItem.length == 0)
        return Alert.alert('','주문번호를 확인해주세요.');
      form.append('method', 'proc_order_add');
      form.append('mt_idx', mt_idx);
      form.append('ot_code', orderItem.ot_code);
      form.append('mdi_type', mdi_type);
      form.append('ot_rname', ot_rname);
      form.append('ot_rtel', ot_rtel);
      form.append('ot_rhp', ot_rhp);
      form.append('ot_rzip', ot_rzip);
      form.append('ot_radd1', ot_radd1);
      form.append('ot_radd2', ot_radd2);
      form.append('ot_rmemo', ot_rmemo);
      form.append('ot_pay_type', ot_pay_type);
      form.append('ot_price', orderItem.total_price);
      form.append('ot_delivery_charge', orderItem.ct_delivery_default_price);
      params.dealtype?form.append('pt_deal_type', params.dealtype):form.append('pt_deal_type', '즉시구매')
      params.chat_ot_code?form.append('ot_code',params.chat_ot_code):orderItem.ot_code?form.append('ot_code',orderItem.ot_code):null
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: {method, result, message, count, item},
      } = api;
      if (result === '0') return Alert.alert('',message);
      if (result === '1') {
        if(params&&params.dealtype){
          Alert.alert('',message)
          navigation.goBack();
        }else{
          Alert.alert('',message)
          setOrderAdd(item[0]);
          navigation.navigate('NewPrdList');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DetailHead title="주문서 작성" />
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
              onSelected={handleComplete}
            />
          </View>
        </View>
      </Modal>
      <ScrollView style={{flex: 1}}>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Product {...props} />
        </View>
        <View
          style={{
            width: '100%',
            height: 8,
            backgroundColor: '#eee',
            borderTopWidth: 1,
            borderTopColor: '#d9d9d9',
          }}
        />
        <View style={{padding: 20, paddingBottom: 100}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 20,
              paddingBottom: 10,
            }}>
            구매자 정보
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'NotoSansKR-Bold',
                paddingRight: 20,
              }}>
              받으시는 분
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#EBEBEB',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
              }}
              onPress={()=>autowrite()}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'NotoSansKR-Medium',
                  lineHeight: 16,
                }}>
                최근 데이터 자동 입력
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.address}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 20,
                paddingBottom: 10,
              }}>
              배송지 선택
            </Text>
            <View style={{width: '100%'}}>
              <DefaultPicker
                placeholder="배송지 선택"
                picker={location}
                onChange={setMdi_type}
              />
            </View>
          </View>
          <View style={styles.inputWrap}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NotoSansKR-Medium',
                paddingBottom: 10,
                lineHeight: 17,
              }}>
              이름
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 6,
                height: 40,
                paddingHorizontal: 20,
                color: '#000',
              }}
              placeholder="홍길동"
              placeholderTextColor="#C9C9C9"
              onChangeText={text => setOt_rname(text)}
              value={ot_rname}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NotoSansKR-Medium',
                paddingBottom: 10,
                lineHeight: 17,
              }}>
              전화번호
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 6,
                height: 40,
                paddingHorizontal: 20,
                color: '#000',
              }}
              onChangeText={text => setOt_rtel(text)}
              placeholder="051-123-4567"
              keyboardType="numeric"
              placeholderTextColor="#C9C9C9"
              value={ot_rtel}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NotoSansKR-Medium',
                paddingBottom: 10,
                lineHeight: 17,
              }}>
              핸드폰
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 6,
                height: 40,
                paddingHorizontal: 20,
                color: '#000',
              }}
              onChangeText={text => setOt_rhp(text)}
              placeholder="010-1234-5678"
              keyboardType="numeric"
              placeholderTextColor="#C9C9C9"
              value={ot_rhp}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NotoSansKR-Medium',
                paddingBottom: 10,
                lineHeight: 17,
              }}>
              주소
            </Text>
            <View style={{flexDirection: 'row', paddingBottom: 10}}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#eee',
                  borderRadius: 6,
                  height: 40,
                  paddingHorizontal: 20,
                  flex: 3,
                  color: '#000',
                }}
                onChangeText={text => setOt_rzip(text)}
                value={ot_rzip}
                editable={false}
                placeholder="주소를 입력해주세요."
                placeholderTextColor="#C9C9C9"
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#477DD1',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  marginLeft: 10,
                }}
                onPress={() => setPostcode(!postcode)}>
                <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>
                  주소 검색
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 6,
                height: 40,
                paddingHorizontal: 20,
                marginBottom: 10,
                color: '#000',
              }}
              onChangeText={text => setOt_radd1(text)}
              value={ot_radd1}
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 6,
                height: 40,
                paddingHorizontal: 20,
                color: '#000',
              }}
              value={ot_radd2}
              onChangeText={text => setOt_radd2(text)}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NotoSansKR-Medium',
                paddingBottom: 10,
                lineHeight: 17,
              }}>
              전하실 말씀
            </Text>
            <TextInput
              {...props}
              style={{
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 6,
                paddingHorizontal: 20,
                textAlignVertical: 'top',
                fontSize: 13,
                color: '#000',
              }}
              numberOfLines={10}
              multiline={true}
              placeholder="내용을 입력해주세요."
              placeholderTextColor="#C9C9C9"
              onChangeText={text => setOt_rmemo(text)}
            />
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
              결제 정보
            </Text>
            <View style={{padding: 12}}>
              <View style={styles.payinfo}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 20,
                  }}>
                  거래유형
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    lineHeight: 20,
                  }}>
                  {params&&params.dealtype?'안전거래':'택배거래'}
                </Text>
              </View>
              <View style={styles.payinfo}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 20,
                  }}>
                  주문금액
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    lineHeight: 20,
                  }}>
                  {`${orderItem && orderItem.pt_price}원`}
                </Text>
              </View>
              <View style={styles.payinfo}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 20,
                  }}>
                  배송비
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    lineHeight: 20,
                  }}>
                  {`${orderItem && orderItem.ct_delivery_default_price}원`}
                </Text>
              </View>
              <View style={styles.payinfo}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 20,
                  }}>
                  수수료
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    lineHeight: 20,
                  }}>
                  {`${orderItem && orderItem.commission}원`}
                </Text>
              </View>
              <View style={styles.payinfo}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 20,
                  }}>
                  결제수단
                </Text>
                <View style={{width: 150}}>
                  <DefaultPicker
                    placeholder="결제 수단 선택"
                    picker={payment}
                    onChange={setOt_pay_type}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#EBEBEB',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 12,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'NotoSansKR-Medium',
                  lineHeight: 20,
                }}>
                총 주문 금액
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'NotoSansKR-Medium',
                  lineHeight: 20,
                }}>
                {`${orderItem && orderItem.total_price}원`}
              </Text>
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
                  }}>
                  취소
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '50%',
                  height: 57,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => OrderAdd()}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'NotoSansKR-Bold',
                  }}>
                  주문하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    paddingBottom: 10,
  },
  payinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  address: {
    paddingBottom: 10,
  },
});

export default PurchaseOrder;
