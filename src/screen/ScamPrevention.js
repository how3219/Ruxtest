import React,{useEffect,useState} from 'react';
import {SafeAreaView,View,Text, Alert, ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import API_CALL from '../ApiCall';
import Icon from 'react-native-vector-icons/Ionicons';
const ScamPrevention = (props) => {
    const {navigation} = props;
    const [caution,setCaution] = useState('')
    useEffect(() => {
        getScamPrevention()       
    }, [])
    const getScamPrevention = async() => {
       try{
            const form = new FormData()
            form.append('method', 'proc_protection')
            const url = 'http://dmonster1566.cafe24.com'
            const path = '/json/proc_json.php'
            const api = await API_CALL(url+path, form, false)
            const { data:{result,item,message}} = api;   
            if(result==='0'){Alert.alert('',message)}
            else if(result==='1'){
                setCaution(item)
            }
        }catch(e){
            console.log(e)
        }
    }
   
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',height:60,justifyContent:'space-between',alignItems:'center',borderBottomColor:'#EEEEEE',borderBottomWidth:1,paddingHorizontal:20,}}>
                <View style={{width:30,height:30}}></View>
                <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>게시물 등록</Text>
                <TouchableOpacity 
                style={{}}
                onPress={()=>navigation.goBack()}
               >
                    <Icon name="close" size={30} color="#AAAAAA"/>
                </TouchableOpacity>

            </View>
            <ScrollView>
                <View style={{
                    backgroundColor:'#ebebeb',
                    justifyContent:'center',
                    alignItems:'center',
                    height:54,
                }}>
                    <Text style={{
                        fontSize:16,
                        fontFamily:'NotoSansKR-Medium'
                    }}>판매자 간편등록시 주의사항 및 동의사항</Text>
                </View> 
                <View style={{padding:20,backgroundColor:'#f8f8f8'}}>
                    <View style={styles.textbox}>
                        <Text style={styles.content}>{caution?caution:null}</Text>
                    
                    </View>
                  
                    <TouchableOpacity 
                    style={{
                        backgroundColor: '#447DD1',
                        height:56,
                        width:'100%',
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:8,
                    }}
                    onPress={() => navigation.goBack()}
                    >
                        <Text style={{
                            fontSize:16,
                            color:'#fff',
                            fontFamily:'NotoSansKR-Medium',
                        }}>확인</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    title:{
        fontSize:13,
        fontFamily:'NotoSansKR-Medium',
        lineHeight:24,
        color:'#222'
    },
    content:{
        fontSize:13,
        fontFamily:'NotoSansKR-Regular',
        lineHeight:20,
        color:'#444'
    },
    textbox:{
        paddingBottom:30,
    }
})
export default ScamPrevention;