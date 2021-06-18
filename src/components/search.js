import React, {useState,useEffect} from 'react';
import {View, Text, TouchableOpacity,TextInput,Alert} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import API_CALL from '../ApiCall';
import {Sch_history, Key_alert} from '../components/searchKeyword';
import { useIsFocused,useNavigation } from '@react-navigation/native';
const Search = ({ModalOpenClose}) => {
    const isfocused = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {member} = useSelector(state => state.login);
    const [searchlist,setSearchList] = useState([]);
    const [keywordlist,setKeywordList] = useState([]);
    const [keyword, setKeyword] = useState(member.mt_pushing6); 
    const [key,setKey] = useState('');
    const [search,setSearch] = useState('')
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
            getkeywordList();
        }
    }
    const getsearch = async() => {
        try{
            const form = new FormData
            form.append('method','proc_search_list')
            form.append('mt_idx',member.mt_idx)
            const url = 'http://dmonster1566.cafe24.com'
            const params = '/json/proc_json.php'
            const api = await API_CALL(url+params, form, false)
            const { data:{result,message,item} } = api;
            if(result === '0') return Alert.alert("",message)
            if(result === '1') {
                if(item){
                    setSearchList(item)
                }else{
                    setSearchList([])
                }
            }
        }catch(e){
            console.log('getsearch',e)
        }  
    }
    const getkeywordList = async()=>{
        try{
            const form = new FormData
            form.append('method','proc_keyword_list')
            form.append('mt_idx',member.mt_idx)
            const url = 'http://dmonster1566.cafe24.com'
            const params = '/json/proc_json.php'
            const api = await API_CALL(url+params, form, false)
            const { data:{result,message,item} } = api;
            if(result === '0') return Alert.alert("",message)
            if(result === '1') {
                if(item){
                    setKeywordList(item)
                }else{
                    setKeywordList([])
                }
            }
        }catch(e){
            console.log('keywordList',e)
        }
    }
    const pushSetting = async(val) => {
        const form = new FormData()
        form.append('method', 'proc_push_config')
        form.append('mt_idx', member.mt_idx)
        form.append('mt_pushing6', keyword)
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
            setKeyword(val)                     
        }
    }
    const keywordSearch = async(slt_txt=null)=>{
        const form = new FormData()
        form.append('method', 'proc_search_keyword')
        slt_txt?form.append('slt_txt', slt_txt):form.append('slt_txt', search)
        form.append('mt_idx', member.mt_idx)
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {data: {result, message,item},} = api;
        if (result === '0') {
            return Alert.alert('', message);
        } else if (result === '1') { 
            navigation.navigate('KeywordList',{keywordlist:item})
            ModalOpenClose(false)
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
            getkeywordList()      
        }
    }
    const delsearch = async(idx) => {
        const form = new FormData()
        form.append('method', 'proc_search_delete')
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
            getsearch()      
        }
    }
    useEffect(() => {
        if(isfocused){
            getsearch();
            getkeywordList();
        }
    }, [isfocused])
    return(
        <View style={{flex:1,padding:20}}>
            <View style={{paddingBottom:15,}}>
                <Text style={{fontFamily:'NotoSansKR-Bold',fontSize:16,lineHeight:20,paddingBottom:15,}}>키워드 검색</Text>
                <View style={{
                    height:45,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    borderWidth:1,
                    borderColor:'#eee',
                    borderRadius:8,
                    paddingLeft:10,}}>
                        <Text style={{fontSize:20,color:'#707070',fontFamily:'NotoSansKR-Regular',lineHeight:24,}}>#</Text>
                        <TextInput
                            style={{flex:1,fontSize:13,color:'#000'}}
                            placeholder="키워드를 입력해주세요."
                            placeholderTextColor="#C9C9C9"
                            onChangeText={text=>setSearch(text)}
                        /> 
                        <TouchableOpacity style={{width:40,justifyContent:'center',alignItems:'center'}}
                        onPress={()=>keywordSearch()}>
                            <Icon name="search" size={24} color="#477DD1"/>
                        </TouchableOpacity>
                </View>
            </View>
            <View style={{borderBottomWidth:1,borderBottomColor:'#eee',paddingBottom:50,marginBottom:20,}}>
                <Text style={{fontFamily:'NotoSansKR-Medium',fontSize:13,color:'#999999',lineHeight:18,paddingBottom:15,}}>검색기록</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',}}>
                {searchlist&&<Sch_history searchlist={searchlist} delsearch={delsearch} setSearch={setSearch} keywordSearch={keywordSearch}/>}
                </View>
            </View>
            <View>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold'}}>키워드 알림 설정</Text>
                <View style={{
                    flexDirection:'row',
                    width:100,
                    backgroundColor:'#DEDEDE',
                    borderRadius:8,
                    height:30,
                    marginBottom:15,
                    }}>
                    <TouchableOpacity 
                    onPress={() => {pushSetting('Y')}}
                    style={{
                        width:50,
                        height:30,
                        borderRadius:8,
                        backgroundColor: keyword === 'Y' ? '#477DD1' : null, 
                        alignItems:'center',
                        justifyContent:'center'
                        }}>
                        <Text style={{color:keyword === 'Y' ? '#fff' : '#B5B5B5',fontFamily:'NotoSansKR-Medium',lineHeight:24,}}>ON</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => {pushSetting('N')}}
                    style={{
                        width:50,
                        height:30,
                        borderRadius:8,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor: keyword === 'N' ? '#477DD1' : null,
                        }}>
                        <Text style={{color:keyword === 'N' ? '#fff' : '#B5B5B5' ,fontFamily:'NotoSansKR-Medium',lineHeight:24,}}>OFF</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{
                        height:45,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        borderWidth:1,
                        borderColor:'#eee',
                        borderRadius:8,
                        paddingLeft:10,
                        flex:1,
                        marginRight:5,}}>
                            <Text style={{fontSize:20,color:'#707070',fontFamily:'NotoSansKR-Regular',lineHeight:24,}}>#</Text>
                            <TextInput
                                style={{flex:1,fontSize:13,color:"#000"}}
                                placeholder="키워드를 입력해주세요."
                                placeholderTextColor="#C9C9C9"
                                onChangeText={text=>setKey(text)}
                            /> 
                    </View>
                    <TouchableOpacity style={{
                        height:45,
                        width:100,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#447DD1',
                        borderRadius:8,
                    }}
                    onPress={()=>addkeyword()}>
                        <Text style={{color:'#fff',fontFamily:'NotoSansKR-Medium',fontSize:14,}}>키워드 추가</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:15,}}>
                    <View style={{flexDirection:'row', flexWrap:'wrap',}}>
                        <Key_alert list={keywordlist} delkeyword={delkeyword}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Search;