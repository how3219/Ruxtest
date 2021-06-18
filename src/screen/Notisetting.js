import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {MypageHeader} from '../components/header';

const NotiSetting = ({navigation}) => {
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <MypageHeader/>
            <View style={{width:'100%',height:60,justifyContent:'center',paddingLeft:20,}}>
                <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold'}}>알림설정</Text>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity 
                    style={styles.item}
                    onPress={() => navigation.navigate('KeywordSet')}
                    >
                    <Text style={styles.text}>키워드 알림 설정</Text>
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

export default NotiSetting;