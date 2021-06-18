import React, {useState,useCallback,useEffect} from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity, FlatList, Dimensions, Alert,SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';    
import styles from '../style/style';
import Header, {EstHeader} from '../components/header';
import EstList from '../components/estimateList';
import API_CALL from '../ApiCall';
import { useIsFocused  } from '@react-navigation/native';

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
const PADDING = 15;
const Box = (Width - PADDING * 2 - 20) /2



function EstimateScreen ({navigation}) {
    const isFocused = useIsFocused();
    const {member} = useSelector(state => state.login)

    const [pt_deal_type,setPt_deal_type] = useState('')
    const [search, setSearch] = useState('')
    const [idx, setIdx] = useState('')
    const [pt_image1,setPt_image] = useState('')

    const [pt_title, setPt_title] = useState('')
    const [td_price, setTd_price] = useState('')
    const [dday, setDday] = useState('')

    const [estData, setEstData] = useState([])

    useEffect(() => {
        if(isFocused){
            getEstData()
        }        
    },[isFocused])

    const getEstData = async() => {
        const form = new FormData()

        form.append('method', 'proc_my_estimate_list')
        form.append('mt_idx',member.mt_idx)
        form.append('pt_deal_type',pt_deal_type)
        form.append('search',search)
        form.append('idx',idx)
        form.append('pt_image1',pt_image1)
        form.append('pt_title',pt_title)
        form.append('td_price',td_price)
        form.append('dday',dday)
        const url = 'http://dmonster1566.cafe24.com'
        const path = '/json/proc_json.php'
        try{
            const api = await API_CALL(url+path, form, true)
            const {data : {method, result, message, count, item}} = api
            if(result === "0") return Alert.alert("",message)
            if(result === "1"){
                setEstData(item)
              
            }
        }catch(e){
            console.log(e)
           
        }
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff',}}>
            <EstHeader title="내 견적" setSearch={setSearch} search={search} getEstData={getEstData} setPt_deal_type={setPt_deal_type}/>
            <View style={{flex:1}}>
                <FlatList
                    style={{flex:1}}
                    data={estData}
                    renderItem={({item, index} ) => <EstItem item={item}/>}
                    keyExtractor={(item) => `${item.idx}`}
                    numColumns={2}
                />
            </View>
        </SafeAreaView>
    )
}

function EstItem({item}) {
    const navigation = useNavigation();
    
       return(
                 <TouchableOpacity
                 onPress={() => navigation.navigate('EstDetail',{
                    idx:item.idx
                 })}
                 style={{width:Box,alignItems: 'center', margin : 15}}>
                       <View style={{width:Box,height:Box,borderColor:'#e3e3e3',borderWidth:1,borderRadius:15,justifyContent:'center',alignItems:'center',marginBottom:10,overflow:'hidden'}}>
                           <Image
                               style={{width:'100%',height:'100%',resizeMode:'cover'}}
                               source={{uri: item.pt_image1}}
                           />
                       </View>
                       <Text
                         style={{fontSize:18,fontFamily:'NotoSansKR-Bold',lineHeight:30,alignSelf:'flex-start',width:'100%',paddingHorizontal:5}}
                         numberOfLines={1}
                         >{item.pt_title}</Text>
                       <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',paddingHorizontal:3,}}>
                           <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:18}}>내가 넣은 견적</Text>
                           <Text
                             style={{color:'#707070',fontSize:13,maxWidth:80,fontFamily:'NotoSansKR-Regular',lineHeight:18}}
                             numberOfLines={1}
                             >{item.td_price}원</Text>
                       </View>
                       <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',paddingHorizontal:3,}}>
                           <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:18}}>견적 마감</Text>
                           <Text style={{color:'#707070',fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:18}}>{item.dday}일 전</Text>
                       </View>
                 </TouchableOpacity>
       )
   }

export default EstimateScreen;
