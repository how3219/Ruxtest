import React, {useState,useEffect} from 'react';
import {SafeAreaView, View, ScrollView, TouchableOpacity, Text, StyleSheet,Modal, Alert, TextInput} from 'react-native';
import Header, {DetailHead} from '../components/header';
import Footer from '../components/footer';
import Product from '../components/product';
import API_CALL from '../ApiCall';
import Icon from 'react-native-vector-icons/Ionicons';
const url = 'http://dmonster1566.cafe24.com'
const path = '/json/proc_json.php'
const EstDetail = (props) => {
  const [isvisible, setIsvisible] = useState(false);
  const [detailItem,setDetailItem] = useState([])
  const [price,setPrice] = useState('')
  const {route:{params},navigation} = props;
  useEffect(() => {
    getEstimateDetail()
  }, [])
  const getEstimateDetail = async() => {
    try{
      const form = new FormData;
      form.append('method','proc_my_estimate_detail')
      form.append('idx',params.idx)
      
      const api = await API_CALL(url+path, form, true)
      const {data:{result,item}} = api;

      if(result === "0") return Alert.alert("title","failed")
      if(result === "1"){
        
        props.route.params = {...props.route.params,...item[0]}
        setPrice(item[0].td_price)
        setDetailItem(item[0])
      }
    }catch(e){
      Alert.alert('제목','EstimateDetail')
    }
  }
  const cancleEstimate = async() => {
    try{
        const form = new FormData;
        form.append('method','proc_my_estimate_cancle')
        form.append('idx',detailItem.idx)
        const api = await API_CALL(url+path, form, true)
        const {data:{result,message}} = api;
        if(result==='0'){ Alert.alert('title',message)}
        else if(result==='1'){
          navigation.goBack();
        }
    }catch(e){

    }
  }
  const estmateModify = async() => {
    try{
      const form = new FormData;
      form.append('method','proc_my_estimate_modify')
      form.append('idx',detailItem.idx)
      form.append('td_price',price)
      form.append('pt_deal_type',detailItem.pt_deal_type)
      const api = await API_CALL(url+path, form, true)
      const {data:{result,message}} = api;
      if(result==='0'){ Alert.alert('title',message)}
      else if(result==='1'){
        
      }
  }catch(e){

  }
  }
  return(
    <SafeAreaView style={{flex:1,backgroundColor: '#fff'}}>
      <DetailHead title="견적 상세 정보"/>
      <ScrollView style={{}}>
      {/* 내 견적*/}
        <View style={{padding:20,}}>
          <View style={styles.estcont}>
            <Product {...props}/>
          </View>
          <View style={styles.estbox}>
            <Text style={{borderBottomWidth:1,borderBottomColor:'#eee',padding:12,fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20, }}>
              내 견적
            </Text>
            <View style={{padding:12,}}>
              <View style={styles.textbox}>
                <Text style={styles.texta}>입찰금액</Text>
                <Text style={styles.textb}>{price}</Text>
              </View>
              <View style={styles.textbox}>
                <Text style={styles.texta}>거래유형</Text>
                <Text style={styles.textb}>{detailItem.pt_deal_type}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems: 'center'}}>
                <Text style={styles.texta}>입찰입시</Text>
                <Text style={styles.textb}>{detailItem?detailItem.td_wdate:0}</Text>
              </View>
            </View>
            <TouchableOpacity
            onPress={()=> navigation.navigate('EstCheck',{
              idx:detailItem.idx,
              pt_title: detailItem.pt_title,
              pt_selling_edate: detailItem.pt_selling_edate,
              dday: detailItem.dday,
              pt_image1: detailItem.pt_image1,
            })}
            style={{backgroundColor:'#EBEBEB',height:44,alignItems: 'center',justifyContent:'center',}}>
              <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium'}}>견적서 보기</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row',overflow: 'hidden',borderBottomLeftRadius: 10,borderBottomRightRadius: 10,}}>
                <TouchableOpacity 
                style={styles.btnbox}
                onPress={() => setIsvisible(true)}>
                    <Text style={styles.btncont}>견적 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnbox} onPress={()=>cancleEstimate()}>
                    <Text style={styles.btncont}>견적 취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:57,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={styles.btncont}>채팅 하기</Text>
                </TouchableOpacity>
            </View>
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
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,paddingVertical:15,borderBottomWidth:1,borderBottomColor:'#eee',borderTopWidth:1,borderTopColor:'#eee'}}>
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
  estcont: {
    paddingBottom:10,
    marginBottom:15,
    borderBottomWidth:1,
    borderBottomColor:'#eee'
  },
  estbox:{
    borderWidth:1,
    borderColor:'#eee',
    borderRadius:10,
    marginBottom:20,
  },
  textbox: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
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
  btnbox: {
    flex:1,
    backgroundColor:'#477DD1',
    height:57,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth:1,
    borderRightColor:'#fff'
  },
  btncont: {
    fontSize:16,
    fontFamily:'NotoSansKR-Bold',
    color:'#fff'
  }
})

export default EstDetail;
