import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {DefaultHead} from '../components/header';
import Icon from 'react-native-vector-icons/Ionicons';
import TransList from '../components/transitem';
import API_CALL from '../ApiCall';
export const Width = Dimensions.get('window').width;
export const Threebox = Width / 3 - 17;
export const Box = Width / 2 - 22;

const Transaction = () => {
  const [trans, setTrans] = useState([
    {
      id: '1',
      title: '구매',
      state: true,
    },
    {
      id: '2',
      title: '판매',
      state: false,
    },
    {
      id: '3',
      title: '정산',
      state: false,
    },
  ]);

  //1-입찰중 2-거래중 3-거래완료
  const [dealtype, setDealtype] = useState('2');
  const [transid, setTransId] = useState('1');
  const {member} = useSelector(state => state.login);
  useEffect(() => {
    getdeallist();
  }, [dealtype, transid]);
  const getdeallist = async () => {
    // console.log(id);
    console.log(979797, transid);
    console.log(5454554, dealtype);

    let form = new FormData();
    if (transid === '1') {
      form.append('method', 'proc_my_deal_buy');
      form.append('mt_idx', member.mt_id);
      form.append('td_status', dealtype);
    } else if (transid === '2') {
      form.append('method', 'proc_my_deal_sell');
      form.append('mt_idx', member.mt_id);
      form.append('td_status', dealtype);
    } else if (transid === '3') {
      form.append('method', 'proc_my_deal_accounts');
      form.append('mt_idx', member.mt_id);
    }
    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    const api = await API_CALL(url + path, form, true);
    const {data} = api;
    console.log(data);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DefaultHead />
      <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', height: 60}}>
          <Text style={{fontSize: 18, fontFamily: 'NotoSansKR-Bold'}}>
            거래내역
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          {trans.map((element, key) => (
            <TouchableOpacity
              key={key}
              onPress={async () => {
                setTrans(
                  trans.map(data => {
                    if (data.id === element.id) {
                      return {...data, state: true};
                    } else {
                      return {...data, state: false};
                    }
                  }),
                ),
                  await setTransId(element.id);
                getdeallist();
              }}
              style={{
                width: Threebox,
                height: 35,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#447DD1',
                backgroundColor: element.state === false ? '#fff' : '#447DD1',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NotoSansKR-Medium',
                  lineHeight: 20,
                  color: element.state === false ? '#447DD1' : '#fff',
                }}>
                {element.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <TouchableOpacity
            style={{
              width: Box,
              height: 35,
              borderRadius: 8,
              borderWidth: 1,
              backgroundColor: dealtype === '2' ? '#447DD1' : '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setDealtype('2')}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 20,
                color: dealtype !== '2' ? '#447DD1' : '#fff',
              }}>
              거래중
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: Box,
              height: 35,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#447DD1',
              justifyContent: 'center',
              backgroundColor: dealtype === '3' ? '#447DD1' : '#fff',
              alignItems: 'center',
            }}
            onPress={() => setDealtype('3')}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 20,
                color: dealtype !== '3' ? '#447DD1' : '#fff',
              }}>
              거래완료
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#eee',
            borderRadius: 8,
            width: '100%',
            height: 35,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <TextInput
            placeholder="제품명을 입력해주세요."
            placeholderTextColor="#C9C9C9"
            style={{padding: 0, color: '#222'}}
          />
          <TouchableOpacity style={{width: 24, height: 24}}>
            <Icon name="search" size={24} color="#447DD1" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <TransList />
      </View>
    </SafeAreaView>
  );
};

export default Transaction;
