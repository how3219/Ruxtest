import React,{useEffect,useState} from 'react';
import {SafeAreaView, View, ScrollView, TouchableOpacity, Text, StyleSheet,Linking} from 'react-native';
import API_CALL from '../ApiCall';
import Header, {DetailHead} from '../components/header';
import Footer from '../components/footer';
import Product from '../components/product';
import Icon from 'react-native-vector-icons/Ionicons';
const url = 'http://dmonster1566.cafe24.com'
const path = '/json/proc_json.php'
const EstCheck = (props) => {
  const {route:{params}} = props
  const [estitem,setEstItem] = useState([])
  useEffect(() => {
    getEstCheck()
  }, [])
  const getEstCheck = async() => {
    const form = new FormData;
    form.append('method','proc_my_estimate_view')
    form.append('idx',params.idx)
    const api = await API_CALL(url+path, form, true)
    const {data:{result,item,message}} = api;
    if(result === "0") return Alert.alert("",message)
    if(result === "1"){
      setEstItem(item[0])
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
          <View style={{borderWidth:1,borderColor:'#eee',borderRadius:10,marginBottom:20,}}>
            <Text style={{borderBottomWidth:1,borderBottomColor:'#eee',padding:12,fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20, }}>
              내 견적
            </Text>
            <View style={{padding:12,}}>
             <View style={styles.textbox}>
                <Text style={styles.texta}>입찰금액</Text>
                <Text style={styles.texta}>{estitem.td_price}</Text>
              </View>
              <View style={styles.textbox}>
                <Text style={styles.texta}>거래유형</Text>
                <Text style={styles.textb}>{estitem.pt_deal_type}</Text>
              </View>
              <View style={styles.textbox}>
                <Text style={styles.texta}>직거래 가능 지역</Text>
                <Text style={styles.textb}>{estitem.pt_direct_sigugun}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems: 'center'}}>
                <Text style={styles.texta}>입찰입시</Text>
                <Text style={styles.textb}>{estitem.pt_selling_edate}</Text>
              </View>
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
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,paddingVertical:15,borderBottomWidth:1,borderBottomColor:'#eee',borderTopWidth:1,borderTopColor:'#eee'}} onPress={()=>Linking.openURL('https://thecheat.co.kr/rb/?mod=_search')}>
          <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20}}>구매 전 안전하게 더치트 조회 해보기</Text>
          <Icon name="chevron-forward" size={20} color="#000"/>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
})

export default EstCheck;
