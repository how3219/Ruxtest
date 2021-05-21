import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_CALL from '../ApiCall';

const ProductRegistCategory = ({navigation}) => {
    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent?.setOptions({ tabBarVisible: false });
        return () => parent?.setOptions({ tabBarVisible: true });
      }, []);

    const [ct_id, setId] = useState('')
    const [ct_name, setName] = useState('')

    const [item, setItem] = useState([]);

    useEffect(()=>{
        getCate()
    },[])

    const getCate = async () =>{
        const form = new FormData();
        form.append('method', 'proc_category_list')
        form.append('ct_id',ct_id)
        form.append('ct_name',ct_name)

        const url = 'http://dmonster1566.cafe24.com'
        const path = '/json/proc_json.php'

        const api = await API_CALL(url+path, form, true)
        const { data : { method, result, message, count, item} } = api;

        setItem(item)

    }
    console.log('item', item)

    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',height:60,justifyContent:'space-between',alignItems:'center',borderBottomColor:'#EEEEEE',borderBottomWidth:1,paddingHorizontal:20,}}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#aaa"/>
                </TouchableOpacity>
                <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>카테고리 선택</Text>
                <TouchableOpacity 
                style={{}}
                onPress={() => navigation.navigate('Main')}>
                    <Icon name="close" size={30} color="#AAAAAA"/>
                </TouchableOpacity>

            </View>
            <View style={{flex:1}}>
            {/* <TouchableOpacity 
                onPress={() => navigation.navigate('ProductRegistCategory1')}
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    padding:20,
                    borderBottomWidth:1,
                    borderBottomColor:'#eee',
                }}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>WOMEN</Text>
                <Icon name="ios-chevron-forward" size={20} color="#D8D8D8"/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('ProductRegistCategory1')}
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    padding:20,
                    borderBottomWidth:1,
                    borderBottomColor:'#eee',
                }}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>MEN</Text>
                <Icon name="ios-chevron-forward" size={20} color="#D8D8D8"/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('ProductRegistCategory1')}
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    padding:20,
                    borderBottomWidth:1,
                    borderBottomColor:'#eee',
                }}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>KIDS</Text>
                <Icon name="ios-chevron-forward" size={20} color="#D8D8D8"/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('ProductRegistCategory1')}
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    padding:20,
                    borderBottomWidth:1,
                    borderBottomColor:'#eee',
                }}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>UNISEX</Text>
                <Icon name="ios-chevron-forward" size={20} color="#D8D8D8"/>
            </TouchableOpacity> */}
            {item.map((item, i) => <TouchableOpacity 
                onPress={() => navigation.navigate('ProductRegistCategory1', {ct_id:item.ct_id, ct_name: item.ct_name})}
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    padding:20,
                    borderBottomWidth:1,
                    borderBottomColor:'#eee',
                }}
                key={i}
                >
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>{item.ct_name}</Text>
                <Icon name="ios-chevron-forward" size={20} color="#D8D8D8"/>
            </TouchableOpacity>)}
            </View>
        </SafeAreaView>
    );
};

export default ProductRegistCategory;