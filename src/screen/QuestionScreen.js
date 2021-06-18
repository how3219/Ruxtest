import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_CALL from '../ApiCall';
import { MypageHeader } from '../components/header';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
const NotiSetting = (props) => {
    const isfocused = useIsFocused();
    const { navigation, route: { params } } = props;
    const { member } = useSelector(state => state.login);
    const [questionList, setQuestionList] = useState([])
    const [current, setCurrent] = useState(null)
    const getNotice = async () => {
        try {
            let form = new FormData();
            form.append('method', 'proc_qna_list');
            form.append('mt_idx', member.mt_idx);
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, true);
            const { data: { result, message, item } } = api;
            if (result === '1') {
                console.log(item)
                setQuestionList(item)
            }
        } catch (e) {
            console.log('Notice', e)
        }
    }
    useEffect(() => {
        if (isfocused) getNotice()
    }, [isfocused])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <MypageHeader />
            <View style={{
                width: '100%', height: 60, justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ fontSize: 20, fontFamily: 'NotoSansKR-Bold', textAlign: 'center' }}>1:1 문의하기</Text>
            </View>
            <ScrollView>
                {
                    questionList?.map((rows, index) => {
                        return (
                            <React.Fragment
                                key={rows.idx}
                            >
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => setCurrent(rows.idx !== current ? rows.idx : null)}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.text} numberOfLines={1}>{rows.qt_title}</Text>
                                        <Text style={styles.date}>{String(rows.qt_wdate).substring(0, rows.qt_wdate.length - 3)}</Text>
                                    </View>
                                    <Icon name={rows.idx !== current ? "chevron-down" : "chevron-up"} size={20} color="#AAAAAA" />
                                </TouchableOpacity>
                                {
                                    rows.idx === current &&
                                    <>
                                        <View style={{ padding: 20, backgroundColor: '#eee', }}>
                                            <Text>{rows.qt_content}</Text>
                                        </View>
                                        {
                                        rows.qt_answer&&
                                        <View style={{ padding: 20, backgroundColor: '#ddd' }}>
                                            <Text><Text style={{ color: 'blue' }}>Re. </Text>{rows.qt_answer}</Text>
                                        </View>
                                        }
                                    </>
                                }
                            </React.Fragment>
                        )
                    })

                }
            </ScrollView>
            <View style={{ padding: 20, }}>
                <TouchableOpacity style={{
                    width: '100%',
                    height: 57,
                    borderRadius: 8,
                    backgroundColor: '#477DD1',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                    onPress={() => navigation.push('QuestionAdd')}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'NotoSansKR-Bold', }}>문의글 적기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    text: {
        fontSize: 16,
        lineHeight: 25,
        fontFamily: 'NotoSansKR-Regular',
        fontWeight: 'bold'
    },
    date: {
        fontSize: 12,
        lineHeight: 25,
        fontFamily: 'NotoSansKR-Regular',
        color: '#C9C9C9'
    }
})

export default NotiSetting;