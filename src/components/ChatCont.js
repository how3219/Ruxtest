import React from 'react';
import {View, Image, Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';

export const ChatLeft = ({message,user,chat_hour,mt_image1}) => {
  return(
      <View style={{flexDirection:'row',marginBottom:10,}}>
        <View style={{width:50,height:50,borderRadius:50,overflow: 'hidden',justifyContent: 'center',marginRight:10,backgroundColor:'#fff'}}>
        {mt_image1?
          <Image
            style={{resizeMode:'contain',width:'100%',height:'100%'}}
            source={{uri:mt_image1}}/>:null
        }
        </View>
        <View style={{maxWidth:'65%'}}>
          <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,paddingBottom:6,}}>{user}</Text>
          <View style={{backgroundColor: '#fff',padding:10,borderRadius: 8,}}>
            <Text style={{fontSize:15,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>{message}</Text>
          </View>
        </View>
        <Text style={{alignSelf:'flex-end',paddingLeft:10,fontSize:13,color:'#555',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>{parseInt(chat_hour.split(':')[0])>12?`오후`:`오전`}{`${chat_hour.split(':')[0].toString()}:${chat_hour.split(':')[1].toString()}`}</Text>
      </View>
  );
};

export const ChatRight = ({message,chat_hour,user}) => {
  return(
      <View style={{flexDirection:'row-reverse',paddingBottom:10,}}>
        <View style={{maxWidth:'65%'}}>
        <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,paddingBottom:6,}}>{user}</Text>
          <View style={{backgroundColor: '#477DD1',padding:10,borderRadius: 8,maxWidth:210}}>
            <Text style={{fontSize:15,color:'#fff',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>{message}</Text>
          </View>
        </View>
        <Text style={{alignSelf:'flex-end',paddingRight:10,fontSize:13,color:'#555',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>{parseInt(chat_hour.split(':')[0])>12?`오후`:`오전`}{`${chat_hour.split(':')[0].toString()}:${chat_hour.split(':')[1].toString()}`}</Text>
      </View>
  );
};

export const ChatDateLine = ({date}) => {
  return(
    <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
      <View style={{flex:1,height:1,backgroundColor: '#DDDDDD'}}></View>
      <View style={{flex:2,height:50,alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{fontSize:13,color:'#999',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>{date}</Text>
      </View>
      <View style={{flex:1,height:1,backgroundColor: '#DDDDDD'}}></View>
    </View>
  );
};

export const DealRequestLeft = ({user,mt_image1,msg,chat_hour,reject,Proceed,usercheck} , {navigation}) => {

  return(
    <View style={{flexDirection:'row',marginBottom:20,maxWidth: 240,}}>
      <View style={{width:50,height:50,borderRadius:50,overflow: 'hidden',justifyContent: 'center',marginRight:10,backgroundColor:'white'}}>
      {mt_image1?
        <Image
            style={{resizeMode:'contain',width:'100%',height:'100%'}}
            source={{uri:mt_image1}}/>:null}
      </View>
        <View>
          <Text style={{fontSize:16,fontWeight:'bold',paddingBottom:6,fontFamily:'NotoSansKR-Bold',lineHeight:20}}>{user}</Text>
          <View style={{backgroundColor: '#fff',borderRadius: 8,overflow:'hidden'}}>
          <View style={{padding:10,paddingVertical: 30,}}>
            <Text style={{fontSize:15,paddingBottom:10,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>
              {msg}     
            </Text>
            
          </View>
          <View style={{flexDirection:'row',}}>
            <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:54,alignItems: 'center',justifyContent: 'center',borderRightWidth:1,borderRightColor:'#fff'}} onPress={()=>Proceed()}>
              <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',color:'#fff'}}>거래 진행</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:54,alignItems: 'center',justifyContent: 'center'}} onPress={()=>reject()}>
              <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',color:'#fff',fontFamily:'NotoSansKR-Regular',lineHeight:20,}}>거래 거절</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={{alignSelf:'flex-end',paddingLeft:10,fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20,color:'#555'}}>{parseInt(chat_hour.split(':')[0])>12?`오후`:`오전`}{`${chat_hour.split(':')[0].toString()}:${chat_hour.split(':')[1].toString()}`}</Text>
    </View>    
  );
};

export const DealRequestRight = ({user,msg,chat_hour,reject,Proceed,usercheck} , {navigation}) => {
  
  return(
    <View style={{flexDirection:'row-reverse',marginBottom:20}}>
      <View style={{maxWidth:240}}>
          <Text style={{fontSize:16,fontWeight:'bold',paddingBottom:6,fontFamily:'NotoSansKR-Bold',lineHeight:20}}>{user}</Text>
          <View style={{backgroundColor: '#fff',borderRadius: 8,overflow:'hidden'}}>
          <View style={{padding:10,paddingVertical: 30,}}>
            <Text style={{fontSize:15,paddingBottom:10,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>
              {msg}     
            </Text>
          </View>
          <View style={{flexDirection:'row',}}>
            <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:54,alignItems: 'center',justifyContent: 'center',borderRightWidth:1,borderRightColor:'#fff'}} onPress={()=>usercheck&&Proceed()}>
              <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',color:'#fff'}}>거래 진행</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:54,alignItems: 'center',justifyContent: 'center'}} onPress={()=>usercheck&&reject()}>
              <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',color:'#fff',fontFamily:'NotoSansKR-Regular',lineHeight:20,}}>거래 거절</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    <Text style={{alignSelf:'flex-end',paddingRight:10,fontSize:13,color:'#555',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>{parseInt(chat_hour.split(':')[0])>12?`오후`:`오전`}{`${chat_hour.split(':')[0].toString()}:${chat_hour.split(':')[1].toString()}`}</Text>
  </View>
  );
};

export const RightDealFalse = ({user,msg,chat_hour,agree,rejectcancel,usercheck}) => {
  return(
    <View style={{flexDirection:'row-reverse',paddingBottom:20,justifyContent: 'flex-start'}}>
      <View style={{minWidth:210,}}>
      <Text style={{fontSize:16,fontWeight:'bold',paddingBottom:6,fontFamily:'NotoSansKR-Bold',lineHeight:20}}>{user}</Text>
        <View style={{padding:10,paddingVertical:30,backgroundColor:'#fff',borderRadius: 8,overflow: 'hidden',}}>
          <View style={{paddingBottom:10,maxWidth:220}}>
            <Text style={{fontSize:15,paddingBottom:10,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>
              {msg}     
            </Text>
          </View>
        </View>
        <View style={{flexDirection:'row',}}>
        <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:54,alignItems: 'center',justifyContent: 'center',borderRightWidth:1,borderRightColor:'#fff'}} onPress={()=>usercheck&&agree()}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',color:'#fff'}}>동의</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:54,alignItems: 'center',justifyContent: 'center'}} onPress={()=>usercheck&&rejectcancel()}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',color:'#fff'}}>거절</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{alignSelf:'flex-end',paddingRight:10,fontSize:13,color:'#555',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>{parseInt(chat_hour.split(':')[0])>12?`오후`:`오전`}{`${chat_hour.split(':')[0].toString()}:${chat_hour.split(':')[1].toString()}`}</Text>
    </View>
  );
};
export const LeftDealFalse = ({user,msg,chat_hour,mt_image1,agree,rejectcancel,usercheck}) => {
  return(
    <View style={{flexDirection:'row',paddingBottom:20,justifyContent: 'flex-start'}}>
      <View style={{width:50,height:50,borderRadius:50,overflow: 'hidden',justifyContent: 'center',marginRight:10,backgroundColor:'#fff'}}>
        {mt_image1?
          <Image
            style={{resizeMode:'contain',width:'100%',height:'100%'}}
            source={{uri:mt_image1}}/>:null
        }
        </View>
      <View style={{minWidth:210,}}>
      <Text style={{fontSize:16,fontWeight:'bold',paddingBottom:6,fontFamily:'NotoSansKR-Bold',lineHeight:20}}>{user}</Text>
        <View style={{padding:10,paddingVertical:30,backgroundColor:'#fff',borderRadius: 8,overflow: 'hidden',}}>
          <View style={{paddingBottom:10,maxWidth:220}}>
            <Text style={{fontSize:15,paddingBottom:10,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>
              {msg}     
            </Text>
          </View>
        </View>
        <View style={{flexDirection:'row',}}>
          <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:54,alignItems: 'center',justifyContent: 'center',borderRightWidth:1,borderRightColor:'#fff'}} onPress={()=>usercheck&&agree()}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',color:'#fff'}}>동의</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:54,alignItems: 'center',justifyContent: 'center'}} onPress={()=>usercheck&&rejectcancel()}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',color:'#fff'}}>거절</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{alignSelf:'flex-end',paddingLeft:10,fontSize:13,color:'#555',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>{parseInt(chat_hour.split(':')[0])>12?`오후`:`오전`}{`${chat_hour.split(':')[0].toString()}:${chat_hour.split(':')[1].toString()}`}</Text>
    </View>
  );
};
export const DealTrue = ({mine,user,num,name,price,dealtype,size}) => {
  return(
    <View style={{flexDirection:'row-reverse',paddingBottom:20,justifyContent: 'flex-start'}}>
      <View style={{backgroundColor:'#fff',borderRadius: 8,overflow: 'hidden',minWidth:210,}}>
        <View style={{padding:10,paddingVertical:30,}}>
          <Text style={{fontSize:15,paddingBottom:10,fontFamily:'NotoSansKR-Regular',lineHeight:20,}}><Text style={{fontFamily:'NotoSansKR-Medium',lineHeight:20,}}>{mine}님께서</Text> 주문 완료했습니다.</Text>
          <View>
            <Text style={{fontSize:15,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>휴대폰 번호 : {num}</Text>
            <Text style={{fontSize:15,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>상품명 : {name}</Text>
            <Text style={{fontSize:15,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>입찰금액 : {price}원</Text>
            <Text style={{fontSize:15,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>거래유형 : {dealtype}</Text>
            <Text style={{fontSize:15,fontFamily:'NotoSansKR-Regular',lineHeight:20}}>사이즈 : {size}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',}}>
          <TouchableOpacity style={{flex:1,backgroundColor:'#477DD1',height:54,alignItems: 'center',justifyContent: 'center',borderRightWidth:1,borderRightColor:'#fff'}}>
            <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',color:'#fff'}}>거래 정보 확인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{alignSelf:'flex-end',paddingRight:10,fontSize:13,color:'#555',fontFamily:'NotoSansKR-Regular',lineHeight:20}}>오전 10:45</Text>
    </View>
  );
};

const ChatCont = () => {
  return(
    <View>
      <Text></Text>
    </View>
  );
};

export default ChatCont;
