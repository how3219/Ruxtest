import React, {useState,useEffect} from 'react';
import {SafeAreaView, View, Text,TouchableOpacity, TextInput,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector,useDispatch} from 'react-redux';
import {MypageHeader} from '../components/header';
import API_CALL from '../ApiCall';
const KeywordSet = ({navigation}) => {
    const {member} = useSelector(state => state.login);
    const dispatch = useDispatch()
    const [keywordlist,setKeywordList] = useState([]);
    const [key,setKey] = useState('');
    const [state,setState] = useState(member.mt_pushing6);
    useEffect(() => {
       getkeyword()                 
    }, [])
    const getkeyword = async() => {
        const form = new FormData()
        form.append('method', 'proc_keyword_list')
        form.append('mt_idx', member.mt_idx)
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        console.log(form)
        const {
        data: {result, message,item},
        } = api;
        if (result === '0') {
            return Alert.alert('', message);
        } else if (result === '1') { 
            console.log(item)
            if(item)setKeywordList(item)
        }
    }
    const delkeyword = async(idx) => {
        const form = new FormData()
        form.append('method', 'proc_keyword_delete')
        form.append('idx', idx)
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {
        data: {result, message,item},
        } = api;
        if (result === '0') {
            return Alert.alert('', message);
        } else if (result === '1') {   
            getkeyword()      
        }
    }
    const addkeyword = async() => {
        const form = new FormData()
        form.append('method', 'proc_keyword_add')
        form.append('mt_idx', member.mt_idx)
        form.append('slt_keyword', key)        
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {
        data: {result, message,item},
        } = api;
        if (result === '0') {
            return Alert.alert('', message);
        } else if (result === '1') { 
            getkeyword();
        }
    }
    const pushSetting = async(val) => {
        const form = new FormData()
        form.append('method', 'proc_push_config')
        form.append('mt_idx', member.mt_id)
        form.append('mt_pushing6', state)
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {
        data: {result, message,item},
        } = api;
        if (result === '0') {
            return Alert.alert('', message);
        } else if (result === '1') { 
            let body = Object.assign({},member)
            body.mt_pushing6 = val;
            dispatch({
                type : 'LOGIN',
                payload :body
            })
            setState(val)                     
        }
    }
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <MypageHeader/>
            <View style={{flex:1, padding:20,}}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>키워드 알림 설정</Text>
                <View style={{width:102,height:35,borderRadius:8,backgroundColor:'#DEDEDE',flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:10,}}>
                    <TouchableOpacity 
                    onPress ={() => {pushSetting('Y')}}
                    style={{
                        width:51,
                        height:35,
                        borderRadius:8,
                        backgroundColor: state === 'Y' ? '#477DD1' : null,
                        justifyContent:'center',
                        alignItems:'center',
                    }}> 
                        <Text 
                        style={{
                            color: state === 'Y' ? '#fff' : '#999999',
                            fontFamily:'NotoSansKR-Bold',
                            lineHeight:20,
                        }}>ON</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress ={() => {pushSetting('N')}}
                    style={{
                        width:51,
                        height:35,
                        borderRadius:8,
                        backgroundColor: state === 'N' ? '#477DD1' : null,
                        justifyContent:'center',
                        alignItems:'center',
                    }}> 
                        <Text 
                        style={{
                            color: state === 'N' ? '#fff' : '#999999',
                            fontFamily:'NotoSansKR-Bold',
                            lineHeight:20,
                        }}>OFF</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <View style={{
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:8,
                        flexDirection:'row',
                        alignItems:'center',
                        height:45,
                        paddingHorizontal:10,
                        flex:1,
                        }}>
                        <Text style={{fontSize:20,color:'#707070',fontFamily:'NotoSansKR-Regular',lineHeight:26,}}>#</Text>
                        <TextInput
                            style={{padding:0,paddingLeft:7,flex:1,height:45,color:'#000'}}
                            placeholder="키워드를 입력해주세요."
                            placeholderTextColor="#C9C9C9"
                            onChangeText={text=>setKey(text)}
                        />
                    </View>
                    <TouchableOpacity style={{
                        width:93,
                        height:45,
                        backgroundColor:'#477DD1',
                        borderRadius:8,
                        justifyContent:'center',
                        alignItems:'center',
                        marginLeft:5,
                    }}
                    onPress={()=>addkeyword()}>
                        <Text style={{fontSize:13,fontFamily:'NotoSansKR-Bold',color:'#fff'}}>키워드 추가</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection:'row',
                    paddingVertical:16,
                    flexWrap:'wrap', 
                }}>
                   {keywordlist?.map((keyitem) => (
                        <Array key={keyitem.idx} keyitem={keyitem} delkeyword={delkeyword}/>
                    ))} 
                </View>
            </View>
        </SafeAreaView>
    );
};

function Array({keyitem,delkeyword}){
    return(
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            backgroundColor:'#F8F8F8',
            paddingHorizontal:8,
            paddingVertical:7,
            borderRadius:8,
            marginBottom:5,marginRight:5,
        }}>
            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:16,color:'#707070',paddingRight:5}}># {keyitem.slt_keyword}</Text>
            <TouchableOpacity onPress={()=>{delkeyword(keyitem.idx)}}>
                  <Icon name="close" size={13} color="#707070" />
            </TouchableOpacity>
        </View>
    );
}


export default KeywordSet;