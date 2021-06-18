import React,{useEffect,useState,useCallback} from 'react';
import {SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Dimensions} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../style/style';
import { useIsFocused  } from '@react-navigation/native';
import Header, {MypageHeader} from '../components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BotLine from '../components/bottomline';
import API_CALL from '../ApiCall';
export const Width = Dimensions.get('window').width / 4 - 20

const MypageScreen = ({navigation}) => { 
    const isfocused = useIsFocused();
    const { member } = useSelector(state => state.login)
    const [mypageItem,setMypageItem] = useState([])
    const [starlist,setStarList] = useState(new Array(5).fill(0))
    useEffect(() => {
        if(isfocused){
            getMypage()
        } 
    }, [isfocused])
    const getMypage = async() => {
        try{
            const form = new FormData;
            form.append('method','proc_my_main')
            form.append('mt_idx',member.mt_idx)
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, true);
            const {data:{result,message,item}} = api;
            if(result==='0')Alert.alert('',message)
            else if(result==='1'){
                setMypageItem(item[0])
                makestars(item[0].rate2)
            }
        } catch(e) {

        }
    }
    const makestars = (rate) => {
        let arr = Object.assign([],starlist)
        let rate2 = parseFloat(rate) 
        for(let i=0; i<arr.length; i++){
            console.log(rate2,i)
            if(rate2>i){
                console.log(rate2-(i))
                if(rate2-(i)>=1){
                    arr[i]=1
                }else if(rate2-(i)<1&&rate2-(i)>0.5){
                    arr[i]=0.5
                }
            }else{
                arr[i]=0
            }
        }
        console.log(505050,arr)
        setStarList(arr)
    }
   
    const renderstars = (val,idx) => {
        if(val===1){
            return <Icon name="star" size={23} color="#477DD1" key={idx}/>
        }else if(val===0.5){
            return <Icon name="star-half" size={23} color="#477DD1" key={idx}/>
        }else if(val===0){
            return <Icon name="star-border" size={23} color="#DDDDDD" key={idx}/>
        }
    }
    return(
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}> 
        <MypageHeader/>
        <ScrollView>
            <View style={{padding:20,}}>
                <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#eee',paddingBottom:20,}}>
                    <View style={{width:63,height:63,borderRadius:32,overflow:'hidden',}}>
                        <Image
                        style={{resizeMode:'cover',width:'100%',height:'100%',}}
                        source={require('../images/profile02.png')}
                        />
                    </View>
                    <View style={{paddingLeft:20,}}>
                        <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:15,color:"#b9b9b9",}}>{mypageItem.	mt_company_name}</Text>
                        <View style={{flexDirection:'row',alignItems:'center',paddingBottom:6,}}>
                            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#5E5E5E',fontFamily:'NotoSansKR-Bold',paddingRight:10,}}>{member.mt_nickname}</Text>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingRight:10,}}>
                            {
                                starlist?.map((value,idx)=>{
                                    return(
                                        renderstars(value,idx)
                                    )
                                })
                            }
                            </View>
                            <Text>
                                <Text style={{color:'#606060',fontSize:13,lineHeight:15,fontFamily:'NotoSansKR-Regular'}}>{mypageItem.rate2}</Text>
                                <Text style={{color:'#B7B7B7',fontSize:13,lineHeight:15,fontFamily:'NotoSansKR-Regular'}}>/5</Text>
                            </Text>
                        </View>
                        <View style={{flexDirection:'row',}}>
                            <View style={{
                                backgroundColor:'#fff',
                                borderWidth:1,
                                borderColor:'#477DD1',
                                borderRadius:9,
                                justifyContent:'center',
                                alignItems:'center',
                                paddingHorizontal:10,
                                paddingVertical:3,
                                marginRight:5,
                            }}>
                                <Text style={{color:'#477DD1',fontSize:13,lineHeight:18,fontFamily:'NotoSansKR-Medium'}}>사업자</Text> 
                            </View>
                            <View style={{
                                backgroundColor:'#fff',
                                borderWidth:1,
                                borderColor:'#477DD1',
                                borderRadius:9,
                                justifyContent:'center',
                                alignItems:'center',
                                paddingHorizontal:10,
                                paddingVertical:3,
                                marginRight:5,
                            }}>
                                <Text style={{color:'#477DD1',fontSize:13,lineHeight:18,fontFamily:'NotoSansKR-Medium'}}>{mypageItem.mt_sms_certify==='Y'?'본인인증 1단계':'본인인증 미실시'}</Text>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{paddingHorizontal:12,paddingTop:20,}}>
                    <Text style={{fontSize:13,color:'#8B8B8B',lineHeight:18,fontFamily:'NotoSansKR-Regular'}}>{mypageItem.mt_memo}</Text>
                </View>
            </View>
            <BotLine/>
            <View style={{paddingVertical:10,}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10,}}>
                    <TouchableOpacity 
                    style={{width:80,alignItems:'center'}}
                    onPress={() => navigation.navigate('Transaction')}
                    >
                        <View style={{width:27,height:30,justifyContent:'center',paddingBottom:5,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}} 
                            source={require('../images/ico_my01.png')}
                            />
                        </View>
                        <Text style={{fontSize:13,color:'#444',lineHeight:18,fontFamily:'NotoSansKR-Regular'}}>거래내역</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:80,alignItems:'center'}}>
                        <View style={{width:27,height:30,justifyContent:'center',paddingBottom:5,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}} 
                            source={require('../images/ico_my02.png')}
                            />
                        </View>
                        <Text style={{fontSize:13,color:'#444',lineHeight:18,fontFamily:'NotoSansKR-Regular'}}>광고센터</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Appraise')}
                    style={{width:80,alignItems:'center'}}>
                        <View style={{width:27,height:30,justifyContent:'center',paddingBottom:5,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}} 
                            source={require('../images/ico_my03.png')}
                            />
                        </View>
                        <Text style={{fontSize:13,color:'#444',lineHeight:18,fontFamily:'NotoSansKR-Regular'}}>감정신청</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{width:80,alignItems:'center'}}
                    onPress={() => navigation.push('ReviewList')}
                    >
                        <View style={{width:27,height:30,justifyContent:'center',paddingBottom:5,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}} 
                            source={require('../images/ico_my04.png')}
                            />
                        </View>
                        <Text style={{fontSize:13,color:'#444',lineHeight:18,fontFamily:'NotoSansKR-Regular'}}>리뷰</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10,}}>
                    <TouchableOpacity 
                    style={{width:80,alignItems:'center'}}
                    onPress={() => navigation.navigate('FavoriteList')}
                    >
                        <View style={{width:27,height:30,justifyContent:'center',paddingBottom:5,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}} 
                            source={require('../images/ico_my05.png')}
                            />
                        </View>
                        <Text style={{fontSize:13,color:'#444',lineHeight:18,fontFamily:'NotoSansKR-Regular'}}>찜</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{width:80,alignItems:'center'}}
                    onPress={() => navigation.navigate('DeliveryCheck')}
                    >
                        <View style={{width:27,height:30,justifyContent:'center',paddingBottom:5,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}} 
                            source={require('../images/ico_my06.png')}
                            />
                        </View>
                        <Text style={{fontSize:13,color:'#444',lineHeight:18,fontFamily:'NotoSansKR-Regular'}}>택배조회</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{width:80,alignItems:'center'}}
                    onPress={() => navigation.navigate('CustomerCenter')}
                    >
                        <View style={{width:27,height:30,justifyContent:'center',paddingBottom:5,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}} 
                            source={require('../images/ico_my07.png')}
                            />
                        </View>
                        <Text style={{fontSize:13,color:'#444',lineHeight:18,fontFamily:'NotoSansKR-Regular'}}>고객센터</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{width:80,alignItems:'center'}}
                    onPress={() => navigation.navigate('Setting')}
                    >
                        <View style={{width:27,height:30,justifyContent:'center',paddingBottom:5,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}} 
                            source={require('../images/ico_my08.png')}
                            />
                        </View>
                        <Text style={{fontSize:13,color:'#444',lineHeight:18,fontFamily:'NotoSansKR-Regular'}}>환경설정</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BotLine/>
            <View style={{padding:20,}}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>구매내역</Text>
                <View style={{paddingTop:16, flexDirection:'row',justifyContent:'space-between',paddingBottom:20,}}>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width:Width,
                        height:Width,
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:11,
                        }}>
                        <Text style={{fontSize:13,color:'#444',fontFamily:'NotoSansKR-Regular',lineHeight:15,}}>전체</Text>
                        <View style={{width:10,height:1,backgroundColor:'#444',marginVertical:5,}}></View>
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>{mypageItem.buy_total}</Text>
                    </View>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width:Width,
                        height:Width,
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:11,
                        }}>
                        <Text style={{fontSize:13,color:'#444',fontFamily:'NotoSansKR-Regular',lineHeight:15,}}>입찰중</Text>
                        <View style={{width:10,height:1,backgroundColor:'#444',marginVertical:5,}}></View>
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>{mypageItem.buy_tender_cnt}</Text>
                    </View>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width:Width,
                        height:Width,
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:11,
                        }}>
                        <Text style={{fontSize:13,color:'#444',fontFamily:'NotoSansKR-Regular',lineHeight:15,}}>거래중</Text>
                        <View style={{width:10,height:1,backgroundColor:'#444',marginVertical:5,}}></View>
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>{mypageItem.buy_ing_cnt}</Text>
                    </View>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width:Width,
                        height:Width,
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:11,
                        backgroundColor:'#477DD1',
                        }}>
                        <Text style={{fontSize:13,color:'#fff',fontFamily:'NotoSansKR-Regular',lineHeight:15,}}>거래완료</Text>
                        <View style={{width:10,height:1,backgroundColor:'#fff',marginVertical:5,}}></View>
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#fff'}}>{mypageItem.buy_end_cnt}</Text>
                    </View>
                </View>
                <Text style={{fontSize:16,fontWeight:'bold'}}>판매내역</Text>
                <View style={{paddingTop:16, flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width:Width,
                        height:Width,
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:11,
                        }}>
                        <Text style={{fontSize:13,color:'#444',fontFamily:'NotoSansKR-Regular',lineHeight:15,}}>전체</Text>
                        <View style={{width:10,height:1,backgroundColor:'#444',marginVertical:5,}}></View>
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>{mypageItem.sell_total}</Text>
                    </View>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width:Width,
                        height:Width,
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:11,
                        }}>
                        <Text style={{fontSize:13,color:'#444',fontFamily:'NotoSansKR-Regular',lineHeight:15,}}>입찰중</Text>
                        <View style={{width:10,height:1,backgroundColor:'#444',marginVertical:5,}}></View>
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>{mypageItem.sell_tender_cnt}</Text>
                    </View>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width:Width,
                        height:Width,
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:11,
                        }}>
                        <Text style={{fontSize:13,color:'#444',fontFamily:'NotoSansKR-Regular',lineHeight:15,}}>거래중</Text>
                        <View style={{width:10,height:1,backgroundColor:'#444',marginVertical:5,}}></View>
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>{mypageItem.sell_ing_cnt}</Text>
                    </View>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width:Width,
                        height:Width,
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:11,
                        backgroundColor:'#477DD1',
                        }}>
                        <Text style={{fontSize:13,color:'#fff',fontFamily:'NotoSansKR-Regular',lineHeight:15,}}>거래완료</Text>
                        <View style={{width:10,height:1,backgroundColor:'#fff',marginVertical:5,}}></View>
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#fff'}}>{mypageItem.sell_end_cnt}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};


export default MypageScreen
