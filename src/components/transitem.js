import React from 'react';
import {FlatList, TouchableOpacity, View, Image, Text,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
const TransList = (props) => {
    const {item:itemlist} = props;    
    return(
        <FlatList
            style={{flex:1}}
            data={itemlist}
            renderItem={({item, index} ) => <TransItem item={item}/>}
            keyExtractor={(item) => `${item.idx}`}
            showsVerticalScrollIndicator={false}
        />
    );
};

function TransItem({item : transItem}){
    const navigation = useNavigation();
    return(
        transItem?
        <TouchableOpacity 
            style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                borderBottomWidth:1,
                borderBottomColor:'#eee',
                paddingVertical:14,
                }}
                onPress={()=>transItem&&transItem.list&&navigation.navigate('OrderInformation',{
                    idx:transItem&&!transItem.list?transItem.idx:transItem&&transItem.list&&transItem.list.idx,
                    pt_deal_type:transItem&&!transItem.list?transItem.pt_deal_type:transItem&&transItem.list&&transItem.list.pt_deal_type,
                })}
        >
            <TouchableOpacity
                style={{width:20,height:20,position:'absolute',top:4,right:0,}}
                >
                <Icon name="close" size={20} color="#AAAAAA"/>
            </TouchableOpacity>
            <View style={{width:62,height:62,borderRadius:31,overflow:'hidden',marginRight:10,}}>
                <Image 
                    style={{resizeMode:'cover',width:'100%',height:'100%',}}
                    source={{uri:transItem&&!transItem.list?transItem.pt_image1:transItem.list.pt_image1}}
                />
            </View>
            <View style={{flexGrow:1}}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,paddingBottom:4,width:150}}
                numberOfLines={1}>{transItem&&!transItem.list?transItem.pt_title:transItem.list.pt_title}</Text>
                <Text style={{fontFamily:'NotoSansKR-Medium',lineHeight:16,fontSize:13,}}>구매가 <Text style={{fontFamily:'NotoSansKR-Regular',color:'#555'}}>{transItem&&!transItem.list?transItem.td_price:transItem.list.td_price}</Text></Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#5E5E5E',paddingRight:6,}}>{transItem&&!transItem.list?transItem.mt_nickname:transItem.list.mt_nickname}</Text>
                    <Text style={{fontSize:12,fontFamily:'NotoSansKR-Regular',lineHeight:20,color:'#B9B9B9',paddingRight:6,}}>{transItem&&!transItem.list?transItem.mt_company_name:transItem.list.mt_company_name}</Text>
                    <Text style={{fontSize:12,fontFamily:'NotoSansKR-Regular',lineHeight:20,color:'#B9B9B9'}}>{transItem&&!transItem.list?transItem.td_date:transItem.list.td_date}</Text>
                </View>
            </View>
            <TouchableOpacity 
                style={{
                    backgroundColor:'#447DD1',
                    height:32,
                    width:80,
                    borderRadius:9,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                <Text style={{fontFamily:'NotoSansKR-Medium',color:'#fff',fontSize:13,lineHeight:20,}}>{transItem&&!transItem.list?transItem.payment_type:transItem.list.payment_type}</Text>
            </TouchableOpacity>
        </TouchableOpacity>:null
    );
};

export default TransList;