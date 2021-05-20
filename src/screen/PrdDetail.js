import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Lightbox from 'react-native-lightbox-v2';

import Header, {DetailHead} from '../components/header';
import Icon from 'react-native-vector-icons/Ionicons';
import API_CALL from '../ApiCall';

export const Width = Dimensions.get('window').width / 2;
export const PADDING = 20;

const PrdDetail = props => {
  const {route} = props;
  const {navigation} = props;
  const {params} = route;
  console.log('params', params);

  const {member} = useSelector(state => state.login);

  const [mt_idx, setMt_idx] = useState(member.mt_idx);
  const [idx, setIdx] = useState(params.idx);
  const [pt_title, setPt_title] = useState('');
  const [pt_image1, setPt_image1] = useState('');
  const [brand_img, setBrand_img] = useState('');
  const [brand_name, setBrand_name] = useState('');
  const [pt_selling_price, setPt_selling_price] = useState('');
  const [ca_name1, setCa_name1] = useState('');
  const [ca_name2, setCa_name2] = useState('');
  const [ca_name3, setCa_name3] = useState('');
  const [pt_tag_list, setPt_tag_list] = useState('');
  const [pt_buy_ym, setPt_buy_ym] = useState('');
  const [pt_option_name1, setPt_option_name1] = useState('');
  const [pt_option_name2, setPt_option_name2] = useState('');
  const [pt_option_name2_etc, setPt_option_name2_etc] = useState('');
  const [pt_option_name3, setPt_option_name3] = useState('');
  const [pt_option_name3_etc, setPt_option_name3_etc] = useState('');
  const [pt_size, setPt_size] = useState('');
  const [pt_deal_type, setPt_deal_type] = useState('');
  const [pt_direct_sell, setPt_direct_sell] = useState('');
  const [pt_direct_sigugun, setPt_direct_sigugun] = useState('');
  const [pt_baesong_price_yn, setPt_baesong_price_yn] = useState('');
  const [pt_baesong_price_nm, setPt_baesong_price_nm] = useState('');
  const [pt_baesong_price, setPt_baesong_price] = useState('');
  const [pt_selling_edate, setPt_selling_edate] = useState('');
  const [dday, setDday] = useState('');
  const [zzim_yn, setZzim_yn] = useState('');
  const [pt_image2, setPt_image2] = useState('');
  const [pt_image3, setPt_image3] = useState('');
  const [pt_image4, setPt_image4] = useState('');
  const [pt_image5, setPt_image5] = useState('');
  const [mt_nickname, setMt_nickname] = useState('');
  const [rt_score, setRt_score] = useState('');

  const [detailItem, setDetailItem] = useState({});

  useEffect(() => {
    getPrdDetail();
  }, []);

  const getPrdDetail = async () => {
    const form = new FormData();

    form.append('method', 'proc_product_detail');
    form.append('mt_idx', mt_idx);
    form.append('idx', idx);
    form.append('pt_title', pt_title);
    form.append('pt_image1', pt_image1);
    form.append('brand_img', brand_img);
    form.append('brand_name', brand_name);
    form.append('pt_selling_price', pt_selling_price);
    form.append('ca_name1', ca_name1);
    form.append('ca_name2', ca_name2);
    form.append('ca_name3', ca_name3);
    form.append('pt_tag_list', pt_tag_list);
    form.append('pt_buy_ym', pt_buy_ym);
    form.append('pt_option_name1', pt_option_name1);
    form.append('pt_option_name2', pt_option_name2);
    form.append('pt_option_name2_etc', pt_option_name2_etc);
    form.append('pt_option_name3', pt_option_name3);
    form.append('pt_option_name3_etc', pt_option_name3_etc);
    form.append('pt_size', pt_size);
    form.append('pt_deal_type	', pt_deal_type);
    form.append('pt_direct_sell', pt_direct_sell);
    form.append('pt_direct_sigugun', pt_direct_sigugun);
    form.append('pt_baesong_price_yn', pt_baesong_price_yn);
    form.append('pt_baesong_price_nm', pt_baesong_price_nm);
    form.append('pt_baesong_price', pt_baesong_price);
    form.append('pt_selling_edate', pt_selling_edate);
    form.append('dday', dday);
    form.append('zzim_yn', zzim_yn);
    form.append('pt_image2', pt_image2);
    form.append('pt_image3', pt_image3);
    form.append('pt_image4', pt_image4);
    form.append('pt_image5', pt_image5);
    form.append('mt_nickname', mt_nickname);
    form.append('rt_score	', rt_score);

    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    try {
      const api = await API_CALL(url + path, form, false);
      const {
        data: {method, result, message, count, item},
      } = api;
      if (result === '0') return Alert.alert('', 'no result');
      if (result === '1') {
        setDetailItem(item[0]);
        setZzim_yn(item[0].zzim_yn);
        console.log('item', item);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Catch!');
    }

    // const itemConvert = item.map((v, _) => {
    //   return {

    //     ...v,
    //     pt_tag_list : v.pt_tag_list === '' ? [] : v.pt_tag_list,
    //   }
    // })
    // console.log("a",itemConvert)
  };
  const pressZzim = async () => {
    try {
      const form = new FormData();
      if (zzim_yn === 'N') {
        form.append('method', 'proc_myzzim');
        form.append('mt_idx', mt_idx);
        form.append('pt_idx', idx);
      } else if (zzim_yn == 'Y') {
        form.append('method', 'proc_myzzim_delete');
        form.append('pm_id');
      }
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: {result},
      } = api;
      if (result === '0') return Alert.alert('', 'no result zzim');
      if (result === '1') {
        setZzim_yn(zzim_yn === 'Y' ? 'N' : 'Y');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('pressZzim Catch!');
    }
  };
  // console.log('DetailItem', detailItem);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <DetailHead title="상품 정보" />
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, width: '100%', height: 250}}>
          <Image
            style={{resizeMode: 'contain', width: '100%', height: '100%'}}
            source={{uri: detailItem.pt_image1}}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 185,
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              overflow: 'hidden',
            }}>
            <Image
              style={{resizeMode: 'cover', width: '100%', height: '100%'}}
              source={{uri: detailItem.brand_img}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 65,
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'NotoSansKR-Regular',
              lineHeight: 15,
              color: '#222',
            }}>
            {detailItem.brand_name}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'NotoSansKR-Bold',
              paddingBottom: 10,
              lineHeight: 35,
              textAlign: 'center',
            }}>
            {detailItem.pt_title}
          </Text>
          <Text
            style={{
              backgroundColor: '#477DD1',
              color: '#fff',
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 18,
              paddingHorizontal: 20,
              paddingVertical: 6,
              borderRadius: 30,
            }}>
            {detailItem.pt_selling_edate}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: PADDING,
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback>
              <Icon
                name="ios-share-social-outline"
                size={30}
                color="#aaa"
                style={{marginRight: 10}}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => pressZzim()}>
              <Icon
                name={zzim_yn === 'N' ? 'ios-heart-outline' : 'ios-heart'}
                size={30}
                color="#477DD1"
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text
              style={{
                fontSize: 13,
                color: '#000',
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 15,
              }}>
              즉시구매가
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'NotoSansKR-Bold',
                color: '#000',
                lineHeight: 28,
              }}>
              {detailItem.pt_selling_price}원
            </Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#eee',
            borderRadius: 10,
            marginHorizontal: 20,
            marginBottom: 10,
          }}>
          <Text
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 20,
            }}>
            기본 정보
          </Text>
          <View style={{padding: 10}}>
            <Text style={styles.title}>카테고리</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingBottom: 5,
              }}>
              <Text style={styles.hashtag}>{detailItem.ca_name1}</Text>
              <Text style={styles.hashtag}>{detailItem.ca_name2}</Text>
              <Text style={styles.hashtag}>{detailItem.ca_name3}</Text>
            </View>
            <Text style={styles.title}>키워드</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingBottom: 5,
              }}>
              {/* {detailItem.map((arr, i) => (
                  <View key={i}>
                    <Text style={styles.hashtag}>{arr.pt_tag_list}</Text>
                  </View>
                ))} */}
            </View>
            <View style={styles.contWrap}>
              <Text style={styles.title}>구매 시기</Text>
              <Text style={styles.cont}>{detailItem.pt_buy_ym}</Text>
            </View>
            <View style={styles.contWrap}>
              <Text style={styles.title}>구매한 곳</Text>
              <Text style={styles.cont}>{detailItem.pt_option_name1}</Text>
            </View>
            <View style={styles.contWrap}>
              <Text style={styles.title}>구성품</Text>
              <Text style={styles.cont}>{detailItem.pt_option_name2}</Text>
            </View>
            <View style={styles.contWrap}>
              <Text style={styles.title}>사이즈</Text>
              <Text style={styles.cont}>{detailItem.pt_size}</Text>
            </View>
            <View style={styles.contWrap}>
              <Text style={styles.title}>거래 유형</Text>
              <Text style={styles.cont}>{detailItem.pt_deal_type}</Text>
            </View>
            <View style={styles.contWrap}>
              <Text style={styles.title}>직거래 지역</Text>
              <Text style={styles.cont}>{detailItem.pt_direct_sigugun}</Text>
            </View>
            <View style={styles.contWrap}>
              <Text style={styles.title}>배송비</Text>
              <Text style={styles.cont}>{detailItem.baesong_price_nm}</Text>
            </View>
            <View style={styles.contWrap}>
              <Text style={styles.title}>제품의 상태</Text>
              <Text style={styles.cont}>{detailItem.pt_option_name3}</Text>
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal: PADDING, marginBottom: 60}}>
          <View
            style={{
              borderColor: '#eee',
              borderWidth: 1,
              marginBottom: 10,
              flex: 1,
              height: 250,
            }}>
            <Lightbox springConfig={{tension: 50, friction: 7}}>
              <Image
                style={{resizeMode: 'contain', width: '100%', height: '100%'}}
                source={{uri: detailItem.pt_image2}}
              />
            </Lightbox>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#eee',
                width: 80,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#333',
                  fontSize: 13,
                  lineHeight: 16,
                  fontFamily: 'NotoSansKR-Medium',
                }}>
                대표이미지
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: '#eee',
              borderWidth: 1,
              marginBottom: 10,
              flex: 1,
              height: 250,
            }}>
            <Lightbox springConfig={{tension: 50, friction: 7}}>
              <Image
                style={{resizeMode: 'contain', width: '100%', height: '100%'}}
                source={{uri: detailItem.pt_image3}}
              />
            </Lightbox>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#eee',
                width: 80,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#333',
                  fontSize: 13,
                  lineHeight: 16,
                  fontFamily: 'NotoSansKR-Medium',
                }}>
                전면
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: '#eee',
              borderWidth: 1,
              marginBottom: 10,
              flex: 1,
              height: 250,
            }}>
            <Lightbox springConfig={{tension: 50, friction: 7}}>
              <Image
                style={{resizeMode: 'contain', width: '100%', height: '100%'}}
                source={{uri: detailItem.pt_image4}}
              />
            </Lightbox>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#eee',
                width: 80,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#333',
                  fontSize: 13,
                  lineHeight: 16,
                  fontFamily: 'NotoSansKR-Medium',
                }}>
                후면
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: '#eee',
              borderWidth: 1,
              marginBottom: 10,
              flex: 1,
              height: 250,
            }}>
            <Lightbox springConfig={{tension: 50, friction: 7}}>
              <Image
                style={{resizeMode: 'contain', width: '100%', height: '100%'}}
                source={{uri: detailItem.pt_image5}}
              />
            </Lightbox>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#eee',
                width: 80,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#333',
                  fontSize: 13,
                  lineHeight: 16,
                  fontFamily: 'NotoSansKR-Medium',
                }}>
                사용감, 하자
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F8F8F8',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          left: 0,
          elevation: 0,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PurchaseOrder', {
              idx,
              pt_title: detailItem.pt_title,
              pt_selling_edate: detailItem.pt_selling_edate,
              dday: detailItem.dday,
              pt_image1: detailItem.pt_image1,
            })
          }
          style={{
            width: Width,
            height: 57,
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: '#ddd',
          }}>
          <Text style={{fontSize: 18, fontFamily: 'NotoSansKR-Bold'}}>
            즉시 구매
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Bidding', {
              idx,
              pt_title: detailItem.pt_title,
              pt_selling_edate: detailItem.pt_selling_edate,
              dday: detailItem.dday,
              pt_image1: detailItem.pt_image1,
            })
          }
          style={{
            width: Width,
            height: 57,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontFamily: 'NotoSansKR-Bold'}}>
            입찰하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    fontFamily: 'NotoSansKR-Bold',
    lineHeight: 18,
    width: 80,
    paddingBottom: 6,
  },
  cont: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  contWrap: {
    flexDirection: 'row',
  },
  hashtag: {
    backgroundColor: '#F8F8F8',
    fontSize: 12,
    fontFamily: 'NotoSansKR-Regular',
    lineHeight: 16,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 7,
    color: '#707070',
    marginRight: 4,
    marginBottom: 4,
  },
});

export default PrdDetail;
