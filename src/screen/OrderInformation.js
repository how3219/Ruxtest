import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
    Modal,
    Dimensions,
} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import { useSelector } from 'react-redux';
import Header, { DetailHead } from '../components/header';
import Footer from '../components/footer';
import Product from '../components/product';
import Selector, { DefaultPicker } from '../components/Select';
import API_CALL from '../ApiCall';

const location = [
    { label: '주문자와 동일', value: '1' },
    { label: '최근배송지', value: '2' },
    { label: '신규배송지', value: '3' },
];

const payment = [
    { label: '신용카드', value: 'C' },
    { label: '가상계좌', value: 'V' },
    { label: '계좌이체', value: 'A' },
];

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Boxwidth = Width - 40;
const Boxheight = Height - 100;

const OrderInformation = props => {
    const { route } = props;
    const { navigation } = props;
    const { params } = route;
    const [orderItem, setOrderItem] = useState([])
    const { member } = useSelector(state => state.login);

    useEffect(() => {
        getOrderItem();
    }, []);

    const getOrderItem = async () => {
        const form = new FormData();
        console.log(555555555,params)
        form.append('method', params.pt_deal_type=="직거래"||params.pt_deal_type=="택배거래"?'proc_my_estimate_detail':'proc_order_detail');
        form.append('idx', params.idx);
        // form.append('ot_code', ot_code);
        // form.append('pt_title', pt_title);
        // form.append('pt_image1', pt_image1);
        // form.append('pt_price', pt_price);
        // form.append('ct_delivery_default_price', ct_delivery_default_price);
        // form.append('commission', commission);
        // form.append('total_price', total_price);
        // form.append('ct_delivery_type', ct_delivery_type);
        // form.append('mt_sms_certify', mt_sms_certify);
        // form.append('ot_rname', ot_rname);
        // form.append('ot_rtel', ot_rtel);
        // form.append('ot_rhp', ot_rhp);
        // form.append('ot_rzip', ot_rzip);
        // form.append('ot_radd1', ot_radd1);
        // form.append('ot_radd2', ot_radd2);

        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';

        const api = await API_CALL(url + path, form, false);
        const {
            data: { method, result, message, count, item },
        } = api;
        if (result === '0') Alert.alert('OrderInformation', message)
        if (result === '1') {
            props.route.params = { ...props.route.params, ...item[0] }
            setOrderItem(item[0]);
        }
    };

    ///////////////////////////////////////////////////////////////////////////

    //주문하기 폼

    // useEffect(() => {
    //   getOrderAdd();
    // }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DetailHead title="주문 정보" />

            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10,backgroundColor:'#fff' }}>
                    <Product {...props} />
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View
                            style={{borderWidth:1,borderColor:'#eee',margin:15,backgroundColor:'red'}}/>
                    <View style={{borderWidth: 1, borderColor: '#eee', borderRadius: 10,margin:15}}>
                    <Text
                    style={{
                        padding: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        fontSize: 16,
                        fontFamily: 'NotoSansKR-Bold',
                        lineHeight: 20,
                    }}>
                    받으시는 분
                    </Text>
                    <View style={{padding: 12}}>
                    <View style={styles.payinfo}>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 20,
                        }}>
                        이름
                        </Text>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                        }}>
                        ㅁㄴㅇ
                        </Text>
                    </View>
                    <View style={styles.payinfo}>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 20,
                        }}>
                        전화번호
                        </Text>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                        }}>
                        {/* {`${orderItem && orderItem.pt_price}원`} */}
                        </Text>
                    </View>
                    <View style={styles.payinfo}>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 20,
                        }}>
                        핸드폰
                        </Text>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                        }}>
                        {/* {`${orderItem && orderItem.ct_delivery_default_price}원`} */}
                        </Text>
                    </View>
                    <View style={styles.payinfo}>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 20,
                        }}>
                        주소
                        </Text>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                        }}>
                        {/* {`${orderItem && orderItem.commission}원`} */}
                        </Text>
                    </View>
                    <View style={styles.payinfo}>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 20,
                        }}>
                        전하실 말씀
                        </Text>
                        <View style={{width: 150}}>
                        <Text style={{textAlign:'right'}}>asd</Text>
                        </View>
                    </View>
                    </View>
                    <View
                    style={{
                        backgroundColor: '#477DD1',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 12,
                        borderBottomStartRadius:5,
                        borderBottomEndRadius:5
                    }}>
                    <Text
                        style={{
                        fontSize: 16,
                        fontFamily: 'NotoSansKR-Medium',
                        lineHeight: 20,
                        color:'#fff'
                        }}>
                        주문 금액
                    </Text>
                    <Text
                        style={{
                        fontSize: 16,
                        fontFamily: 'NotoSansKR-Medium',
                        lineHeight: 20,
                        color:'#fff'
                        }}>
                        {/* {`${orderItem && orderItem.total_price}원`} */}
                    </Text>
                    </View>
                    {/* <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#477DD1',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    }}>
                    <TouchableOpacity
                        style={{
                        width: '50%',
                        height: 57,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRightWidth: 1,
                        borderRightColor: '#fff',
                        }}>
                        <Text
                        style={{
                            color: '#fff',
                            fontSize: 16,
                            fontFamily: 'NotoSansKR-Bold',
                        }}>
                        취소
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                        width: '50%',
                        height: 57,
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                        >
                        <Text
                        style={{
                            color: '#fff',
                            fontSize: 16,
                            fontFamily: 'NotoSansKR-Bold',
                        }}>
                        주문하기
                        </Text>
                    </TouchableOpacity>
                    </View> */}
                    </View>
                </View>
                <View style={{marginVertical:15,backgroundColor:'#fff'}}>
                    <View style={{padding:15}}>
                        <Text  
                        style={{
                        padding: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        fontSize: 16,
                        fontFamily: 'NotoSansKR-Bold',
                        lineHeight: 20,
                    }}>거래자 정보</Text>
                    </View>
                    <View style={{paddingHorizontal: 12}}>
                    <View style={styles.payinfo}>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 20,
                            paddingHorizontal:12
                        }}>
                        거래자
                        </Text>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                            paddingHorizontal:12
                        }}>
                        ㅁㄴㅇ
                        </Text>
                    </View>
                    <View style={styles.payinfo}>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 20,
                            paddingHorizontal:12
                        }}>
                        거래 유형
                        </Text>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                            paddingHorizontal:12
                        }}>
                        {/* {`${orderItem && orderItem.pt_price}원`} */}
                        </Text>
                    </View>
                    </View>
                    
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={{padding:15}}>
                        <Text  
                        style={{
                        padding: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee',
                        fontSize: 16,
                        fontFamily: 'NotoSansKR-Bold',
                        lineHeight: 20,
                    }}>결재 정보</Text>
                    </View>
                    <View style={{paddingHorizontal: 12}}>
                    <View style={styles.payinfo}>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 20,
                            paddingHorizontal:12
                        }}>
                        결재 수단
                        </Text>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                            paddingHorizontal:12
                        }}>
                        ㅁㄴㅇ
                        </Text>
                    </View>
                    <View style={styles.payinfo}>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 20,
                            paddingHorizontal:12
                        }}>
                        정산 완료일
                        </Text>
                        <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                            paddingHorizontal:12
                        }}>
                        {/* {`${orderItem && orderItem.pt_price}원`} */}
                        </Text>
                    </View>
                    </View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputWrap: {
        paddingBottom: 10,
    },
    payinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    address: {
        paddingBottom: 10,
    },
});

export default OrderInformation;
