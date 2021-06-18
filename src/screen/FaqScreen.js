import React, {useState,useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_CALL from '../ApiCall';
import {MypageHeader} from '../components/header';

const NotiSetting = ({navigation}) => {
    const [faq,setFaq] = useState([])
    const [current,setCurrent] = useState('');
    const getNotice = async() => {
        try{
            let form = new FormData();
            form.append('method', 'proc_faq_list');
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, true);
            const {data:{result,message,item}} = api;
            if(result==='0'){Alert.alert('',message)}
            else if(result==='1'){
                console.log(item)
                setFaq(item)
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
            <View style={{width:'100%',height:60,justifyContent:'center',paddingLeft:20,}}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold'}}>FAQ</Text>
            </View>
            <ScrollView style={{flex:1}}>
            {
                faq?.map((rows,index)=>{
                    return(
                        <>
                            <TouchableOpacity 
                                style={styles.item}
                                key={rows.fa_id}
                                onPress={() => setCurrent(rows.fa_id!==current?rows.fa_id:'')}
                            >
                                <Text style={styles.text}>{rows.fa_subject}</Text>
                                <Icon name={rows.fa_id===current?"chevron-down":"chevron-forward"} size={20} color="#AAAAAA"/>
                            </TouchableOpacity>
                            {
                                rows.fa_id===current&&
                                <View style={{backgroundColor:'#fff',
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center',
                                paddingHorizontal:20,
                                }}>
                                    <Text style={styles.content}>{rows.fa_content}</Text>
                                </View>
                            }
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
        backgroundColor:'#F8F8F8',
        flexDirection:'row',
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    text: {         
        fontWeight:'800',       
        fontSize:15,
        lineHeight:25,
        fontFamily:'NotoSansKR-Regular',
    },
    content:{
        paddingVertical:20,
        fontSize:15,
        lineHeight:25,
        fontFamily:'NotoSansKR-Regular',
    }
})

export default NotiSetting;