import React,{useEffect,useState} from 'react';
import {View,FlatList,Text,Image,TouchableOpacity,Alert} from 'react-native';
import API_CALL from '../ApiCall';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import  {ChatHeader} from '../components/header';


const ChatList  = () => {
  const isfocused = useIsFocused()
  const {member} = useSelector(state => state.login);
  const [chatList,setChatList] = useState([])
  const [search,setSearch] = useState('')
  useEffect(() => {
    if(isfocused)getChatList()
  }, [isfocused])
  useEffect(() => {
    getChatList()
  }, [member.mb_type])
  const getChatList = async() => {
    try{
      const form = new FormData;
      form.append('method',member.mb_type==="B"?'proc_chat_list':'proc_chat_sell_list')    
      form.append('m_idx',member.mt_idx)
      search?form.append('search',search):null
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
        const {
          data:{result,item,message}
        } = api;
        if (result === '0') return Alert.alert('chatlist no result', message);
        if (result === '1') {
          setChatList(item)
        }
    }catch(e){
      console.log('getChatlist',e)
    }
  }
  
  return(
    <>
    <ChatHeader title="채팅" setSearch={setSearch} search={search} getChatList={getChatList}/>
    <FlatList
        style={{flex:1,paddingHorizontal: 20}}
        data={chatList}
        renderItem={({item, index} ) => <ChatItem item={item} id={member.mt_idx}/>}
        keyExtractor={(item) => `${item.idx}`}
        numColumns={1}
    />
    </>
  );
};

function ChatItem({item: renderItems,id}){
  const navigation = useNavigation();
  return(
    <TouchableOpacity
    onPress={() => navigation.navigate('ChatDetail',{
      m_idx:id,
      mt_idx:renderItems.idx,
      td_idx:renderItems.td_idx
    })}
    style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#eee',paddingBottom:12,marginBottom:12,}}>
        <View style={{width:62,height:62,borderWidth:2,borderColor:'#eee',borderRadius:31,marginRight:20,}}>
              <Image
                style={{resizeMode:'cover',width:'100%',height:'100%'}}
                source={{uri:renderItems&&renderItems.mt_image1?renderItems.mt_image1:null}}
              />
        </View>
        <View style={{flexGrow:1,}}>
          <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:22,maxWidth:220}} numberOfLines={1}>{renderItems.pt_title}</Text>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Bold',lineHeight:16,color:'#333',paddingRight:20,}}>내가 넣은 견적</Text>
            <Text style={{fontSize:13,color:'#555',fontFamily:'NotoSansKR-Regular',lineHeight:16}}>{renderItems.price}</Text>
          </View>
          <Text
            numberOfLines={1}
            style={{fontSize:13,color:'#999',maxWidth: 220,fontFamily:'NotoSansKR-Regular',lineHeight:20,}}
            >{renderItems.msg}</Text>
          <View style={{flexDirection:'row',alignItems:'center',}}>
            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Bold',lineHeight:16,color:'#5E5E5E',paddingRight:10,}}>{renderItems.mt_name}</Text>
            <Text style={{fontSize:12,fontFamily:'NotoSansKR-Bold',lineHeight:16,color:'#B9B9B9'}}>샤넬 종로점</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{fontSize:10,color:'#999',paddingBottom:10,}}>{renderItems.make_date}</Text>
          {renderItems&&renderItems.read_cnt>0&&
          <View style={{width:26,height:26,backgroundColor:'#477DD1',alignItems: 'center',justifyContent: 'center',borderRadius: 13,}}>
            <Text style={{color:'#fff',fontSize:13,fontFamily:'NotoSansKR-Bold',lineHeight:16}}>{renderItems.read_cnt}</Text>
          </View>
          }
        </View>
    </TouchableOpacity>
  );
};

export default ChatList;
