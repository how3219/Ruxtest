import React, {useState,useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,StyleSheet, ScrollView} from 'react-native';
import API_CALL from '../ApiCall';
import {DefaultHead} from '../components/header';

const NotiSetting = (props) => {
    const {navigation,route:{params}}=props;
    const [noticedetail,setNoticeDetail] = useState([])
    const getNotice = async() => {  
        try{
            let form = new FormData();  
            form.append('method', 'proc_notice_detail');
            form.append('idx', params.idx);
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, true);
            const {data:{result,message,item}} = api;
            if(result==='0'){Alert.alert('',message)}
            else if(result==='1'){
                setNoticeDetail(item[0])
            }
        } catch(e){
            console.log('Notice',e)   
        }
    }
    useEffect(() => {
        getNotice()       
    }, [])
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <DefaultHead/>
            <View style={{width:'100%',height:60,justifyContent:'center',paddingLeft:20,}}>
                <Text style={{fontSize:20,fontFamily:'NotoSansKR-Bold',textAlign:'center'}}>고객센터</Text>
            </View>
            {
                noticedetail&&noticedetail.nt_wdate?
                <ScrollView>
                    <TouchableOpacity 
                        style={styles.item}
                    >
                        <View style={{flex:1}}>
                        <Text style={styles.text} numberOfLines={1}>{noticedetail.nt_title}</Text>
                        <Text style={styles.date}>{String(noticedetail.nt_wdate).substring(0,noticedetail.nt_wdate.length-3)}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{padding:20,backgroundColor:'#eee',}}>
                        <Text>{noticedetail.nt_content}</Text>
                    </View>
                    <View style={{paddingHorizontal:20,marginTop:20}}>
                    <TouchableOpacity style={{
                        width:'100%',
                        height:57,
                        borderRadius:8,
                        backgroundColor:'#477DD1',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                    onPress={()=>navigation.goBack()}>
                        <Text style={{color:'#fff',fontSize:16,fontFamily:'NotoSansKR-Bold'}}>목록으로</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>:null
             }
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        height:70,
        justifyContent:'space-between',
        alignItems:'center',
        padding:20,
   
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