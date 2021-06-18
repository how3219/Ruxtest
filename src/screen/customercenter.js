import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {MypageHeader} from '../components/header';

const CustomerCenter = ({navigation}) => {
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <MypageHeader/>
            <View style={{width:'100%',height:60,justifyContent:'center',paddingLeft:20,}}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold'}}>고객센터</Text>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={() => navigation.navigate('ScamPrevention')}
                    >
                    <Text style={styles.text}>사기방지 가이드</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={()=>navigation.push('Notice')}
                    >
                    <Text style={styles.text}>공지사항</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
                {/* 따로만들어야함 */}
                <TouchableOpacity 
                    style={styles.item}
                    onPress={()=>{navigation.push('Question')}}
                    >
                    <Text style={styles.text}>1:1 문의</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={()=>navigation.push('Faq')}
                    >
                    <Text style={styles.text}>FAQ</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={() => navigation.navigate('Useredit',{type:'Privacy'})}
                    >
                    <Text style={styles.text}>개인정보처리방침</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        backgroundColor:'#F8F8F8',
                        flexDirection:'row',
                        height:50,
                        justifyContent:'space-between',
                        alignItems:'center',
                        paddingHorizontal:20,
                        borderBottomColor:'#eee',
                        borderBottomWidth:0,
                    }}
                    onPress={() => navigation.navigate('Useredit',{type:'terms'})}
                    >
                    <Text style={styles.text}>이용약관</Text>
                    <Icon name="chevron-forward" size={20} color="#AAAAAA"/>
                </TouchableOpacity>
            </View>
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
        fontSize:15,
        lineHeight:20,
        fontFamily:'NotoSansKR-Regular',
    }
})

export default CustomerCenter;