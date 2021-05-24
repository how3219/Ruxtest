import React, {useState,useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet,TextInput,Dimensions, Image, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DefaultPicker} from '../components/Select';
import {useSelector} from 'react-redux';
import API_CALL from '../ApiCall';
const Width = Dimensions.get('window').width;
const PADDING = 20;
const StatWidth = (Width - PADDING * 2 - 40) / 3;
const PhotoWidth = (Width - PADDING * 2 - 20) / 2;
const PhotoHeight = PhotoWidth - 40;

const brandPicker = [
    {label: '티파니', value:'티파니'},
    {label: '지방시', value:'지방시'},
    {label: '프라다', value:'프라다'},
  ]

const sellPicker =[
    {label: '예', value:'예'},
    {label: '아니오', value:'아니오'},
]

const cityPicker0 = [
    {label: '서울', value:'서울'},
    {label: '서울', value:'서울'},
    {label: '서울', value:'서울'},
    {label: '서울', value:'서울'},
]

const cityPicker1 = [
    {label: '관악구', value:'관악구'},
    {label: '관악구', value:'관악구'},
    {label: '관악구', value:'관악구'},
    {label: '관악구', value:'관악구'},
]

const deliveryPicker = [
    {label: '유료 배송', value:'유료 배송'},
    {label: '무료 배송', value:'무료 배송'},
]



const pakageitem = {
    case: false,
    guarantee: false,
    tag: false,
    receipt: false,
    etc: false,
}

const dealtype= {
    direct: false,
    courier: false,
    safe: false,
}

export const getYears = () => {
    const today = new Date();
    const start_year = 1920; //today.getFullYear() - 100; // 시작할 년도
    const today_year = today.getFullYear(); //today.getFullYear() - 19;
    let years = [];
    for (let i = start_year; i <= today_year; i++) {
      years.push(i.toString());
    }
    return years;
  };




