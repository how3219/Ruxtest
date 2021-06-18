import React, {useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,  
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from '../style/style';
import Header from '../components/header';
// import Footer from '../components/footer';
import MainSlide from '../components/main_slide';
import {NewPrd, MainReview} from '../components/maincomp';
import API_CALL from '../ApiCall'
import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-community/async-storage"

export const Width = Dimensions.get('window').width;
export const Boxwidth = Width / 2 - 30;
export const Boxheight = Boxwidth * 1.4;

const MainScreen = ({navigation}) => {
  const isfoucsed = useIsFocused();
  const [focused,setFocused] = useState(isfoucsed);
  const typeAlert = () => {
      Toast.show({
        type:'my_custom_type',
        text1: '판매자 승인 후 이용가능합니다.',
        visibilityTime:2000,
      })
  }
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.users)
  const {isLoggedin} = useSelector(state => state.users)
  const {member} = useSelector(state => state.login)
  useEffect(()=>{
    if(member.mt_login_type!=='2'||member.mt_login_type!=='3') {
      setLogin()
    }   
  },[])
  

    const setLogin = async () => {

      const saveLogin = await AsyncStorage.getItem('saveLogin')
      if(saveLogin){
          const dataLogin = JSON.parse(saveLogin);
          const form = new FormData()
          form.append('method', 'proc_login_member')

          form.append('mt_id' ,dataLogin.mt_id)
          form.append('mt_pwd', dataLogin.mt_pwd)
          form.append('mt_app_token', '2')
          const url = 'http://dmonster1566.cafe24.com'
          const path = '/json/proc_json.php'
          try{
              const api = await API_CALL(url+path, form, false)
              const { data } = api;
              const { item, result } = data;
              if(result === "0") return Alert.alert('', "로그인 실패")
              if(result === "1" && item){
                console.log(item)
                  dispatch({
                      type : 'LOGIN',
                      payload : item[0]
                  })
                  // TODO: 토큰값 넣기 
                  dispatch({
                      type : 'auth'
                  })
                  
                  const saveLogin = { method : 'proc_login_member', mt_id : dataLogin.mt_id, mt_pwd : dataLogin.mt_pwd, mt_app_token : 1 }
                  await AsyncStorage.setItem('saveLogin', JSON.stringify(saveLogin))
                
                  navigation.navigate('Home')    
  
              }
          }catch(e){
              console.log(e)
              
          }
      }
    } 




    return (
    <SafeAreaView style={styles.container}>
        <Header/>
        <ScrollView style={styles.content}>
          {member.mb_type === "B" 
          ? <MainSlide/> 
          : <TouchableOpacity 
          onPress={() => navigation.navigate('ProductRegistCaution')}
          style={{marginBottom:10,}}>
              <View style={{width:(Width - 20),height:254}}>
                <Image
                  source={require('../images/slide_seller01.png')}
                  style={{width:'100%',height:'100%',resizeMode:'cover'}}
                />
              </View>
            </TouchableOpacity>}
          {member.mb_type === "B" && 

          <TouchableOpacity 
            style={{backgroundColor:'#EBEBEB',borderRadius:10,marginHorizontal:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:15,}}
            onPress={() => isLoggedin === false 
            ? navigation.navigate('Login') 
            : member.mt_seller === "N" ? typeAlert() : navigation.navigate('ProductRegistCaution')
            }>
            <Text style={{color:'#333',fontSize:17,fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>내 상품 등록하기</Text>
            <Image
            style={{}}
            source={require('../images/ar_right.png')}
            />
          </TouchableOpacity>
          
          }
        
        <TouchableOpacity 
        onPress={() => isLoggedin === false 
          ? navigation.navigate('Login')
          : navigation.navigate('AppraiseWrite')}
        style={{padding:15,width:Width}}>
          <Image 
            style={{resizeMode:'contain',width:'100%',height:100}} 
            source={require('../images/main_banner01.jpg')}
          />
        </TouchableOpacity>
        <View style={{marginBottom:30,}}>
          <View style={{paddingHorizontal:20,paddingVertical:0,flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontFamily:'NotoSansKR-Bold',fontSize:20,}}>새로운 상품</Text>
            <TouchableOpacity 
            style={{flexDirection:'row',alignItems:'center',}}
            onPress={() => navigation.navigate('NewPrdList')}>
              <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',}}>전체보기</Text>
              <Image
               style={{height:10,resizeMode:'contain',}}
               source={require('../images/ar_right.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{paddingLeft:20,}}>
          {member.mb_type === "S" && <NewPrd/> }
          {member.mb_type === "B" && <NewPrd/> }
          </View>
        </View>
        <View style={{paddingBottom:30,}}>
           <View style={{paddingHorizontal:20,paddingVertical:0,flexDirection:'row',justifyContent:'space-between',}}>
                <Text style={{fontFamily:'NotoSansKR-Bold',fontSize:20,}}>실시간 리뷰</Text>
                <TouchableOpacity 
                style={{flexDirection:'row',alignItems:'center',}}
                onPress={() => navigation.navigate('ReviewList')}
                >
                  <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',}}>전체보기</Text>
                  <Image
                   style={{height:10,resizeMode:'contain',}}
                   source={require('../images/ar_right.png')}
                  />
                </TouchableOpacity>
           </View>
           <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',paddingHorizontal:20,}}>
              <MainReview/>
           </View>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity 
          onPress={() => navigation.push('DeliveryCheck')}
          style={{backgroundColor:'#eee',width:200,height:50,justifyContent:'center',alignItems:'center',marginBottom:10,}}>
            <Text style={{fontSize:15,}}>
              운송장조회
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => navigation.navigate('RegisteredProduct')}
          style={{backgroundColor:'#eee',width:200,height:50,justifyContent:'center',alignItems:'center',marginBottom:10,}}>
            <Text style={{fontSize:15,}}>
              등록물품
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={{width:150,height:60}}>
            <Image 
                source={require('../images/logo01.png')} 
                style={{
                  tintColor:'gray',
                  opacity:0.7,
                  marginBottom:20,
                  resizeMode:'contain',
                  width:'100%'
              }}/>
          </View>
          <View style={{flexDirection:'column',marginBottom:20,}}>
            <Text style={styles.footText}>상호명 / 대표자 최태준 / 개인정보보호책임자 김성준</Text>
            <Text style={styles.footText}>사업자등록번호 123-45-67893</Text>
            <Text style={styles.footText}>통신판매업 신고번호 : 2021-서울강남-01234</Text>
            <Text style={styles.footText}>서울특별시 강남구 봉은사로 1</Text>
            <Text style={styles.footText}>고객센터 : 070-1234-5678 / fax : 07012345678</Text>
          </View>
          <Text style={styles.footText}>COPYRIGHT © 2021 DEALMATE LTD ALL RIGHTS RESERVED</Text>
        </View>
        </ScrollView>
    </SafeAreaView>
      );
}

export default MainScreen;
