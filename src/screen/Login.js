import React, {useEffect,useState} from 'react';
import {SafeAreaView,View,Text,Image,TouchableOpacity, Dimensions, TextInput, Alert,Platform} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import API_CALL from '../ApiCall';
import AsyncStorage from "@react-native-community/async-storage"
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import {getToken} from '../utils/fcm';
import jwt_decode from 'jwt-decode';
const Width = Dimensions.get('window').width;
const Logo = (Width / 2) - 40;
const Halfbox = (Width - 50) / 2;
const Threebox = (Width - 40) / 3;
const BoxHeight = (Dimensions.get('window').height) / 4;
const iosKeys = {
    kConsumerKey: "PIo4jG9qRdOX4aYzlksH",
    kConsumerSecret: "hPGoGUVIzy",
    kServiceAppName: "테스트앱(iOS)",
    kServiceAppUrlScheme: "ruxboxios" // only for iOS
  };
  
  const androidKeys = {
    kConsumerKey: "PIo4jG9qRdOX4aYzlksH",
    kConsumerSecret: "hPGoGUVIzy",
    kServiceAppName: "테스트앱(안드로이드)"
  };
  
const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;

const Login = ({navigation}) => {
    useEffect(async()=>{
      const token = await getToken();
      setFirebaseToken(token)      
    },[])
    const [firebasetoken,setFirebaseToken] = useState('');
    const [naverToken, setNaverToken] = React.useState(null);
    const [autocheck, setAutocheck] = useState(false);
    const dispatch = useDispatch()
    const { member } = useSelector(state => state.login)
    const {isLoggedin} = useSelector(state => state.users)
    const [mt_id ,setId] = useState('');
    const [mt_pwd ,setPwd] = useState('');
    const [mt_app_token ,setApp_token] = useState('');
    const getUserData = async () =>{
        const form = new FormData()
        form.append('method', 'proc_login_member')
        form.append('mt_id', mt_id)
        form.append('mt_pwd', mt_pwd)
        form.append('mt_app_token', firebasetoken)
        const url = 'http://dmonster1566.cafe24.com'
        const params = '/json/proc_json.php'
        try{
            const api = await API_CALL(url+params, form, false)
            const { data } = api;
            const { item, result } = data;
            if(result === "0") return Alert.alert('', "로그인에 실패했습니다.")
            if(result === "1" && item){
                dispatch({
                    type : 'LOGIN',
                    payload : item[0]
                })
                // TODO: 토큰값 넣기 
                dispatch({
                    type : 'auth'
                })
                const saveLogin = { method : 'proc_login_member', mt_id, mt_pwd, mt_app_token : firebasetoken }
                autocheck === false 
                ? null
                : await AsyncStorage.setItem('saveLogin', JSON.stringify(saveLogin))
                Alert.alert('', "로그인되었습니다")
                navigation.dispatch(
                    CommonActions.reset({
                      index:1,
                      routes:[{name:'Home'}]
                    })
                  )
            }
        }catch(e){
            console.log(e)
            Alert.alert('', "로그인에 실패했습니다. 에러")    
        }
    }
    const naversignup = async(profile) => {      
        try{
            const form = new FormData()
            form.append('method', 'proc_login_sns_member')
            form.append('mt_login_type', '2')
            form.append('id', profile.response.id)
            form.append('email', profile.response.email)
            form.append('mobile', profile.response.mobile)
            form.append('name', profile.response.name)
            form.append('nickname', profile.response.nickname)
            form.append('profile_image', profile.response.profule_image)
            form.append('mt_app_token', firebasetoken)
            const url = 'http://dmonster1566.cafe24.com'
            const params = '/json/proc_json.php'
            const api = await API_CALL(url+params, form, false)
            const { data:{result,item,message} } = api;
            console.log(result,message)

            if(result==='0')return Alert.alert('',message)
            else if(result==='1'){
                dispatch({
                    type : 'LOGIN',
                    payload : item[0]
                })
                // TODO: 토큰값 넣기 
                dispatch({
                    type : 'auth'
                })
                const saveLogin = { method : 'proc_login_member', mt_id, mt_pwd, mt_app_token : firebasetoken }
                autocheck === false 
                ? null
                : await AsyncStorage.setItem('saveLogin', JSON.stringify(saveLogin))
                navigation.dispatch(
                    CommonActions.reset({
                      index:1,
                      routes:[{name:'Home'}]
                    })
                  )
            }
        }catch(e){
            console.log('naver',e)
        }    
    }
    const naverLogin = props => {  
        return new Promise((resolve, reject) => {
          NaverLogin.login(props, (err, token) => {
            console.log(`\n\n  Token is fetched  :: ${JSON.stringify(token)} \n\n`);
            if(!token){
                resolve(null)
            }
            setNaverToken(token);
            getUserProfile(token.accessToken);
            if (err) {
              reject(err);
              return;
            }
            resolve(token);
          });
        });
      };
      const naverLogout = () => {
        NaverLogin.logout();
        setNaverToken("");
      };
      const getUserProfile = async (token) => {
        const profileResult = await getProfile(token);
        naversignup(profileResult);
        if (profileResult.resultcode === "024") {
          Alert.alert("", profileResult.message);
          return;
        }
        console.log("profileResult", profileResult);
      };
    
      const appleLogin = async () => {
        try {
            if(Platform.OS!=='ios'){return Alert.alert('','ios가 아닙니다.')}
            else {return Alert.alert('진행중')}

          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,        
            requestedScopes: [appleAuth.Scope.EMAIL],
          });      
          
          const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
          if(credentialState === appleAuth.State.AUTHORIZED) {
            const {identityToken, user} = appleAuthRequestResponse;
            console.log(677677, jwt_decode(appleAuthRequestResponse.identityToken));
            
          }      
        }
        catch(err) {
          if (err.code === appleAuth.Error.CANCELED) {
            console.warn('User canceled Apple Sign in.');
          } else {
            // console.error(err);
            alert('Fail Apple Login.');
          }
        }
      }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{height:BoxHeight,paddingHorizontal:20,justifyContent:'center',alignItems:'center'}}>
                <View style={{width:Logo}}>
                    <Image
                    source={require('../images/logo01.png')}
                    style={{resizeMode:'contain',width:'100%',}}
                    />
                </View>
            </View>
            <View style={{height:BoxHeight,paddingHorizontal:20,marginBottom:20}}>
                <TextInput
                style={{borderColor:'#eee',borderWidth:1,borderRadius:8,height:58,paddingLeft:20,fontSize:15,marginBottom:10,color:'#000'}}
                placeholder="아이디"
                placeholderTextColor="#C9C9C9"
                value={mt_id}
                onChangeText={text => setId(text)}
                />
                <TextInput
                style={{borderColor:'#eee',borderWidth:1,borderRadius:8,height:58,paddingLeft:20,fontSize:15,marginBottom:10,color:'#000'}}
                placeholder="비밀번호"
                placeholderTextColor="#C9C9C9"                
                secureTextEntry={true}
                value={mt_pwd}
                onChangeText={text => setPwd(text)}
                />
                <TouchableOpacity
                    onPress={()=> setAutocheck(!autocheck)}
                    style={{flexDirection:'row',alignItems:'center',marginBottom:10,}}
                >
                    {autocheck === false 
                    ? <Icon name="check-box-outline-blank" size={24} color='#eee' />
                    : <Icon name="check-box" size={24} color="#447DD1"/>}
                    
                    <Text style={{marginLeft:4,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#888'}}>자동 로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{
                    backgroundColor:'#447DD1',
                    justifyContent:'center',
                    alignItems:'center',
                    height:58,
                    borderRadius:8,}}
                    onPress={()=> getUserData()}>
                    <Text style={{
                        fontSize:18,
                        fontFamily:'NotoSansKR-Medium',
                        color:'#fff',
                    }}>로그인</Text>
                </TouchableOpacity>
                <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'center',alignItems:'center',marginTop:20,}}>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('RegisterAgree')}
                        style={{width:Threebox,alignItems:'center',height:20,justifyContent:'center'}}>
                            <Text style={{
                                fontSize:14,
                                fontFamily:'NotoSansKR-Regular',
                                lineHeight:20,
                                color:'#888888'
                            }}>회원가입</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:Threebox,height:20,justifyContent:'center',alignItems:'center',borderLeftColor:'#eee',borderLeftWidth:1,borderRightColor:'#eee',borderRightWidth:1}}
                        onPress={()=>navigation.navigate('IdfindScreen')}>
                            <Text style={{
                                fontSize:14,
                                fontFamily:'NotoSansKR-Regular',
                                lineHeight:20,
                                color:'#888888'
                            }}>아이디찾기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:Threebox,alignItems:'center',height:20,justifyContent:'center'}}
                        onPress={()=>navigation.navigate('PwfindScreen')}>
                            <Text style={{
                                fontSize:14,
                                fontFamily:'NotoSansKR-Regular',
                                lineHeight:20,
                                color:'#888888'
                            }}>비밀번호 찾기</Text>
                        </TouchableOpacity>
                </View>
                <View style={{height:BoxHeight-30,paddingHorizontal:10,justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:10,}}>
                    <View style={{flex:1,height:1,backgroundColor:'#eee'}}></View>
                    <Text style={{fontSize:15,fontFamily:'NotoSansKR-Bold',color:'#555',paddingHorizontal:20}}>로그인 및 회원가입</Text>
                    <View style={{flex:1,height:1,backgroundColor:'#eee'}}></View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                    <TouchableOpacity style={{flexDirection:'row',width:Halfbox,height:50,backgroundColor:'#F4F4F4',justifyContent:'space-between',alignItems:'center',overflow:'hidden',marginRight:5,paddingHorizontal:15,}}
                    onPress={() => naverLogin(initials)}>
                        <View style={{width:28,height:28,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}}
                            source={require('../images/ico_login01.png')}
                            />
                        </View>
                        <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color:'#888'}}>네이버 로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',width:Halfbox,height:50,backgroundColor:'#F4F4F4',justifyContent:'space-between',alignItems:'center',overflow:'hidden',marginLeft:5,paddingHorizontal:15,}}
                    onPress={()=>appleLogin()}>
                        <View style={{width:28,height:28,}}>
                            <Image
                            style={{resizeMode:'contain',width:'100%',height:'100%'}}
                            source={require('../images/ico_login02.png')}
                            />
                        </View>
                        <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color:'#888'}}>애플 로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            
        </SafeAreaView>
    );
};

export default Login;