const ReigsteredProductInfo = (props) => {
    const {route:{params},navigation} = props
    console.log(params)
    const {member} = useSelector(state => state.login)
    const [pakage, setPakage] = useState(pakageitem);
    const [deal, setDeal] = useState(dealtype);
    const [selectmonth, setSelectMonth] = useState([]);
    const [selectyear, setSelectYear] = useState([]);
    const [selectbrand, setSelectBrand] = useState([]);
    const [directsi, setdirectsi] = useState('')
    const [directgugun, setdirectgugun] = useState('');

    const defaultsetting = () => {
        let year = new Date().getFullYear();
        let year_option = [];
        let month_option = [];        
        for (let i = 2000; i <= year; i++) {
          year_option[i-2000] = { key: i, label: i + '년', value: i };
        }    
        for (let i = 1; i <= 12; i++) {
          month_option[i-1] = { key: i, label: i + '월', value: i };
        }
        setSelectMonth(month_option);
        setSelectYear(year_option);
      };
    const getarea = async() => {
        try{
            const form = new FormData;
            form.append('method','proc_pt_direct_sigugun')
            form.append('pt_direct_si',directsi)
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';

            const api = await API_CALL(url + path, form, false);
            const {data:{result,item}} = api;
            if(result==='0'){Alert.alert('직거래 가능지역 result')}
            else if(result==='1'){
                let gugun = item.map((value)=>{
                return {label:value.pt_direct_gugun,value:value.pt_direct_gugun}
                })
                setCityPicker(gugun)
            }
        }catch(e){
        console.log(e)
        }
    }
    const getDetailItem = async() => {
        const form = new FormData;
        form.append('method','proc_product_detail')
        form.append('mt_idx',member.mt_id)
        form.append('mt_idx',params.idx)
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {data:{result,item}} = api;
        if(result==='0'){Alert.alert('등록 수정 result')}
        else if(result==='1'){  
            
        }
    }
    useEffect(() => {
        if(directsi){
          getarea()
        }
      }, [directsi]);
      useEffect(() => {
        defaultsetting();    
        getDetailItem();
      }, []);
      
    const [data_1,setData_1] = useState([
        {
            id:1,
            title:'백화점',
            state:false
        },
        {
            id:2,
            title:'아울렛',
            state:false
        },
        {
            id:3,
            title:'편집샵',
            state:false
        },
        {
            id:4,
            title:'인터넷',
            state:false
        },
        {
            id:5,
            title:'중고거래',
            state:false
        },
        {
            id:6,
            title:'모릅니다',
            state:false
        },
    ]) ;
    const [data_2,setData_2] = useState([
        {
            id:1,
            title:'전시품급 컨디션',
            state:false,
        },
        {
            id:2,
            title:'미세한 사용감',
            state:false,
        },
        {
            id:3,
            title:'적당한 사용감',
            state:false,
        },
        {
            id:4,
            title:'사용감이 있어 눈에 보이는 정도',
            state:false,
        },
        {
            id:5,
            title:'하자나 헤짐 있는 상품',
            state:false,
        },
    ])
    const [data_3,setData_3] = useState([
        {
            id:1,
            title:'수선여부',
            state:false,
        },
        {
            id:2,
            title:'오염',
            state:false,
        },
        {
            id:3,
            title:'헤짐',
            state:false,
        },
        {
            id:4,
            title:'스크래치',
            state:false,
        },
    ])

    const PhotoItems = [
        {
            id:1,
            title:'전면',
        },
        {
            id:2,
            title:'후면',
        },
        {
            id:3,
            title:'내부 허리택, 목택,\n 브랜드 택',
        },
        {
            id:4,
            title:'구성품',
        },
        {
            id:5,
            title:'사용감, 하자',
        },
    ]




    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',height:60,justifyContent:'space-between',alignItems:'center',borderBottomColor:'#EEEEEE',borderBottomWidth:1,paddingHorizontal:20,}}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#aaa"/>
                </TouchableOpacity>
                <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>상품 정보 입력</Text>
                <View style={{width:30,height:30,}}></View>
            </View>
            <ScrollView>
                <View style={{padding:20,paddingBottom:100,}}>
                    <Text style={{fontSize:15,fontFamily:'NotoSansKR-Bold',lineHeight:20,paddingBottom:20,}}>상품 정보</Text>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>상품명을 알고 계신가요?</Text>
                        <TextInput
                            placeholder="상품명 입력"
                            placeholderTextColor="#C9C9C9"
                            style={styles.inputstyle}
                        />
                        <View style={styles.graybox}>
                            <Text style={styles.grayboxtext}>※브랜드명은 쓰지 않아도 되며 상품과 관련없는 경우 불량게시물로 간주됩니다.</Text>
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>브랜드</Text>
                        <View style={{}}>
                            <DefaultPicker picker={brandPicker} placeholder="브랜드 선택"/>
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>사이즈가 어떻게 되나요?</Text>
                        <TextInput
                            placeholder="사이즈 입력"
                            placeholderTextColor="#C9C9C9"
                            style={styles.inputstyle}
                        />
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>구매시기를 아시나요?</Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:100,marginRight:10,}}>
                                <DefaultPicker picker={brandPicker} placeholder="연도 선택"/>
                            </View>
                            <View style={{width:100,}}>
                                <DefaultPicker picker={brandPicker} placeholder="월 선택"/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>어디서 구매하셨나요? <Text style={styles.seltext}> (선택1)</Text></Text>
                        <View>
                            {data_1.map((element,key)=>(
                                <TouchableOpacity 
                                    key={key}
                                    onPress={() => setData_1(data_1.map(data=>{
                                        if(data.id === element.id){
                                            return {...data,state:true}
                                        }else{
                                            return {...data,state:false}
                                        }
                                    }))}
                                    style={{flex:1,height:40,backgroundColor: element.state === false ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                    <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: element.state === false ? '#222' : '#fff'}}>{element.title}</Text>
                                </TouchableOpacity>
                            ))}
                            {/* <TouchableOpacity 
                            onPress={() => setStorechoice({...storechoice, outletSelect: !storechoice.outletSelect})}
                            style={{flex:1,height:40,backgroundColor: storechoice.outletSelect === false ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: storechoice.outletSelect === false ? '#222' : '#fff'}}>아울렛</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,height:40,backgroundColor:'#F8F8F8',paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',}}>편집샵</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,height:40,backgroundColor:'#F8F8F8',paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',}}>인터넷(병행수입, 직구)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,height:40,backgroundColor:'#F8F8F8',paddingLeft:20,justifyContent:'center'}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',}}>중고거래</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,height:40,backgroundColor:'#F8F8F8',paddingLeft:20,justifyContent:'center',}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',}}>모릅니다</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>구성품이 있나요? <Text style={styles.seltext}> (다중 선택 가능)</Text></Text>
                        <View>
                            <TouchableOpacity 
                            onPress={() => setPakage({...pakage, case: !pakage.case})}
                            style={{flex:1,height:40,backgroundColor: pakage.case === false ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: pakage.case === false ? '#222' : '#fff'}}>케이스</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => setPakage({...pakage, guarantee: !pakage.guarantee})}
                            style={{flex:1,height:40,backgroundColor: pakage.guarantee === false ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: pakage.guarantee === false ? '#222' : '#fff'}}>정품보증서</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => setPakage({...pakage, tag: !pakage.tag})}
                            style={{flex:1,height:40,backgroundColor: pakage.tag === false ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: pakage.tag === false ? '#222' : '#fff'}}>택</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => setPakage({...pakage, receipt: !pakage.receipt})}
                            style={{flex:1,height:40,backgroundColor: pakage.receipt === false ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: pakage.receipt === false ? '#222' : '#fff'}}>영수증</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => setPakage({...pakage, etc: !pakage.etc})}
                            style={{flex:1,height:40,backgroundColor: pakage.etc === false ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center'}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: pakage.etc === false ? '#222' : '#fff'}}>기타</Text>
                            </TouchableOpacity>
                            { pakage.etc && (
                                <View style={{flexDirection:'row',flex:1,alignItems:'center',paddingTop:10,}}>
                                <Icon name="md-return-down-forward-sharp" size={20} color="#c9c9c9"/>
                                <TextInput
                                    style={{borderColor:'#eee',borderWidth:1,borderRadius:8,height:35,padding:0,paddingLeft:10,flexGrow:1,marginLeft:10,}}
                                    placeholder="구성품 입력"
                                    placeholderTextColor="#c9c9c9"
                                />
                            </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>즉시 판매가 가능합니까?</Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:100,}}>
                                <DefaultPicker placeholder="예" picker={sellPicker}/>
                            </View>
                            <TextInput
                                placeholder="금액 입력"
                                style={[styles.inputstyle, {flex:1,marginLeft:5,}]}
                            />
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>입찰 마감일이 언제입니까?</Text>
                        <TextInput
                            placeholder="날짜 선택"
                            style={[styles.inputstyle, {flex:1}]}
                        />
                    </View>
                    <View style={styles.contbox}>
                    <Text style={styles.contitle}>거래 유형을 선택해주세요.<Text style={styles.seltext}> (다중 선택 가능)</Text></Text>
                    <View style={{flexDirection:'row',}}>
                        <TouchableOpacity 
                        onPress={() => setDeal({...deal, direct: !deal.direct})}
                        style={{
                            backgroundColor: deal.direct === false ? '#fff' : '#447DD1' ,
                            borderColor: '#447DD1',
                            borderWidth:1,
                            height:35,
                            flex:1,
                            borderRadius:8,
                            justifyContent:'center',
                            alignItems:'center',
                            }}>
                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: deal.direct === false ? '#447DD1' : '#fff' ,lineHeight:20,}}>직거래</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => setDeal({...deal, courier: !deal.courier})}
                        style={{
                            backgroundColor: deal.courier === false ? '#fff' : '#447DD1' ,
                            borderColor: '#447DD1',
                            borderWidth:1,
                            height:35,
                            flex:1,
                            borderRadius:8,
                            justifyContent:'center',
                            alignItems:'center',
                            marginHorizontal:5,
                            }}>
                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: deal.courier === false ? '#447DD1' : '#fff' ,lineHeight:20,}}>택배거래</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => setDeal({...deal, safe: !deal.safe})}
                        style={{
                            backgroundColor: deal.safe === false ? '#fff' : '#447DD1' ,
                            borderColor: '#447DD1',
                            borderWidth:1,
                            height:35,
                            flex:1,
                            borderRadius:8,
                            justifyContent:'center',
                            alignItems:'center',
                            }}>
                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: deal.safe === false ? '#447DD1' : '#fff' ,lineHeight:20,}}>안전거래</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    {deal.direct && (
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>직거래 가능 지역을 선택해주세요.</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:120,marginRight:10,}}>
                                    <DefaultPicker
                                        placeholder="시/도 선택"
                                        picker={cityPicker0}
                                    />
                                </View>
                                <View style={{width:120,}}>
                                    <DefaultPicker
                                        placeholder="구/군 선택"
                                        picker={cityPicker1}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                    {(deal.courier || deal.safe) && (
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>배송비가 있습니까?</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:120,marginRight:10,}}>
                                    <DefaultPicker
                                        placeholder="유료 배송"
                                        picker={deliveryPicker}
                                    />
                                </View>
                                <TextInput
                                    placeholder="금액 입력"
                                    style={[styles.inputstyle, {flex:1,}]}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    )}
                    <View style={styles.contbox}>
                       <Text style={styles.contitle}>제품의 상태를 알려주세요.<Text style={styles.seltext}> (선택1)</Text></Text>
                       <View>
                           {data_2.map((element, key) => (
                               <TouchableOpacity 
                               key={key}
                               onPress={() => setData_2(data_2.map(data=>{
                                   if(data.id === element.id){
                                       return {...data,state:true}
                                   }else{
                                       return {...data,state:false}
                                   }
                               }))}
                               style={{flex:1,height:40,backgroundColor: element.state === false ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                               <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: element.state === false ? '#222' : '#fff'}}>{element.title}</Text>
                           </TouchableOpacity>
                           ))}
                       </View>
                       <View style={{flexDirection:'row',paddingTop:10,width:'100%'}}>
                                <Icon name="md-return-down-forward-sharp" size={20} color="#c9c9c9"/>
                                <View style={{flexDirection:'row', flexWrap:'wrap',justifyContent:'flex-start',marginLeft:10,}}>
                                    {data_3.map((element, key) => (
                                        <TouchableOpacity 
                                        key={key}
                                        onPress={() => setData_3(data_3.map(data =>{
                                            if(data.id === element.id){
                                                return {...data,state:true}
                                            }else{
                                                return {...data,state:false}
                                            }
                                        }))}
                                        style={{
                                            backgroundColor: element.state === false ? '#fff' : '#447DD1' ,
                                            borderColor: '#447DD1',
                                            borderWidth:1,
                                            height:35,
                                            width:StatWidth,
                                            borderRadius:8,
                                            justifyContent:'center',
                                            alignItems:'center',
                                            marginRight:5,
                                            marginBottom:5,
                                            }}>
                                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: element.state === false ? '#447DD1' : '#fff' ,lineHeight:20,}}>{element.title}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                    </View>
                    <View style={styles.contbox}>
                      <Text style={styles.contitle}>사진 등록<Text style={styles.seltext}> (필수)</Text></Text>
                      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
                          {PhotoItems.map((element, key) => (
                            <TouchableOpacity 
                                key={key}
                                style={{
                                    borderWidth:1,
                                    borderColor:'#C9C9C9',
                                    borderStyle:'dashed',
                                    borderRadius:5,
                                    width:PhotoWidth,
                                    height:PhotoHeight,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    marginBottom:12,

                                }}>
                                <View style={{width:44,height:38,marginBottom:5,}}>
                                    <Image 
                                        style={{resizeMode:'cover',width:'100%',height:'100%',}}
                                        source={require('../images/camera.png')}/>
                                </View>
                                <View>
                                    <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20,textAlign:'center'}}>{element.title}</Text>
                                </View>
                            </TouchableOpacity>
                          ))}
                          
                      </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>상품 정보를 노출하겠습니까?</Text>
                        <View style={{width:120}}>
                            <DefaultPicker placeholder="예" picker={sellPicker}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{flexDirection:'row',height:60,position:'absolute',bottom:0,left:0,right:0,}}>
                <TouchableOpacity 
                    style={{
                        flex:1,
                        backgroundColor:'#EBEBEB',
                        justifyContent:'center',
                        alignItems:'center',
                        borderRightWidth:1,
                        borderRightColor:'#fff',
                    }}
                    onPress={() => navigation.goBack()}
                    >
                    <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium'}}>등록 취소</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        flex:1,
                        backgroundColor:'#EBEBEB',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                    onPress={() => navigation.navigate('RegisteredProduct')}
                    >
                    <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium'}}>상품 등록</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    contbox:{
        paddingBottom:20,
    },
    contitle: {
        fontSize:14,
        fontFamily:'NotoSansKR-Medium',
        lineHeight:20,
        paddingBottom:10,
    },
    inputstyle: {
        fontSize:13,
        borderWidth:1,
        borderColor:'#eee',
        borderRadius:8,
        height:35,
        paddingLeft:10,
        paddingVertical:0,
        marginBottom:5,
    },
    graybox: {
        backgroundColor: '#EBEBEB',
        borderRadius: 9,
        padding:10,
    },
    grayboxtext:{
        fontSize:13,
        fontFamily:'NotoSansKR-Medium',
        lineHeight:20,
    },
    seltext:{
        fontSize:12,
        color:'#999',
        fontFamily:'NotoSansKR-Regular',
    }
})

export default ReigsteredProductInfo;