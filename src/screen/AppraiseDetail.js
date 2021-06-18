import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { DetailHead } from '../components/header';
import Icon from 'react-native-vector-icons/Ionicons';
import Postcode from '@actbase/react-daum-postcode';
import { useSelector } from 'react-redux';
import API_CALL from '../ApiCall';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Boxwidth = Width - 40;
const Boxheight = Height - 100;


const AppraiseDetail = (props) => {
    const { route: { params }, navigation } = props;
    const { member } = useSelector(state => state.login);
    const [appraisalDetail,setAppraisalDetail] = useState([])
    console.log(params)
    const getAppraiseDetail = async() => {
        const form = new FormData();
        form.append('method', 'proc_appraisal_request_detail');
        form.append('ar_id', params.ar_id);
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        const {
            data: {item, result,message},
        } = api;
        if (result === '0') return Alert.alert('', message);
        if (result === '1') {
            setAppraisalDetail(item[0])
        }
    }
    useEffect(() => {
        getAppraiseDetail()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <DetailHead title="감정신청" />
            <ScrollView style={{ flex: 1, }}>
                <View style={{ padding: 20, paddingBottom: 60, }}>
                    {/* 신청자 정보 */}
                    <View>
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'NotoSansKR-Bold',
                                lineHeight: 20,
                                paddingBottom: 20,
                            }}>신청자 정보</Text>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>이름</Text>
                            <Text style={styles.contsubtitle}>{appraisalDetail.mt_name}</Text>
                        </View>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>전화번호</Text>
                            <Text style={styles.contsubtitle}>{appraisalDetail.mt_hp}</Text>
                        </View>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>주소</Text>
                            <Text style={styles.contsubtitle}>{`(${appraisalDetail.mt_zip}) ${appraisalDetail.mt_address1} ${appraisalDetail.mt_address2}`}</Text>
                        </View>
                    </View>
                    {/* 상품 정보 */}
                    <View>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>상품명</Text>
                            <Text style={styles.contsubtitle}>{appraisalDetail.item_name}</Text>
                        </View>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>브랜드</Text>
                            <Text style={styles.contsubtitle}>{appraisalDetail.brand}</Text>
                        </View>

                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>품목</Text>
                            <Text style={styles.contsubtitle}>{`${appraisalDetail.ct_name2},${appraisalDetail.ct_name3}`}</Text>
                        </View>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>구매시기</Text>
                            <Text style={styles.contsubtitle}>{`${appraisalDetail.sell_year}-${appraisalDetail.sell_month}`}</Text>
                        </View>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>구매장소</Text>
                            <Text style={styles.contsubtitle}>{appraisalDetail.buy_place}</Text>
                        </View>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>구성품</Text>
                            <Text style={styles.contsubtitle}>{appraisalDetail.component}</Text>
                        </View>
                        <View style={{paddingBottom:20,borderBottomWidth:1,borderBottomColor:'#dedede'}}>
                            <Text style={styles.contitle}>기타문의</Text>
                            <Text style={styles.contsubtitle}>{appraisalDetail.memo}</Text>
                        </View>
                        <View style={{paddingTop:20}}>
                            <View >
                                <Text style={styles.contitle}>감정 신청 비용</Text>
                            </View>
                            <Text style={styles.contsubtitle}>{`${appraisalDetail.request_price}(${appraisalDetail.payment_status=='1'?'가격상담중':appraisalDetail.payment_status=='2'?'결제대기':'결제완료'})`}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contbox: {
        paddingBottom: 20,
    },
    contitle: {
        fontSize: 14,
        fontFamily: 'NotoSansKR-Medium',
        lineHeight: 20,
        paddingBottom: 10,
    },
    contsubtitle: {
        fontSize: 12,
        fontFamily: 'NotoSansKR-Regular',
        lineHeight: 16,
    },
    inputstyle: {
        fontSize: 13,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        height: 35,
        paddingLeft: 10,
        paddingVertical: 0,
        marginBottom: 5,
        color: '#222'
    },
    graybox: {
        backgroundColor: '#EBEBEB',
        borderRadius: 9,
        padding: 10,
    },
    grayboxtext: {
        fontSize: 13,
        fontFamily: 'NotoSansKR-Medium',
        lineHeight: 20,
    },

});

export default AppraiseDetail;