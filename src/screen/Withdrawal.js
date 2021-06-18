import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {DetailHead} from '../components/header';
import API_CALL from '../ApiCall';


const Withdrawal = ({navigation}) => {
  const {member} = useSelector(state => state.login);
  const [memo,setMemo] = useState('');
  const [ischeck,setIsCheck] = useState(false)
  const memberout = async() => {
    try{
        const form = new FormData;
        form.append('method','proc_member_out');
        form.append('mt_idx',member.mt_idx)
        form.append('mt_retire_memo',memo)
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {
          data:{result,item,message}
        } = api;      
        console.log(result,item,message)
        if (result === '0') return Alert.alert('', message);
        if (result === '1') {
            navigation.navigate('WithdrawalComplete')
        } 
      } catch(e){
        console.log(e)
      }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DetailHead title="회원 탈퇴" />
      <View style={{height:80,backgroundColor:'#F8F8F8',justifyContent:'center',paddingLeft:'10%'}}>
        <Text style={{fontSize:14}}>회원 탈퇴시 모든 데이터가 삭제됩니다.</Text>
      </View>
      <View style={{padding:20}}>        
          <View style={{flexDirection:'row',marginBottom:10}}>
            <Text style={{color:'#477DD1'}}>*</Text><Text style={{fontSize:20,fontWeight:"bold"}}>탈퇴 사유를 입력해주세요</Text>
          </View>
          <TextInput
            style={{
                    borderWidth:1,
                    borderColor:'#eee',
                    borderRadius:10,
                    textAlignVertical:'top',
                    color:'#000',
                    paddingHorizontal:10,
                    paddingVertical:15
                }}
            placeholder="탈퇴 사유를 입력해주세요."
            placeholderTextColor="#C9C9C9"
            numberOfLines={8}
            multiline={true}
            onChangeText={text=>setMemo(text)}
            />
      </View>
      <View style={{paddingHorizontal:20}}>
        <TouchableOpacity style={{
                width:'100%',
                height:57,
                borderRadius:8,
                backgroundColor:'#477DD1',
                justifyContent:'center',
                alignItems:'center',
            }}
            onPress={()=>setIsCheck(true)}>
                <Text style={{color:'#fff',fontSize:16,fontFamily:'NotoSansKR-Bold'}}>탈퇴하기</Text>
            </TouchableOpacity>
        </View>
        <Modal
        visible={ischeck}
        animationType="fade"
        transparent={true}
        style={{ flex: 1 }}
        onRequestClose={() => setIsCheck(false)}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              paddingVertical: 30,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 20,
                paddingBottom: 10,
              }}>
              회원 탈퇴
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'NotoSansKR-Regular',
                lineHeight: 20,
                textAlign: 'center',
              }}>
              정말로 탈퇴 하시겠습니까?
            </Text>
            <View style={{ paddingTop: 20,flexDirection:'row' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  width: 70,
                  marginHorizontal:10
                }}
                onPress={()=>setIsCheck(false)}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    color: '#fff',
                    lineHeight: 20,
                  }}>
                  취소
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  width: 70,
                  marginBottom: 5,
                }}
                onPress={()=>memberout()}
                >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    color: '#fff',
                    lineHeight: 20,
                  }}>
                    확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


export default Withdrawal;
