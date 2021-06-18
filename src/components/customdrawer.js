import React, {useState, useEffect} from 'react';
import {View,TouchableOpacity,Text, Alert,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_CALL from '../ApiCall';
import {useSelector, useDispatch} from 'react-redux';
import {NaverLogin} from '@react-native-seoul/naver-login';
import {DrawerContentScrollView,} from '@react-navigation/drawer';
import AsyncStorage from "@react-native-community/async-storage"
import { memberInitial } from '../redux/reducer/loginReducer';
const CustomDrawer = (props) => {
    
    const {member} = useSelector(state => state.login)
    // console.log("afsdfsdf", member)
    const dispatch = useDispatch()
    const {isLoggedin} = useSelector(state => state.users)
    const [ct_id, setId] = useState('')
    const [ct_name, setName] = useState('')

    const [item, setItem] = useState([]);

    useEffect(()=>{
        getCate()
    },[])

    const getCate = async () =>{
        const form = new FormData();
        form.append('method', 'proc_category_list')
        form.append('ct_id',ct_id)
        form.append('ct_name',ct_name)

        const url = 'http://dmonster1566.cafe24.com'
        const path = '/json/proc_json.php'

        const api = await API_CALL(url+path, form, true)
        console.log(api)
        const { data : { method, result, message, count, item} } = api;
        
        setItem(item)
        
        dispatch({
            type:'CATEGORY_ONE',
            payload:item
        })
    }
    console.log('item', item)


    useEffect(() => {
       
    },[])
    
    const setLogout = async () => {       
        const form = new FormData()
        form.append('method', 'proc_logout_member')
        form.append('mt_id', member.mt_id)
        
        const url = 'http://dmonster1566.cafe24.com'
        const params = '/json/proc_json.php'
        try{
            const api = await API_CALL(url+params, form, false)
            const { data } = api;
            const { result,message } = data;
            if(result === "1"){
                await AsyncStorage.removeItem('saveLogin')
                dispatch({
                    type : 'logout'
                })
                dispatch({
                    type : 'LOGIN',
                    payload : memberInitial
                })
                if(member.mt_login_type=='2'){
                    NaverLogin.logout();
                }
                Alert.alert("","로그아웃되었습니다.")
                navigation.navigate('Login')
            }else if(result==='0')Alert.alert("",message)
        }
        catch(e){
            console.log(e)
            Alert.alert("","로그아웃에 실패했습니다.")
        }
    } 
    const {navigation} = props;
    return(
        <>
             <DrawerContentScrollView {...props}>
                <View style={{paddingHorizontal:10,flex:1}}>
                    {isLoggedin === false ? <View style={{
                        flexDirection:'row',
                        paddingTop:5,
                        borderBottomWidth:1,
                        borderBottomColor:'#eee',
                        paddingBottom:10,
                        alignItems:'center'
                        }}>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('Login')}
                        style={{
                            backgroundColor:'#477DD1',
                            borderRadius:8,
                            height:35,
                            paddingHorizontal:15,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:10,
                        }}>
                            <Text style={{fontSize:13,color:'#fff',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>로그인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('RegisterAgree')}
                        style={{
                            backgroundColor:'#fff',
                            borderWidth:1,
                            borderColor:'#477DD1',
                            borderRadius:8,
                            height:35,
                            paddingHorizontal:15,
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:10,
                        }}>
                            <Text style={{fontSize:13,color:'#477DD1',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>회원가입</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.closeDrawer()}
                            style={{
                                position:'absolute',
                                top:12,right:0,
                            }}
                            >
                            <Icon name="ios-close-sharp" size={20} color="#D8D8D8"/>
                        </TouchableOpacity>
                    </View> 
                    : <View style={{
                        paddingVertical:20,
                        borderBottomWidth:1,
                        borderBottomColor:'#eee',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'flex-end'
                        }}>
                        <View style={{}}>
                            <Text style={{fontSize:20,fontFamily:'NotoSansKR-Medium',lineHeight:30}}>안녕하세요.</Text>
                            <Text style={{fontSize:20,fontFamily:'NotoSansKR-Bold',lineHeight:30}}>{member.mt_nickname}님</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setLogout()} 
                            style={{
                                backgroundColor:'#fff',
                                borderWidth:1,
                                borderColor:'#447DD1',
                                borderRadius:8,
                                width:70,
                                height:32,
                                justifyContent:'center',
                                alignItems:'center',
                            }}
                        >
                            <Text 
                            style={{
                                color:'#447DD1',
                                fontFamily:'NotoSansKR-Medium',
                                lineHeight:20,
                                fontSize:12,
                                }}>
                                로그아웃
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.closeDrawer()}
                            style={{
                                position:'absolute',
                                top:12,right:0,
                            }}
                            >
                            <Icon name="ios-close-sharp" size={20} color="#D8D8D8"/>
                        </TouchableOpacity>
                    </View>
                    
                    }
                    {item?.map((item, i) => <TouchableOpacity 
                        onPress={() => navigation.navigate('Category',{ct_id:item.ct_id, ct_name:item.ct_name})}
                        style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center',
                            paddingVertical:20,
                            borderBottomWidth:1,
                            borderBottomColor:'#eee',
                        }}
                        key={i}
                        >
                        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>{item.ct_name}</Text>
                        <Icon name="ios-chevron-forward" size={20} color="#D8D8D8"/>
                    </TouchableOpacity>)}

                </View>
            </DrawerContentScrollView>
            <TouchableOpacity
                onPress={() => navigation.navigate('FavoriteList')}
                style={{
                    backgroundColor:'#477DD1',
                    height:62,
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                <Text style={{color:'#fff',fontFamily:'NotoSansKR-Regular',lineHeight:20,fontSize:14,}}>찜 목록 보러가기</Text>
                <View style={{width:24,height:24,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',borderRadius:24,marginLeft:10,}}>
                    <Text style={{color:'#477DD1'}}>8</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default CustomDrawer;