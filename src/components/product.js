import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

const Width = Dimensions.get('window').width;
export const boxWidth = Dimensions.get('window').width / 4;

const Product = props => {
  const {route} = props;
  const {params} = route;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        {params && (
          <Image
            source={{uri: params.pt_image1}}
            style={{resizeMode: 'cover', width: '100%', height: '100%'}}
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
          {params.pt_title}
        </Text>
        <Text
          style={{
            fontSize: 13,
            lineHeight: 16,
            fontFamily: 'NotoSansKR-Medium',
          }}>
          입찰 기간
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 13,
              lineHeight: 16,
              color: '#555',
              paddingRight: 4,
              fontFamily: 'NotoSansKR-Regular',
            }}>
            {params.pt_selling_edate}{' '}
          </Text>
          <Text
            style={{
              fontSize: 10,
              lineHeight: 16,
              color: '#fff',
              backgroundColor: '#477DD1',
              paddingHorizontal: 8,
              borderRadius: 8,
              fontFamily: 'NotoSansKR-Regular',
            }}>
            {params.dday}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Product;
