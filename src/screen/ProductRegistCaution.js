import React, {useState, useEffect}from 'react';
import {SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API_CALL from '../ApiCall'
const ProductRegistCaution = ({navigation}) => {
    const [check, setCheck] = useState(false);
    const [caution,setCaution] = useState('');
    useEffect(() => {
        getCaution()        
    }, [])
    const getCaution = async() =>{
        try{
            const form = new FormData()
            form.append('method', 'proc_precautions')

            const url = 'http://dmonster1566.cafe24.com'
            const path = '/json/proc_json.php'
            const api = await API_CALL(url+path, form, false)
            const { data:{result,item,message} } = api;   
            if(result==='0'){Alert.alert('',message)}
            else if(result==='1'){
                setCaution(item)
            }
        }catch(e){

        }
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',height:60,justifyContent:'space-between',alignItems:'center',borderBottomColor:'#EEEEEE',borderBottomWidth:1,paddingHorizontal:20,}}>
                <View style={{width:30,height:30}}></View>
                <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>게시물 등록</Text>
                <TouchableOpacity 
                style={{}}
                onPress={() => navigation.navigate('Main')}>
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
                        {/* <Text style={styles.title}>1. 위조상품 판매행위 금지</Text>
                        <Text style={styles.content}>- 위조상품(가품)은 판매등록이 불가능 합니다</Text>
                        <Text style={styles.content}>- 위조상품(가품)을 판매할 경우 상표법위반의 범죄행위로 처벌을 받을 수 있습니다 </Text>
                        <Text style={styles.content}>- 위조상품임을 모르고 판매한 경우에도 처벌을 받으며, 알고 판매한 경우 사기죄에 해당 합니다 </Text>
                        <Text style={styles.content}>- 위조상품을 판매하는 경우 회원자격 박탈 및 재가입 불가 사유에 해당 됩니다</Text>
                    </View>
                    <View style={styles.textbox}>
                        <Text style={styles.title}>2. 지적재산권 침해 금지</Text>
                        <Text style={styles.content}>- 이미지 저작권이나 상표권등을 위반하는 상품을 등록시 해당사로부터 법적조치가 취해질 수 있습니다</Text>
                        <Text style={styles.content}>- 타인의 이미지나 인터넷에 유포된 사진을 게시할 경우 게시글은 통보 없이 삭제될 수 있습니다 </Text>
                    </View>
                    <View style={styles.textbox}>
                        <Text style={styles.title}>3. 판매규정 준수</Text>
                        <Text style={styles.content}>- 판매자는 전자상거래법과 판매규정(약관)을 준수하셔야 합니다</Text>
                        <Text style={styles.content}>- 규정에 위배되는 판매행위에 대해서는 별도의 통보없이 판매가 제한될 수 있습니다</Text>
                        <Text style={styles.content}>- 가품의심 신고나 불량 게시글 등록시 게시글이 삭제될수 있습니다</Text>
                        <Text style={styles.content}>- 영업목저의 판매는 사업자회원 등록이 필요하며 미등록시 관련법에 의거 불이익을 당할수 있습니다</Text>
                        <Text style={styles.content}>- 판매금지품목(약관)에 대해서는 판매가 불가능 합니다</Text>
                        <Text style={styles.content}>- 타인의 명의를 도용하여 판매하는 경우 명의도용에 대한 법적 책임이 있습니다</Text>
                        <Text style={styles.content}>- 판매되는 상품의 정확한 정보를 등록해야 하며 잘못된 정보로 등록시 게시물이 삭제될수 있습니다</Text>
                    </View>
                    <View style={styles.textbox}>
                        <Text style={styles.title}>3. 판매규정 준수</Text>
                        <Text style={styles.content}>- 상품 사진은 최소 5장 이상 직접 촬영하여 등록합니다</Text>
                        <Text style={styles.content}>  (전면, 후면, 내부택/각인, 구성품, 사용감/하자) 추가 등록 가능</Text>
                        <Text style={styles.content}>- 상품 전체를 알 수 있는 선명한 이미지를 권장합니다</Text>
                        <Text style={styles.content}>- 홍보문구 및 스펙 등 텍스트는 등록하면 불량게시글로 간주됩니다</Text> */}
                    </View>
                    <TouchableOpacity 
                    onPress={() => setCheck(!check)}
                    style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',marginBottom:15,}}>
                            {check === false ? <Icon name="check-box-outline-blank" size={24} color="#eee"/>
                                             : <Icon name="check-box" size={24} color="#447DD1"/> }
                            
                            <Text style={{
                                fontSize:13,
                                fontFamily:'NotoSansKR-Medium',
                                lineHeight:16,
                                paddingLeft:5,
                            }}>위의 글을 모두 읽고 동의합니다.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{
                        backgroundColor: check === false ? '#eee' : '#447DD1',
                        height:56,
                        width:'100%',
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:8,
                    }}
                    onPress={check === false ? null : () => navigation.navigate('ProductRegistCategory')}
                    
                    >
                        <Text style={{
                            fontSize:16,
                            color:check === false ? '#999' : '#fff',
                            fontFamily:'NotoSansKR-Medium',
                        }}>다음</Text>
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


export default ProductRegistCaution;