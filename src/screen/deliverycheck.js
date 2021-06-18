import React,{useState,useRef} from 'react';
import {SafeAreaView,ScrollView,View,Text,TextInput,TouchableOpacity,Alert} from 'react-native';
import Header, {DetailHead} from '../components/header';
import {DefaultPicker} from '../components/Select';
import BotLine from '../components/bottomline';
import API_CALL from '../ApiCall';
import {WebView} from 'react-native-webview'
const defaultdelivery = [
    {label:'천일택배',value:'kr.chunilps'},
    {label:'CJ대한통운',value:'kr.cjlogistics'},
    {label:'CU 편의점택배',value:'kr.cupost'},
    {label:'GS Postbox 택배',value:'kr.cvsnet'},
    {label:'CWAY (Woori Express)',value:'kr.cway'},
    {label:'대신택배',value:'kr.daesin'},
    {label:'우체국 택배',value:'kr.epost'},
    {label:'한의사랑택배',value:'kr.hanips'},
    {label:'한진택배',value:'kr.hanjin'},
    {label:'합동택배',value:'kr.hdexp'},
    {label:'혹픽',value:'kr.homepick'},
    {label:'한서호남택배',value:'kr.honamlogis'},
    {label:'일양로지스',value:'kr.ilyanglogis'},
    {label:'경독택배',value:'kr.kdexp'},
    {label:'건영택배',value:'kr.kunyoung'},
    {label:'로젠택배',value:'kr.logen'},
    {label:'롯데택배',value:'kr.lotte'},
    {label:'SLX',value:'kr.slx'},
    {label:'성원글로벌카고',value:'kr.swgexp'},
  ];

const DeliveryCheck = ({navigation}) => {
    const [invoicenum,setInvoiceNum] = useState('');
    const [dealtype,setDealType] = useState('');
    const [deliveryurl,setDeliveryUrl] = useState('');
    const [webViewHeight, setWebViewHeight] = useState(0)
    const [viewHeight,setViewHeight] = useState(0)
    const webref = useRef(null);
    const getdelivery = async() => {
        try{
            const form = new FormData;
            form.append('method','proc_delivery_search');
            form.append('ct_delivery_value',dealtype)
            form.append('ct_delivery_number',invoicenum)
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, false);
            const {
              data:{result,item,message}
            } = api;      
            if (result === '0') return Alert.alert('', message);
            if (result === '1') { 
              setDeliveryUrl(`https://tracker.delivery/#/${item[0].ct_delivery_value}/${item[0].delivery_number}`)
            } 
          } catch(e){
            console.log('getdelivery',e)
          }
    }
    const onMessage = (event) => {
      setWebViewHeight(parseInt(event.nativeEvent.data));
    }
    const onLayout = event => {
      const {height} = event.nativeEvent.layout;
      setViewHeight(parseInt(height+80))
    };
    const navigationChange = () => {
        const injectedJavaScript=`
        window.ReactNativeWebView.postMessage(
          document.body.clientHeight
        );
      `
      setTimeout(() => {
        webref.current.injectJavaScript(injectedJavaScript)
      },500);
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <DetailHead title="택배 조회"/>
            <ScrollView  contentContainerStyle={{
              flexGrow: 1,
              height: webViewHeight?webViewHeight+viewHeight:null 
            }}>
                <View style={{
                    backgroundColor:'#F8F8F8',
                    height:70,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <Text style={{fontSize:13,color:"#444",fontFamily:'NotoSansKR-Regular'}}>택배사와 운송장 번호를 이용하여 배송 조회를 하실 수 있습니다.</Text>
                </View>
                <View style={{padding:20,}} onLayout={onLayout}>
                    <View style={{paddingBottom:10,}}>
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>택배사 정보</Text>
                    </View>
                    <View style={{paddingBottom:10}}>
                        <View style={{paddingBottom:10,}}>
                            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>택배사</Text>
                        </View>
                        <View style={{}}>
                           <DefaultPicker placeholder="택배사" picker={defaultdelivery} onChange={setDealType}/>
                        </View>
                    </View>
                    <View style={{paddingBottom:20}}>
                        <View style={{paddingBottom:10,}}>
                            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>운송장 번호</Text>
                        </View>
                        <View style={{borderWidth:1,borderColor:'#eee',borderRadius:8,height:35,lineHeight:16,justifyContent:'center',paddingHorizontal:8,}}>
                            <TextInput
                                style={{height:35,paddingVertical:0,fontFamily:'NotoSansKR-Regular',fontSize:13,color:'#000'}}
                                placeholder="운송장 번호를 입력하세요."
                                placeholderTextColor="#C9C9C9"
                                onChangeText={text=>setInvoiceNum(text)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        width:'100%',
                        height:57,
                        borderRadius:8,
                        backgroundColor:'#477DD1',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                    onPress={()=>getdelivery()}>
                        <Text style={{color:'#fff',fontSize:16,fontFamily:'NotoSansKR-Bold'}}>리뷰목록</Text>
                    </TouchableOpacity>
                    
                </View>
                <BotLine/>
                {deliveryurl?<WebView
                   ref={webref}
                   onMessage={onMessage}
                   onNavigationStateChange={navigationChange}
                  source={{uri: `https://tracker.delivery/#/kr.logen/30337300361`}}
                />:null}
            </ScrollView>
        </SafeAreaView>
    );
};
export default DeliveryCheck;