
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    Alert
} from 'react-native';
import { DetailHead } from '../components/header';
import { useSelector } from 'react-redux';
import API_CALL from '../ApiCall';

const Declaration = (props) => {
    const {route:{params},navigation} = props;
    const [textValue, setTextValue] = React.useState(null);
    const { member } = useSelector(state => state.login);

    const onPressDeclaration = async() => {
        const form = new FormData();
        form.append('method', 'proc_seller_report');
        form.append('mt_idx', member.mt_idx);
        form.append('pt_idx', params.pt_idx);
        form.append('st_id', params.st_id);
        form.append('st_company', params.st_company);
        form.append('report_msg', textValue);
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {
            data: { method, result, message, count, item },
        } = api;
        console.log(message,result)
        if (result === '0') Alert.alert('', message)
        if (result === '1') {
            Alert.alert('',message)
            navigation.goBack();
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <DetailHead title="판매자 신고" />
            <View style={styles.content}>
                <View style={styles.trader}>
                    <Text style={styles.trader__title}>거래자</Text>
                    <View style={styles.trader__info}>
                        <Text style={{ fontSize: 12 }}>{params.sell_id}</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#C9C9C9',
                                marginLeft: 10,
                            }}>
                            {params.st_company}
                        </Text>
                    </View>
                </View>
                <View style={styles.declaration}>
                    <Text style={styles.declaration__title}>신고사유</Text>
                    <TextInput
                        value={textValue}
                        placeholder="신고 사유를 자유롭게 남겨주세요."
                        numberOfLines={10}
                        multiline
                        style={styles.declaration__contents}
                        onChangeText={text => setTextValue(text)}
                    />
                    <TouchableOpacity style={styles.declaration__btn} onPress={()=>onPressDeclaration()}>
                        <Text style={{ color: 'white' }}>신고하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
    },
    content:{
        padding:20
    },
    trader: {
        width: Dimensions.get('window').width - 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    trader__title: {
        width: '100%',
        fontWeight: 'bold',
    },
    trader__info: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: 5,
    },
    declaration: {
        width: Dimensions.get('window').width - 40,
        alignItems: 'center',
        marginTop: 20,
        margin: 'auto',
    },
    declaration__title: {
        width: '100%',
        fontWeight: 'bold',
    },
    declaration__contents: {
        borderColor: '#c9c9c9',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        marginTop: 10,
        textAlignVertical: 'top',
        color:'#000',
    },
    declaration__btn: {
        width: '100%',
        height: 40,
        borderRadius: 6,
        backgroundColor: '#477DD1',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Declaration;
