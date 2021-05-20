import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Header, {DetailHead} from '../components/header';
import Footer from '../components/footer';
import Product from '../components/product';

export const Width = Dimensions.get('window').width / 4;

const BidFinish = props => {
  const {
    route: {params},
  } = props;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DetailHead title="입찰하기" />
      <View style={{padding: 20}}>
        <View
          style={{
            paddingBottom: 10,
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}>
          <Product {...props} />
        </View>
        <View
          style={{
            backgroundColor: '#F8F8F8',
            borderRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 30,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 13,
              lineHeight: 20,
              fontFamily: 'NotoSansKR-Regular',
            }}>
            {params.bidprice}원 입찰이 완료되었습니다.
          </Text>
          <Text
            style={{
              fontSize: 13,
              lineHeight: 20,
              fontFamily: 'NotoSansKR-Regular',
            }}>
            자세한 내용은 내 견적 메뉴로 가셔서 확인할 수 있습니다.
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#477DD1',
            justifyContent: 'center',
            alignItems: 'center',
            height: 57,
            borderRadius: 8,
          }}
          onPress={() => props.navigation.navigate('NewPrdList')}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
              color: '#fff',
            }}>
            상품 더보기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default BidFinish;
