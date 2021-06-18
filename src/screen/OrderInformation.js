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
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { DetailHead } from '../components/header';
import API_CALL from '../ApiCall';

const Width = Dimensions.get('window').width;
const boxWidth = Dimensions.get('window').width / 4;

const OrderInformation = props => {
    const { navigation, route: { params } } = props;
    const [orderItem, setOrderItem] = useState([])
    const { member } = useSelector(state => state.login);
    console.log(params)
    const [td_idx_ing,setIng] = useState(params.td_idx_ing?params.td_idx_ing:null)
    useEffect(() => {
        getOrderItem();
    }, []);

    const getOrderItem = async () => {
        const form = new FormData();
        if(td_idx_ing){
            form.append('method', 'proc_order_detail_buy');
            form.append('td_idx', td_idx_ing);
            form.append('mt_idx', member.mt_idx);
        }else{
            form.append('method', 'proc_order_detail');
            form.append('idx', params.idx);
        }
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        console.log(form)
        const api = await API_CALL(url + path, form, false);
        const {
            data: { method, result, message, count, item },
        } = api;
        if (result === '0') Alert.alert('', message)
        if (result === '1') {
            props.route.params = { ...props.route.params, ...item[0] }
            setOrderItem(item[0]);
        }
    };
    const Bottomtab = React.memo(function Statusrender() {
            if (params.transid === '1') {
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => navigation.push('ReviewWrite', { pt_idx:orderItem.pt_idx, deal_id:orderItem, ot_code:orderItem.ot_code?orderItem.ot_code:'',success:true })}
                            style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1, borderRightWidth: 1, borderRightColor: '#fff' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>리뷰 작성</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.push('AppraiseWrite',{regi_id:orderItem.pt_idx})}
                            style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1, borderRightWidth: 1, borderRightColor: '#fff' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>감정신청</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.push('Declaration',{pt_idx:orderItem.pt_idx,st_company:orderItem.sell_company_name,st_id:orderItem.sell_mt_idx,sell_id:orderItem.sell_id})}
                            style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>판매자 신고</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else if (params.transid === '2') {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.push('ReviewWrite', { pt_idx:orderItem.pt_idx, deal_id:orderItem, ot_code:orderItem.ot_code?orderItem.ot_code:'' })}
                        style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>리뷰 작성</Text>
                    </TouchableOpacity>
                )
            } else if (params.transid === '3') {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.push('ReviewWrite', { pt_idx:orderItem.pt_idx, deal_id:orderItem, ot_code:orderItem.ot_code?orderItem.ot_code:'' })}
                        style={{ height: 48, backgroundColor: '#EBEBEB', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>리뷰 작성</Text>
                    </TouchableOpacity>
                )
            }
    })
    ///////////////////////////////////////////////////////////////////////////
    //주문하기 폼

    // useEffect(() => {
    //   getOrderAdd();
    // }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DetailHead title="주문 정보" />

            <ScrollView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#eee',
                                borderRadius: 6,
                                width: boxWidth,
                                height: boxWidth,
                                overflow: 'hidden',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 20,
                            }}>
                            {orderItem && (
                                <Image
                                    source={{ uri: orderItem.pt_image1 }}
                                    style={{ resizeMode: 'cover', width: '100%', height: '100%' }}
                                />
                            )}
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    lineHeight: 20,
                                    fontFamily: 'NotoSansKR-Bold',
                                    paddingBottom: 10,
                                    width: Width - 180,
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {orderItem.pt_title}
                            </Text>
                            <View >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        lineHeight: 16,
                                        color: '#555',
                                        paddingRight: 4,
                                        fontFamily: 'NotoSansKR-Regular',
                                        
                                    }}>
                                    구매가
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        lineHeight: 16,
                                        color: '#000',
                                        fontWeight:'bold',
                                        fontFamily: 'NotoSansKR-Regular',
                                    }}>
                                    {`${orderItem.ot_price}원`}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {!td_idx_ing&&
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={{borderWidth:1,borderColor:'#eee',marginHorizontal:15,backgroundColor:'red'}}/>
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
                        {
                            orderItem.ct_deal_type!=='직거래'||orderItem.ct_deal_type!=='택배거래'?
                        <View style={{ padding: 12 }}>
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
                                    {orderItem.ot_rname}
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
                                    {orderItem.ot_rtel}
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
                                    {orderItem.ot_rhp}
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
                                    {`${orderItem.ot_rzip} ${orderItem.ot_radd1} ${orderItem&&orderItem.ot_radd2?orderItem.ot_radd2:''}`}
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
                                <View style={{ width: 150 }}>
                                    <Text style={{ textAlign: 'right' }}>{orderItem.ot_rmemo}</Text>
                                </View>
                            </View>
                        </View>:null
                        }
                        <View
                            style={{
                                backgroundColor: '#477DD1',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 12,
                                borderBottomStartRadius: 5,
                                borderBottomEndRadius: 5
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'NotoSansKR-Medium',
                                    lineHeight: 20,
                                    color: '#fff'
                                }}>
                                주문 금액
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'NotoSansKR-Medium',
                                    lineHeight: 20,
                                    color: '#fff'
                                }}>
                                {`${orderItem && orderItem.ot_price}원`}
                            </Text>
                        </View>
                    </View>
                </View>
                }
                <View style={{ marginVertical: 15, backgroundColor: '#fff' }}>
                    <View style={{ padding: 15 }}>
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
                    <View style={{ paddingHorizontal: 12 }}>
                        <View style={styles.payinfo}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Medium',
                                    lineHeight: 20,
                                    paddingHorizontal: 12
                                }}>
                                거래자
                        </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Regular',
                                    lineHeight: 20,
                                    paddingHorizontal: 12
                                }}>
                                {orderItem.mt_name}
                        </Text>
                        </View>
                        <View style={styles.payinfo}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Medium',
                                    lineHeight: 20,
                                    paddingHorizontal: 12
                                }}>
                                거래 유형
                        </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Regular',
                                    lineHeight: 20,
                                    paddingHorizontal: 12
                                }}>
                                {orderItem.ct_deal_type}
                            </Text>
                        </View>
                        {
                            orderItem.ct_deal_type!=='직거래'&&!td_idx_ing?
                        <View style={styles.payinfo}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Medium',
                                    lineHeight: 20,
                                    paddingHorizontal: 12
                                }}>
                                운송장번호
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Regular',
                                    lineHeight: 20,
                                    paddingHorizontal: 12,
                                    color:'#000'
                                }}>
                                {orderItem && orderItem.ct_delivery_number&&orderItem.ct_delivery_number.trim()?orderItem.ct_delivery_number:'운송장 번호가 없습니다.'}
                            </Text>
                        </View>:null
                        }
                    </View>
                </View>
                {
                   (orderItem.ct_deal_type!=='직거래'||orderItem.ct_deal_type!=='택배거래')&&!td_idx_ing?
                <View style={{ backgroundColor: '#fff' }}>
                    <View style={{ padding: 15 }}>
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
                    <View style={{ paddingHorizontal: 12 }}>
                        <View style={styles.payinfo}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Medium',
                                    lineHeight: 20,
                                    paddingHorizontal: 12
                                }}>
                                결재 수단
                        </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Regular',
                                    lineHeight: 20,
                                    paddingHorizontal: 12
                                }}>
                                {orderItem.ot_pay_type}
                        </Text>
                        </View>
                        <View style={styles.payinfo}>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Medium',
                                    lineHeight: 20,
                                    paddingHorizontal: 12
                                }}>
                                정산 완료일
                        </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'NotoSansKR-Regular',
                                    lineHeight: 20,
                                    paddingHorizontal: 12
                                }}>
                                {orderItem.ct_calculate_date}
                            </Text>
                        </View>
                    </View>
                </View>:null
                }
            </ScrollView>
            {!td_idx_ing?<Bottomtab/>:null}
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
