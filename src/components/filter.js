import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {FtrBrand, FtrCategory, FtrType, FtrPrice} from './filterItem';

const Height = Dimensions.get('window').height - 70;

const PrdFilter = () => {
    return(
        <View style={{
            paddingHorizontal:20,
            paddingTop:20,
            backgroundColor:'#fff',
            height:Height,
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>쇼핑몰 필터</Text>
                <View style={{paddingBottom:30,}}>
                    <Text style={styles.title}>브랜드 
                    <Text style={{fontSize:12,color:'#B7B7B7'}}>  (선택1)</Text></Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap',}}>
                        <FtrBrand/>
                    </View>
                </View>
                <View style={{paddingBottom:30,}}>
                    <Text style={styles.title}>카테고리 
                    <Text style={{fontSize:12,color:'#B7B7B7'}}>  (선택1)</Text></Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap',}}>
                        <FtrCategory/>

                    </View>
                </View>
                <View style={{paddingBottom:30,}}>
                    <Text style={styles.title}>거래유형</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap',}}>
                        <FtrType/>
                    </View>
                </View>
                <View style={{marginBottom:10,}}>
                   <Text style={styles.title}>가격대</Text>
                   <View style={{flex:1}}>
                       <FtrPrice/>
                   </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:20,}}>
                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',}}>
                        <Icon name="refresh-outline" size={20} color="#444" style={{marginRight:5,}}/>
                        <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium'}}>필터 초기화</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#447DD1',
                            height:45,
                            width:200,
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius:8,
                        }}>
                        <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',color:'#fff'}}>선택완료</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    title:{
        fontFamily:'NotoSansKR-Medium',
        color:'#999999',
        fontSize:14,
    }
})

export default PrdFilter;