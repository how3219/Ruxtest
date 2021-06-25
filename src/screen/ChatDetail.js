import React, { useEffect, useState, createRef } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TextInput, FlatList, Modal, Dimensions, Alert } from 'react-native';
import API_CALL from '../ApiCall';
import Header, { ChatDetailHeader } from '../components/header';
import ChatCont, { ChatLeft, ChatRight, ChatDateLine, DealRequestLeft, RightDealFalse, LeftDealFalse, DealTrue, DealRequestRight } from '../components/ChatCont';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import { DefaultPicker } from '../components/Select';
import DocumentPicker from 'react-native-document-picker';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const PADDING = 20;
const StatWidth = (Width - PADDING * 2 - 40) / 3;
const PhotoWidth = (Width - PADDING * 2 - 20) / 2;
const PhotoHeight = PhotoWidth - 40;
const defaultdelivery = [
  { label: '천일택배', value: 'kr.chunilps' },
  { label: 'CJ대한통운', value: 'kr.cjlogistics' },
  { label: 'CU 편의점택배', value: 'kr.cupost' },
  { label: 'GS Postbox 택배', value: 'kr.cvsnet' },
  { label: 'CWAY (Woori Express)', value: 'kr.cway' },
  { label: '대신택배', value: 'kr.daesin' },
  { label: '우체국 택배', value: 'kr.epost' },
  { label: '한의사랑택배', value: 'kr.hanips' },
  { label: '한진택배', value: 'kr.hanjin' },
  { label: '합동택배', value: 'kr.hdexp' },
  { label: '혹픽', value: 'kr.homepick' },
  { label: '한서호남택배', value: 'kr.honamlogis' },
  { label: '일양로지스', value: 'kr.ilyanglogis' },
  { label: '경독택배', value: 'kr.kdexp' },
  { label: '건영택배', value: 'kr.kunyoung' },
  { label: '로젠택배', value: 'kr.logen' },
  { label: '롯데택배', value: 'kr.lotte' },
  { label: 'SLX', value: 'kr.slx' },
  { label: '성원글로벌카고', value: 'kr.swgexp' },
];
const ChatDetail = (props) => {
  const isfocused = useIsFocused();
  const { navigation, route: { params } } = props;
  const { member } = useSelector(state => state.login);
  const [nickname, setNickname] = useState('');
  const [chatlist, setChatList] = useState([]);
  const [lastStauts, setLastStatus] = useState('3');
  const [msg, setMessage] = useState('');
  const [usedelivery, setUseDelivery] = useState(false);
  const [selectdelivery, setSelectDelivery] = useState('');
  const [invoicenum, setInvoiceNum] = useState('');
  const [dealtype, setDealType] = useState('')
  const [pt_idx, setPtIdx] = useState('');
  const [deal_id, setDealId] = useState('');
  const [ot_code, setOtCode] = useState('');
  const [order_idx,setOrderIdx] = useState('');
  const [mt_license, setMt_license] = useState('');
  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent?.setOptions({ tabBarVisible: false });
    return () => parent?.setOptions({ tabBarVisible: true });
  }, []);
  useEffect(() => {
    if (isfocused) {
      getChatDetail()
    }
  }, [isfocused])


  const getChatDetail = async () => {
    try {
      const form = new FormData;
      form.append('method', 'proc_chating_list');
      form.append('mt_idx', params.mt_idx)
      form.append('mt_id', member.mt_idx)
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, item, message }
      } = api;
      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        setDealType(item[item.length - 1].pt_deal_type)
        setNickname(member.mt_nickname)
        setChatList(item)
        setPtIdx(item[item.length - 1].pt_idx)
        setDealId(item[item.length - 1].deal_id)
        setLastStatus(item[item.length - 1].td_status)
        setOtCode(item[item.length - 1].ot_code)
        setOrderIdx(item[item.length - 1].order_idx)
      }
    } catch (e) {

    }
  }
  const sendmessage = async () => {
    try {
      const form = new FormData;
      form.append('method', 'proc_chat_add');
      form.append('m_idx', member.mt_idx)
      form.append('mt_idx', params.mt_idx)
      form.append('msg', msg)

      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, message }
      } = api;
      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        setMessage('');
        getChatDetail();
      }
    } catch (e) {

    }
  }
  const recComplet = async() => {
    try {
      const form = new FormData;
      form.append('method', 'proc_buy_receive_status');
      form.append('idx', params.td_idx);
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, message, item }
      } = api;

      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        getChatDetail();
      }
    } catch (e) {
      console.log('recComplet', e)
    }
  }
  const receipt = async () => {
    try {
      const form = new FormData;
      form.append('method', member.mb_type === "B" ? 'proc_buy_end_status' : 'proc_sell_end_status');
      form.append('idx', params.td_idx);
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, message, item }
      } = api;

      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        getChatDetail();
      }
    } catch (e) {
      console.log('receipt', e)
    }
  }
  const Proceed = async () => {
    try {
      const form = new FormData;
      form.append('method', member.mb_type === "B" ? 'proc_buy_ing_status' : 'proc_sell_ing_status');
      form.append('idx', params.td_idx)
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, message, item }
      } = api;
      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        getChatDetail();
      }
    } catch (e) {
      console.log('proceed', e)
    }
  }
  const reject = async () => {
    try {
      const form = new FormData;
      form.append('method', member.mb_type === "B" ? 'proc_buy_cancle_status' : 'proc_sell_cancle_status');
      form.append('idx', params.td_idx)
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, message }
      } = api;

      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        getChatDetail();
      }
    } catch (e) {
      console.log('reject', e)
    }
  }
  const filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let file = ({
        uri: res.uri,
        type: res.type,
        name: res.name,
      });
      const form = new FormData;
      form.append('method', 'proc_chat_add');
      form.append('m_idx', member.mt_idx);
      form.append('mt_idx', params.mt_idx);
      form.append('bf_file', file);
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, message, item }
      } = api;
      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        getChatDetail();
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const pressInvoice = async () => {
    try {
      const form = new FormData;
      form.append('method', 'proc_delivery_add2');
      form.append('td_idx', params.td_idx)
      form.append('delivery_value', selectdelivery)
      form.append('delivery_number', invoicenum)
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, message, item }
      } = api;
      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        resetInvoice()
        getChatDetail();
      }
    } catch (e) {
      console.log('reject', e)
    }
  }
  const resetInvoice = () => {
    setUseDelivery(false)
  }
  const agree = async () => {
    try {
      const form = new FormData;
      form.append('method', member.mb_type === "B" ? 'proc_buy_cancle_agree' : 'proc_sell_cancle_agree');
      form.append('idx', params.td_idx)
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, item, message }
      } = api;
      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        navigation.goBack()
      }
    } catch (e) {
      console.log('agree', e)
    }
  }
  const rejectcancel = async () => {
    try {
      const form = new FormData;
      form.append('method', member.mb_type === "B" ? 'proc_buy_noting_status' : 'proc_sell_noting_status');
      form.append('idx', params.td_idx)
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: { result, message }
      } = api;

      if (result === '0') return Alert.alert('', message);
      if (result === '1') {
        getChatDetail();
      }
    } catch (e) {
      console.log('rejectcancel', e)
    }
  }
  const Statusrender = () => {
    if (lastStauts === '1') {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('EstCheck2', {
            td_idx: params.td_idx
          })}
          style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>견적서 확인</Text>
        </TouchableOpacity>
      )
    } else if (lastStauts === '2') {
      if (member.mb_type === "B") {
        if (dealtype === '안전거래') {
          return (
            <TouchableOpacity
              onPress={() => navigation.push('PurchaseOrder', { idx: pt_idx,chat_ot_code:ot_code,dealtype:'안전거래' })}
              style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center',  borderRightWidth: 1, borderRightColor: '#fff' }}>
              <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>주문서 발송</Text>
            </TouchableOpacity> 
          )
        } else if (dealtype === '택배거래') {
          return (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.push('DeliveryCheck')}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1, borderRightWidth: 1, borderRightColor: '#fff' }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>운송장 조회</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => recComplet()}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>수령완료</Text>
              </TouchableOpacity>
            </View>
          )
        } else if (dealtype === '직거래') {
          return (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EstCheck2', {
                  td_idx: params.td_idx
                })}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center',flex:1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>견적서 확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => recComplet()}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>수령완료</Text>
              </TouchableOpacity>
            </View>
          )
        }else{return (<View></View>)}
      } else if (member.mb_type === "S") {
        if (dealtype === '안전거래' || dealtype === '택배거래' ) {
          return (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EstCheck2', {
                  td_idx: params.td_idx
                })}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center',flex:1,borderRightWidth: 1, borderRightColor: '#fff' }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>견적서 확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUseDelivery(true)}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1, borderRightWidth: 1, borderRightColor: '#fff' }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>송장 번호 발송</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => reject()}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>거래취소</Text>
              </TouchableOpacity>
            </View>
          )
        } else if (dealtype === '직거래') {
          return (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EstCheck2', {
                  td_idx: params.td_idx
                })}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center',flex:1,borderRightColor:'#fff',borderRightWidth:1}}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>견적서 확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => reject()}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>거래취소</Text>
              </TouchableOpacity>
            </View>
          )
        }else{
          return(<View></View>)
        }
      }

    } else if (lastStauts === '3') {
      if (member.mb_type === "B") {
        if (dealtype === '안전거래' || dealtype === '즉시구매') {
          return (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.push('DeliveryCheck')}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1, borderRightWidth: 1, borderRightColor: '#fff' }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>운송장 조회</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => recComplet()}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>수령완료</Text>
              </TouchableOpacity>
            </View>
          )
        } else if (dealtype === '택배거래' || dealtype === '직거래') {
          return (
            <TouchableOpacity
              onPress={() => recComplet()}
              style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>수령완료</Text>
            </TouchableOpacity>
          )
        }
      } else if (member.mb_type === "S") {
        if(dealtype!=='즉시거래'){
          return (
            <TouchableOpacity
            onPress={() => navigation.navigate('OrderInformation', {
              idx: order_idx,
              transid:3
            })}
              style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>주문서 확인</Text>
            </TouchableOpacity>
          )
        }else{
          <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EstCheck2', {
                  td_idx: params.td_idx
                })}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center',flex:1,borderRightWidth: 1, borderRightColor: '#fff' }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>견적서 확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUseDelivery(true)}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1, borderRightWidth: 1, borderRightColor: '#fff' }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>송장 번호 발송</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => reject()}
                style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>거래취소</Text>
              </TouchableOpacity>
            </View>
        }
      }
    } else if (lastStauts === '5') {
      if (member.mb_type === "B") {
        return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.push('AppraiseWrite',{regi_id:pt_idx})}
              style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1, borderRightWidth: 1, borderRightColor: '#fff' }}>
              <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>감정신청</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.push('ReviewWrite', { pt_idx, deal_id, ot_code,success:true })}
              style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>리뷰 작성</Text>
            </TouchableOpacity>
          </View>
        )
      } else if (member.mb_type === "S") {
        return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EstCheck2', {
                td_idx: params.td_idx,
                success:true
              })}
              style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center',flex:1,borderRightWidth: 1, borderRightColor: '#fff' }}>
              <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>견적서 확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.push('ReviewWrite', { pt_idx, deal_id, ot_code,success:true })}
              style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>리뷰 작성</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }else return<View></View>
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <ChatDetailHeader title="채팅" deal_id={deal_id} />
      <Modal
        transparent={true}
        animationType="fade"
        visible={usedelivery}
        onRequestClose={() => setUseDelivery(false)}>
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
              padding: 15,
              backgroundColor: 'white'
            }}>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>송장 번호 발송</Text>
            </View>
            <View>
              <Text >택배사</Text>
              <DefaultPicker picker={defaultdelivery} placeholder="배송사선택()" onChange={setSelectDelivery} />
            </View>
            <View>
              <Text style={{ marginVertical: 5 }}>송장번호</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 6,
                  lineHeight: 20,
                  height: 36,
                  paddingVertical: 0,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                  marginBottom: 12,
                  fontFamily: 'NotoSansKR-Medium',
                  fontSize: 12,
                  color: '#000',
                }}
                onChangeText={text => setInvoiceNum(text)} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{ paddingHorizontal: 30, paddingVertical: 10, marginBottom: 10, backgroundColor: '#477DD1', borderRadius: 50, marginRight: 20 }} onPress={() => setUseDelivery(false)}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingHorizontal: 30, paddingVertical: 10, marginBottom: 10, backgroundColor: '#477DD1', borderRadius: 50 }} onPress={() => pressInvoice()}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        style={{ flex: 1, }}
        data={chatlist}
        inverted={true}
        renderItem={({ item, index }) =>
          <ChatItem
            item={item}
            check={index === chatlist.length - 1 || ((index !== 2 && chatlist[(chatlist.length - 2) - index].chat_date.split(' ')[0] !== chatlist[(chatlist.length - 1) - index].chat_date.split(' ')[0]) == true)}
            nickname={nickname}
            Proceed={Proceed}
            reject={reject}
            agree={agree}
            rejectcancel={rejectcancel}
            td_idx={params.td_idx} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
      {/* <ScrollView style={{flex:1}}>
            <View style={{paddingHorizontal: 20,}}>
              <ChatDateLine date="2021년 1월 11일 월요일" />
              <ChatLeft user="nappeni" message="안녕하세요."/>
              <ChatRight message="안녕하세요."/>
              <ChatDateLine date="2021년 1월 12일 화요일" />
              <DealRequest
              user="nappeni"
              mine="yoru123"
              estimate="500,000"
              dealtype="택배거래 진행"
              />
              <ChatRight message="구매자 yoru123 님께서 거래요청을 거절하셨습니다."/>
              <DealFalse user="nappeni"/>
              <DealTrue
                mine="yoru123"
                num="010-1234-5678"
                name="MAISON MARGIELA"
                price="210,000"
                dealtype="안전거래"
                size="XL"
                />
            </View>
          </ScrollView> */}
      {        
         lastStauts &&dealtype&&member.mb_type? <Statusrender />:null
      }
      <View style={{ backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 }}>
        <TouchableWithoutFeedback onPress={() => filePicker()}>
          <View style={{ backgroundColor: '#477DD1', width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center', marginRight: 10, }}>
            <Icon name="camera-alt" size={24} color="#fff" />
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#eee', borderRadius: 8, height: 42, alignItems: 'center', justifyContent: 'space-between', }}>
          <TextInput
            placeholder="메시지를 입력하세요"
            style={{ height: 42, flex: 1, fontFamily: 'NotoSansKR-Regular', padding: 0, paddingHorizontal: 10, color: '#000' }}
            onChangeText={text => setMessage(text)}
            value={msg}
          />
          <TouchableOpacity style={{ backgroundColor: '#477DD1', height: 42, width: 54, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}
            onPress={() => sendmessage()}>
            <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'NotoSansKR-Medium' }}>전송</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  ;
}
const ChatItem = ({ item: renderItems, check, nickname, reject, Proceed, agree, rejectcancel, }) => {
  return (
    <View style={{ paddingHorizontal: 20, }}>

      {check === true && <ChatDateLine date={renderItems.chat_date.split(' ')[0]} />}
      {nickname !== renderItems.mt_nickname && renderItems.push_status === 'M' && <ChatLeft user={renderItems.mt_nickname} message={renderItems.msg} chat_hour={renderItems.chat_hour} mt_image1={renderItems.mt_image1} />}
      {nickname === renderItems.mt_nickname && renderItems.push_status === 'M' && <ChatRight message={renderItems.msg} chat_hour={renderItems.chat_hour} user={renderItems.mt_nickname} />}
      {nickname !== renderItems.mt_nickname && renderItems.push_status === 'R' &&
        <DealRequestLeft
          user={renderItems.mt_nickname}
          mt_image1={renderItems.mt_image1}
          msg={renderItems.msg}
          chat_hour={renderItems.chat_hour}
          reject={reject}
          Proceed={Proceed}
          usercheck={nickname !== renderItems.mt_nickname}
        />}
      {nickname === renderItems.mt_nickname && renderItems.push_status === 'R' &&
        <DealRequestRight
          user={renderItems.mt_nickname}
          msg={renderItems.msg}
          chat_hour={renderItems.chat_hour}
          reject={reject}
          Proceed={Proceed}
          usercheck={nickname !== renderItems.mt_nickname}
        />}
      {nickname === renderItems.mt_nickname && renderItems.push_status === 'C' &&
        <RightDealFalse
          user={renderItems.mt_nickname}
          msg={renderItems.msg}
          chat_hour={renderItems.chat_hour}
          agree={agree}
          rejectcancel={rejectcancel}
          usercheck={nickname !== renderItems.mt_nickname}
        />}
      {nickname !== renderItems.mt_nickname && renderItems.push_status === 'C' &&
        <LeftDealFalse
          user={renderItems.mt_nickname}
          msg={renderItems.msg}
          chat_hour={renderItems.chat_hour}
          mt_image1={renderItems.mt_image1}
          agree={agree}
          rejectcancel={rejectcancel}
          usercheck={nickname !== renderItems.mt_nickname} />}
      {/* {<DealTrue
                mine="yoru123"
                num="010-1234-5678"
                name="MAISON MARGIELA"
                price="210,000"
                dealtype="안전거래"
                size="XL"
                />} */}
    </View>
  );
};

export default React.memo(ChatDetail);
