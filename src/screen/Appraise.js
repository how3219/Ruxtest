import React,{useEffect,useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import {AppraiseHeader} from '../components/header';
import {useSelector} from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import API_CALL from '../ApiCall';
const Width = Dimensions.get('window').width;
const BoxWidth = (Width - 60) / 2;

const Appraise = (props) => {
    const isfocused = useIsFocused();
    const {member} = useSelector(state => state.login);
    const [appraisallist,setAppraisallist] = useState([]);
    const [search,setSearch] = useState('');
    const [type,setType]= useState('');
    const getappraiallist = async() => {
        const form = new FormData();
        form.append('method', 'proc_appraisal_request_list');
        form.append('mt_id', member.mt_idx);
        search?form.append('search',search):null
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        const {
            data: {item, result,message},
        } = api;
        if (result === '0') return Alert.alert('', message);
        if (result === '1') {
            setAppraisallist(item)
        }
    }
    useEffect(() => {
        if(isfocused)getappraiallist();        
    }, [isfocused])
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <AppraiseHeader title="감정신청" setSearch={setSearch} search={search} getappraiallist={getappraiallist} setType={setType} getappraiallist={getappraiallist}/>
            <View style={{paddingHorizontal:10,}}>
                <FlatList
                    data={appraisallist}
                    renderItem={({item, index} ) => <RenderItem item={item} navigation={props.navigation}/>}
                    keyExtractor={(item) => `${item.ar_id}`}
                    numColumns={2}
                />
            </View>
        </SafeAreaView>
    );
};

const RenderItem = ({item: AppraiseItems,navigation}) => {
    return(
        <TouchableOpacity 
          style={{
              borderWidth:1,
              borderColor:'#eee',
              borderRadius:15,
              width:BoxWidth,
              padding:20,
              margin:10,
          }}
          onPress={()=>navigation.push('AppraiseDetail',{ar_id:AppraiseItems.ar_id})}
          >
            <Text 
                style={{fontSize:15,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}
                numberOfLines={1}
                >{AppraiseItems.item_name}</Text>
            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',lineHeight:20,paddingBottom:6,}}>{AppraiseItems.brand}</Text>
            <View style={{borderWidth:1,borderColor:'#447DD1',borderRadius:8,width:75,height:26,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#447DD1'}}>{AppraiseItems.status=='1'?'감정대기':AppraiseItems.status=='2'?'감정진행중':'감정완료'}</Text>
            </View>
            <View style={{borderWidth:1,borderColor:'#447DD1',borderRadius:8,width:75,height:26,justifyContent:'center',alignItems:'center',marginVertical:5,backgroundColor:'#447DD1'}}>
                <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'white'}}>{AppraiseItems.appraisal_yn=='1'?'감정신청':AppraiseItems.appraisal_yn=='2'?'감정진행중':AppraiseItems.appraisal_yn=='3'?'가품':'정품'}</Text>
            </View>
            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20,}}>{AppraiseItems.ar_wdate.split(' ')[0]}</Text>
        </TouchableOpacity>
    );
};

export default Appraise;