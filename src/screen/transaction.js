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
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {DefaultHead} from '../components/header';
import Icon from 'react-native-vector-icons/Ionicons';
import TransList from '../components/transitem';
import API_CALL from '../ApiCall';
export const Width = Dimensions.get('window').width;
export const Threebox = Width / 3 - 17;
export const Box = Width / 2 - 22;

const Transaction = (props) => {
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
  // useEffect(() => {
  //   if(isFocused){
  //     firstgetdeallist();
  //   }
  // }, [isFocused])
  //1-입찰중 2-거래중 3-거래완료
  const [dealtype, setDealtype] = useState('1');
  const [transid, setTransId] = useState('1');
  const [itemlist,setItemlist] = useState([])
  const [search,setSarch] = useState('')
  const {member} = useSelector(state => state.login);
  useEffect(() => {
    getdeallist();
   
  }, [dealtype, transid]);
  const getdeallist = async () => {
    let form = new FormData();
    if (transid === '1') {
      form.append('method', 'proc_my_deal_buy');
      form.append('mt_idx', member.mt_idx);
      search?form.append('search',search):null
      form.append('td_status', dealtype);
    } else if (transid === '2') {
      form.append('method', 'proc_my_deal_sell');
      form.append('mt_idx', member.mt_idx);
      search?form.append('search',search):null
      form.append('td_status', dealtype);
    } else if (transid === '3') {
      form.append('method', 'proc_my_deal_accounts');
      form.append('mt_idx', member.mt_idx);
      search?form.append('search',search):null
      if(member.mt_seller!=='Y'){
        return Alert.alert('','판매자가 아닙니다.')
      }
    }
    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    const api = await API_CALL(url + path, form, true);
    const {data:{result,item,message}} = api;
    if(result==='0')Alert.alert('',message)
    else if(result==='1'){     
        setItemlist([])
        setItemlist(item)
    }    
  };
  const onPresstrans = (el) => {
    if(member.mt_seller==='N'){
      if(el.id==='3'){
        return Alert.alert('','판매자 신청이 되지 않았습니다.')
      }      
    }
    setTrans(
      trans.map(data => {
        if (data.id === el.id) {
          return {...data, state: true};
        } else {
          return {...data, state: false};
        }
      }),
    ),
    setTransId(el.id);
    setDealtype('1');
  }
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
          {trans?.map((element, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => onPresstrans(element)}
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
            {
            transid!=='3'?
            <>
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
          </>:
          <View style={{backgroundColor:'#eee',flex:1,flexDirection:'row',justifyContent: 'space-between',padding:5}}>
          <Text style={{
                fontSize: 14,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 20,}}>정산계좌</Text>
          <Text style={{
                fontSize: 14,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 20,}}>{itemlist&&itemlist.length>0?`${itemlist[0].mt_bank} ${itemlist[0].mt_account}`:'등록된 계좌가 없습니다.'}</Text>
          </View>
          }
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
            value={search}
            onChangeText={text=>setSarch(text)}
          />
          <TouchableOpacity style={{width: 24, height: 24}} onPress={()=>getdeallist()}>
            <Icon name="search" size={24} color="#447DD1" />
          </TouchableOpacity>
        </View>
      </View>
    
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <TransList 
            item={itemlist}
            transid={transid}
            dealtype={dealtype}
            />
        </View>
    </SafeAreaView>
  
  );
};

export default Transaction;
