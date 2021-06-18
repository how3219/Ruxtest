import React, {useState,useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_CALL from '../ApiCall';
import {MypageHeader} from '../components/header';

const NotiSetting = ({navigation}) => {
    const [notice,setNotice] = useState([])
    const getNotice = async() => {
        try{
            let form = new FormData();
            form.append('method', 'proc_notice_list');
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, true);
            const {data:{result,message,item}} = api;
            if(result==='0'){Alert.alert('',message)}
            else if(result==='1'){
                setNotice(item)
            }
        } catch(e){
            console.log('Faq',e)   
        }
    }
    useEffect(() => {
        getNotice()       
    }, [])
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <MypageHeader/>
            <View style={{width:'100%',height:60,justifyContent:'center',paddingLeft:20,borderBottomColor:'#eee',borderBottomWidth:1}}>
                <Text style={{fontSize:20,fontFamily:'NotoSansKR-Bold',textAlign:'center'}}>고객센터</Text>
            </View>
            <ScrollView style={{flex:1}}>
            {
                notice?.map((rows,index)=>{
                    return(
                        <>
                            <TouchableOpacity 
                                style={styles.item}
                                key={index}
                                onPress={()=>navigation.push('NoticeDetail',{idx:rows.idx})}
                            >
                                <View style={{flex:1}}>
                                <Text style={styles.text} numberOfLines={1}>{rows.nt_title}</Text>
                                <Text style={styles.date}>{String(rows.nt_wdate).substring(0,rows.nt_wdate.length-3)}</Text>
                                </View>
                                    <Icon name={"chevron-forward"} size={30} color="#C9C9C9"/>
                            </TouchableOpacity>
                            
                        </>
                    )
                })
            }
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        height:70,
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    text: {
        fontSize:16,
        lineHeight:25,
        fontFamily:'NotoSansKR-Regular',
        fontWeight:'bold'
    },
    date: {
        fontSize:12,
        lineHeight:25,
        fontFamily:'NotoSansKR-Regular',
        color:'#C9C9C9'
    }
})

export default NotiSetting;