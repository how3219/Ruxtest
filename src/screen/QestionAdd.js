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


const QestionAdd = ({navigation}) => {
  const {member} = useSelector(state => state.login);
  const [memo,setMemo] = useState('');
  const [title,setTitle] = useState('');

  const result = async() => {
    try{
        const form = new FormData;
        form.append('method','proc_qna');
        form.append('mt_idx',member.mt_idx)
        form.append('qt_title',title)
        form.append('qt_content',memo)
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {
          data:{result,item,message}
        } = api;      
        if (result === '0') return Alert.alert('', message);
        if (result === '1') {
            Alert.alert('', message);
            navigation.goBack();
        } 
      } catch(e){
        console.log(e)
      }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DetailHead title="문의글 적기" />
      <View style={{padding:20}}>        
          <View style={{flexDirection:'row',marginBottom:10}}>
           <Text style={{fontSize:20,fontWeight:"bold",color:'#000',fontFamily:'NotoSansKR-Bold'}}>문의 제목</Text>
          </View>
          <TextInput
            style={{
                    borderWidth:1,
                    borderColor:'#eee',
                    borderRadius:10,
                    textAlignVertical:'top',
                    color:'#000',
                    paddingHorizontal:10,
                }}
            placeholder="문의 제목을 입력하세요."
            placeholderTextColor="#C9C9C9"
            multiline={true}
            onChangeText={text=>setTitle(text)}
            />
      </View>
      <View style={{paddingHorizontal:20}}>        
          <View style={{flexDirection:'row',marginBottom:10}}>
           <Text style={{fontSize:20,fontWeight:"bold",color:'#000',fontFamily:'NotoSansKR-Bold'}}>문의 내용</Text>
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
            placeholder="문의 내용을 자유롭게 남겨주세요."
            placeholderTextColor="#C9C9C9"
            numberOfLines={20}
            multiline={true}            
            onChangeText={text=>setMemo(text)}
            />
      </View>
      <View style={{padding:20,flexDirection:'row',}}>
        <TouchableOpacity style={{
                width:'48%',
                height:57,
                borderRadius:8,
                backgroundColor:'#EBEBEB',
                justifyContent:'center',
                alignItems:'center',
                marginRight:13
            }}
          >
                <Text style={{color:'#000',fontSize:16,fontFamily:'NotoSansKR-Bold'}}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
               width:'48%',
                height:57,
                borderRadius:8,
                backgroundColor:'#477DD1',
                justifyContent:'center',
                alignItems:'center',
            }}
            onPress={()=>result()}
          >
                <Text style={{color:'#fff',fontSize:16,fontFamily:'NotoSansKR-Bold'}}>저장</Text>
            </TouchableOpacity>
        </View>     
    </SafeAreaView>
  );
};


export default QestionAdd;
