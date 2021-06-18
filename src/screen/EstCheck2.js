import React,{useEffect,useState} from 'react';
import {SafeAreaView, View, ScrollView, TouchableOpacity, Text, StyleSheet,TextInput,Alert,Modal,Linking} from 'react-native';
import { useSelector } from 'react-redux';
import Header, {DetailHead} from '../components/header';
import Footer from '../components/footer';
import Product from '../components/product';
import {DefaultPicker} from '../components/Select';
import API_CALL from '../ApiCall';
import Icon from 'react-native-vector-icons/Ionicons';

const type=[
  {label:'직거래' , value:'직거래'},
  {label:'택배거래' , value:'택배거래'},
  {label:'안전거래' , value:'안전거래'},
]
const url = 'http://dmonster1566.cafe24.com';
const path = '/json/proc_json.php';
const EstCheck2 = (props) => {
  const { member } = useSelector(state => state.login);
  const {route:{params},navigation} = props;
  const [detailItem,setDetailItem] = useState([])
  const [price,setPrice] = useState('')
  const [dealtype,setDealType] = useState('')
  const [isvisible, setIsvisible] = useState(false);
  const getEstimate = async() => {
    try{
      const form = new FormData;
      form.append('method','proc_estimate_detail');
      form.append('idx',params.td_idx)
      
      const api = await API_CALL(url+path, form, true)      
      const {data:{result,item}} = api;
      if(result === "0") return Alert.alert("","failed")
      if(result === "1"){
        props.route.params = {...props.route.params,...item[0]}
        setPrice(item[0].td_price)
        setDealType(item[0].pt_deal_type)
        setDetailItem(item[0])
      }
    }catch(e){
      Alert.alert('',e)
    }
  }

  useEffect(() => {
      getEstimate()
  }, [])

  const estmateModify = async() => {
    try{
      const form = new FormData;
      let money = price;
      if(money.indexOf(',')!==-1){
        money = money.replace(/,/g, '');
      }
      form.append('method',member.mb_type==="B"?'proc_estimate_change':'proc_estimate_sell_change');
      form.append('idx',params.td_idx)
      form.append('mt_idx',member.mt_idx)
      form.append('td_price',money)
      form.append('pt_deal_type',dealtype)
      console.log(form)
      const api = await API_CALL(url+path, form, true);
      
      const {data:{result,message,item}} = api;      
      if(result==='0'){ Alert.alert('',message)}
      else if(result==='1'){
        navigation.goBack();
      }
    }catch(e){
      Alert.alert('',message)
    }
  }
  return(
    <SafeAreaView style={{flex:1,backgroundColor: '#fff'}}>
      <DetailHead title="견적서 확인"/>
      <ScrollView style={{}}>
      {/* 내 견적*/}
        <View style={{padding:20,}}>
          <View style={{paddingBottom:10,marginBottom:15,borderBottomWidth:1,borderBottomColor:'#eee'}}>
            <Product {...props}/>
          </View>
          <View style={{borderWidth:1,borderColor:'#eee',borderRadius:10,marginBottom:20,overflow:'hidden'}}>
            <Text style={{borderBottomWidth:1,borderBottomColor:'#eee',padding:12,fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20, }}>입찰정보 </Text>
            <View style={{padding:12,}}>
             <View style={{}}>
                <Text style={styles.texta}>입찰금액</Text>
                <TextInput
                placeholder="210,000원"
                placeholderTextColor="#C9C9C9"
                style={{
                  borderWidth:1,
                  borderColor:'#eee',
                  borderRadius:8,
                  height:35,
                  padding:0,
                  paddingLeft:10,
                  marginVertical:10,
                  color:'#000'
                }}
                value={price}
                keyboardType="numeric"
                onChangeText={text=>setPrice(text)}
                editable={params&&params.success?false:true}
                />
              </View>
              <View style={styles.textbox}>
                <View style={{width:'auto'}}>
                  <Text style={styles.texta}>거래유형</Text>
                  <View style={{marginVertical:10}}>
                    <DefaultPicker placeholder="거래유형 선택" picker={type} onChange={setDealType} value={dealtype} disabled={params&&params.success?true:false}/>
                  </View>
                </View>
                <View style={{}}>
                  <Text style={styles.texta}>입찰입시</Text>
                  <Text style={[styles.textb, {marginVertical:10}]}>{detailItem.td_wdate}</Text>
                </View>
              </View>
            </View>
            {
              params&&!params.success?
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
              <TouchableOpacity 
              style={{
                flex:1,
                backgroundColor:'#447DD1',
                justifyContent:'center',
                alignItems:'center',
                height:58,
                borderRightWidth:1,
                borderRightColor:'#fff',
              }}
              onPress={()=>navigation.goBack()}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',color:'#fff'}}>취소</Text>
              </TouchableOpacity><TouchableOpacity 
              style={{
                flex:1,
                backgroundColor:'#447DD1',
                justifyContent:'center',
                alignItems:'center',
                height:58,                
              }}
              onPress={()=>setIsvisible(true)}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',color:'#fff'}}>입찰하기</Text>
              </TouchableOpacity>
            </View>:null
            }
          </View>
          {/* 내 견적 끝 */}
          <Text style={{fontSize:14,fontFamily:'NotoSansKR-Bold',lineHeight:20,paddingBottom:10,}}>구매 시 유의사항</Text>
          <View style={{padding:12,borderRadius:7,backgroundColor:'#F8F8F8'}}>
            <Text style={{fontSize:13,paddingBottom:7,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>안전거래가 가능한 상품인지 확인하셨나요?</Text>
            <Text style={{fontSize:13,paddingBottom:7,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>계좌이체시 인증된 계좌번호로 거래하시는지 확인하셨나요?</Text>
            <Text style={{fontSize:13,paddingBottom:7,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>구매 하려는 상품의 상세사진 및 상세내용에 대해 확인하셨나요?</Text>
            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>판매자와의 충분한 합의를 하셨나요?</Text>
          </View>
        </View>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,paddingVertical:15,borderBottomWidth:1,borderBottomColor:'#eee',borderTopWidth:1,borderTopColor:'#eee'}} onPress={()=>Linking.openURL('https://thecheat.co.kr/rb/?mod=_search')}>
          <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20}}>구매 전 안전하게 더치트 조회 해보기</Text>
          <Icon name="chevron-forward" size={20} color="#000"/>
        </TouchableOpacity>
      </ScrollView>
      <Modal
      visible={isvisible}
      transparent={true}
      style={{flex:1}}
      animationType="fade"
      onRequestClose={() => setIsvisible(false)}
      >
        <View style={{
          position:'absolute',
          top:0,left:0,bottom:0,right:0,
          backgroundColor:'rgba(0,0,0,0.7)',
          justifyContent:'flex-start',
        }}>
          <View style={{
            paddingVertical:30,
            backgroundColor:'#fff',
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:20,
          }}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,paddingBottom:6,}}>견적 수정</Text>
            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20,paddingBottom:10}}>입력 하신 금액으로 견적을 수정하시겠습니까?</Text>
            <View style={{
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
            }}>
              <TouchableOpacity 
              style={{
                backgroundColor:'#447DD1',
                borderRadius:8,
                height:35,
                width:64,
                justifyContent:'center',
                alignItems:'center',
                margin:5,
              }}
              onPress={() => setIsvisible(false)}>
                <Text style={{
                  fontSize:13,
                  fontFamily:'NotoSansKR-Regular',
                  color:'#fff',
                  lineHeight:20,
                }}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={{
                backgroundColor:'#447DD1',
                borderRadius:8,
                height:35,
                width:64,
                justifyContent:'center',
                alignItems:'center',
                margin:5,
              }}
              onPress={()=>estmateModify()}>
                <Text style={{
                  fontSize:13,
                  fontFamily:'NotoSansKR-Regular',
                  color:'#fff',
                  lineHeight:20,
                }}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textbox: {
    flex:1,
    justifyContent:'space-between',
    paddingBottom:10
  },
  texta: {
    fontSize:13,
    lineHeight:20,
    fontFamily:'NotoSansKR-Medium'
  },
  textb: {
    fontSize:13,
    lineHeight:20,
    fontFamily:'NotoSansKR-Regular'
  },
})

export default EstCheck2;
