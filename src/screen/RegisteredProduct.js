import React,{useEffect,useState} from 'react';
import {SafeAreaView,View,Text,Image,TouchableOpacity,Dimensions,FlatList, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RPHeader} from '../components/header';
import API_CALL from '../ApiCall';
import { useIsFocused } from '@react-navigation/native';
export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
const PADDING = 20;
const Box = (Width - PADDING * 2 - 20) /2

const RegisteredProduct = ({navigation}) => {
    const isfocused = useIsFocused()
    const [enrollment, setEnrollment] = useState([])
    const [search,setSearch] = useState('')
    const [search_type,setSearchType]= useState('pt_title')
    const {member} = useSelector(state => state.login)
    
    useEffect(() => {
        if(isfocused)getEnrollment()
    }, [isfocused])
    const getEnrollment= async() => {
        try{
            const form = new FormData;
            form.append('method','proc_item_list')
            form.append('mt_idx',member.mt_idx)
            search_type&&form.append('search_type',search_type)
            search&&form.append('search',search)
            console.log(form)
            const url = 'http://dmonster1566.cafe24.com'
            const params = '/json/proc_json.php'
            const api = await API_CALL(url+params, form, false)
            const { data:{result,item,message} } = api;
            if(result==='0') return Alert.alert('',message)
            if(result==='1'){
                console.log(item)
                setEnrollment(item)
            }
        }catch(e){

        }
    }
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <RPHeader title="등록물품" search={search} setSearch={setSearch} getEnrollment={getEnrollment} setSearchType={setSearchType}/>
            <View style={{flex:1,paddingHorizontal:20,}}>
                <FlatList
                style={{flex:1}}
                data={enrollment}
                renderItem={({item, index}) => <RPlist item={item}/>}
                keyExtractor={(item) => `${item.idx}`}
                numColumns={2}
                />
            </View>
        </SafeAreaView>
    );
};

const RPlist = ({item : RPitem}) => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity
        onPress={() => navigation.navigate('ReigsteredProductInfo',{
            idx:RPitem.idx
        })}
        style={{
            width:Box,
            margin:5,
        }}> 
            <View 
            style={{
                borderWidth:1,
                borderColor:'#eee',
                borderRadius:11,
                overflow:'hidden',
                backgroundColor:'#fff',
                width:Box,
                height:Box,
                marginBottom:20,
            }}>
                <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}> 
                    <Image
                        style={{resizeMode:'cover',width:'100%',height:'100%'}}
                        source={{uri:RPitem.pt_image1}}
                    />
                </View>
            </View>
            <Text
            style={{
                fontSize:18,
                fontFamily:'NotoSansKR-Bold',
                lineHeight:20,
                paddingBottom:6,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
            >{RPitem.pt_title}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:4,}}>
                <View style={{flex:1,height:26,borderWidth:1,borderColor:'#447DD1',borderRadius:9,justifyContent:'center',alignItems:'center',marginRight:5,}}>
                    <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#447DD1'}}>{RPitem.pt_sale_now==='Y'?'노출':'비노출'}</Text>
                </View>
                <View style={{flex:1,height:26,backgroundColor:'#447DD1',borderRadius:9,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#fff'}}>{`정품`}</Text>
                </View>
            </View>    
            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:20,color:'#555'}}>{RPitem.pt_wdate}</Text>
        </TouchableOpacity>
    );
}

export default RegisteredProduct;