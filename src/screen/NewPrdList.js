import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';

import Header, {DefaultHead} from '../components/header';
import {DefaultPicker} from '../components/Select';
import {
  FtrBrand,
  FtrCategory,
  FtrType,
  FtrPrice,
} from '../components/filterItem';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import API_CALL from '../ApiCall';
import AsyncStorage from '@react-native-community/async-storage';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const ModalHeight = Height - 70;
const PADDING = 15;
const Box = Width / 4;
const HashWidth = Width - Box - PADDING * 2 - 10;

const NewPrdList = props => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  //   const {route} = props
  const {navigation} = props;
  //   const {params} = route
  const {member} = useSelector(state => state.login);
  //   console.log('params',params)

  // 상품 리스트
  const [mt_idx, setMt_idx] = useState(member.mt_idx);
  const [ct_pid, setCt_pid] = useState([]);
  const [ct_id, setCt_id] = useState('');
  const [ct_id2, setCt_id2] = useState('');
  const [pt_order_by, setPt_order_by] = useState('');
  const [idx, setIdx] = useState('');
  const [search, setSearch] = useState('');
  const [pt_title, setPt_title] = useState('');
  const [pt_image1, setPt_image1] = useState('');
  const [pt_selling_price, setPt_selling_price] = useState('');
  const [pt_selling_edate, setPt_selling_edate] = useState('');
  const [dday, setDday] = useState('');
  const [pt_tag_list, setPt_tag_list] = useState('');
  const [pt_tag, setPt_tag] = useState('');
  const [zzim_yn, setZzim_yn] = useState('');

  const [newitem, setNewitem] = useState([]);

  const [filterItem, setFilterItem] = useState([]);
  const {category1, category2} = useSelector(state => state.categorys);
  useEffect(() => {
    getFilter();
  }, []);
  useEffect(() => {
    if (filterItem && filterItem.length !== 0) {
      getNewItem();
    }
  }, [filterItem]);
  const getNewItem = async () => {
    // console.log(50505050, filterItem);
    const form = new FormData();
    console.log(765765, filterItem);
    form.append('method', 'proc_main_new_list');
    // form.append('mt_idx', mt_idx);
    // form.append('ct_pid', ct_pid);
    // form.append('ct_id', ct_id);
    // form.append('ct_id2', ct_id2);
    // form.append('pt_order_by', pt_order_by);
    // form.append('idx', idx);
    // form.append('search', search);
    // form.append('pt_title', pt_title);
    // form.append('pt_image1', pt_image1);
    // form.append('pt_selling_price', pt_selling_price);
    // form.append('pt_selling_edate', pt_selling_edate);
    // form.append('dday', dday);
    // form.append('pt_tag_list', pt_tag_list);
    // form.append('pt_tag', pt_tag);
    // form.append('zzim_yn', zzim_yn);

    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    try {
      const api = await API_CALL(url + path, form, true);
      const {
        data: {item, result},
      } = api;
      if (result === '0') return Alert.alert('제목', '상품이 없습니다.');
      if (result === '1') {
        // const savePrd = {
        //   method: 'proc_product_list',
        //   mt_idx,
        //   ct_pid,
        //   ct_id,
        //   ct_id2,
        //   pt_order_by,
        //   idx,
        //   search,
        //   pt_title,
        //   pt_image1,
        //   pt_selling_price,
        //   pt_selling_edate,
        //   dday,
        //   pt_tag_list,
        //   pt_tag,
        //   zzim_yn,
        // };
        // await AsyncStorage.setItem('savePrd', JSON.stringify(savePrd));
        setNewitem(item);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('제목', '상품을 불러오지 못했습니다');
    }

    // const itemConvert = item.map((v, _) => {
    //   return {

    //     ...v,
    //     pt_tag_list : v.pt_tag_list === '' ? [] : v.pt_tag_list,
    //   }
    // })
    // console.log("a",itemConvert)
  };
  console.log('newItem', newitem);

  //필터
  const [bidx, setBidx] = useState('-');
  const [fct_id, setFct_id] = useState('');
  const [fct_id2, setFct_id2] = useState('');
  const [fct_id3, setFct_id3] = useState('');
  const [pt_deal_type, setPt_deal_type] = useState('-');
  const [pt_deal_price, setPt_deal_price] = useState('-');

  const getFilter = async () => {
    const form = new FormData();
    form.append('method', 'proc_filter');
    form.append('mt_idx', mt_idx);
    bidx !== '-' && form.append('bidx', bidx);
    pt_deal_type !== '-' && form.append('pt_deal_type', pt_deal_type);
    pt_deal_price !== '-' && form.append('pt_deal_price', pt_deal_price);
    form.append('ct_pid', fct_id);
    form.append('ct_id', fct_id2);
    form.append('ct_id2', fct_id3);
    form.append('idx', idx);
    form.append('pt_title', pt_title);
    form.append('pt_image1', pt_image1);
    form.append('pt_selling_price', pt_selling_price);
    form.append('pt_selling_edate', pt_selling_edate);
    form.append('dday', dday);
    form.append('pt_tag_list', pt_tag_list);
    form.append('zzim_yn', zzim_yn);

    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';

    try {
      const api = await API_CALL(url + path, form, true);
      console.log(api);
      const {data} = api;
      const {item, result} = data;
      if (result === '0') return Alert.alert('', 'no result');
      if (result === '1') {
        dispatch({
          type: 'FILTER_SELECT',
          payload: item[0],
        });
        setFilterItem(item);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('', '오류');
    }
  };

  const prdPicker = [
    {label: '전체', value: ''},
    {label: '인기순', value: 'hit'},
    {label: '최신순', value: 'new'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{backgroundColor: '#fff', width: '100%', zIndex: 999}}>
        <DefaultHead />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10,
            height: 45,
            borderBottomColor: '#eee',
            borderBottomWidth: 1,
          }}>
          <View style={{width: 100, marginRight: 5}}>
            <DefaultPicker picker={prdPicker} placeholder="인기상품순" />
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              borderColor: '#eee',
              borderWidth: 1,
              borderRadius: 8,
              height: 35,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 6,
            }}>
            <TextInput
              placeholder="상품명을 입력하세요"
              style={{
                height: 35,
                alignItems: 'center',
                fontSize: 12,
                lineHeight: 14,
                padding: 0,
                flex: 1,
              }}
              placeholderTextColor={'#C9C9C9'}
            />
            <TouchableOpacity>
              <Image
                style={{resizeMode: 'contain', width: 20}}
                source={require('../images/img_hd01.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderRadius: 8,
              backgroundColor: '#477DD1',
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              marginLeft: 5,
            }}
            onPress={() => setModalOpen(true)}>
            <Text
              style={{
                color: '#fff',
                paddingRight: 5,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 20,
              }}>
              필터
            </Text>
            <View style={{width: 12}}>
              <Image
                style={{resizeMode: 'contain', width: '100%'}}
                source={require('../images/ico_filter.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          visible={modalOpen}
          animationType={'slide'}
          transparent={true}
          style={{flex: 1}}
          onRequestClose={() => setModalOpen(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                backgroundColor: '#fff',
                height: ModalHeight,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'NotoSansKR-Bold',
                    lineHeight: 20,
                  }}>
                  쇼핑몰 필터
                </Text>
                <View style={{paddingBottom: 30}}>
                  <Text
                    style={{
                      fontFamily: 'NotoSansKR-Medium',
                      color: '#999999',
                      fontSize: 14,
                    }}>
                    브랜드
                    <Text style={{fontSize: 12, color: '#B7B7B7'}}>
                      {' '}
                      (선택1)
                    </Text>
                  </Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <FtrBrand />
                  </View>
                </View>
                <View style={{paddingBottom: 30}}>
                  <Text
                    style={{
                      fontFamily: 'NotoSansKR-Medium',
                      color: '#999999',
                      fontSize: 14,
                    }}>
                    카테고리 1
                    <Text style={{fontSize: 12, color: '#B7B7B7'}}>
                      {' '}
                      (선택1)
                    </Text>
                  </Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {category1?.map((item1, i) => (
                      <TouchableOpacity
                        onPress={() =>
                          setFct_id(
                            category1.map(data => {
                              if (data.id === item1.id) {
                                return {...data, state: true};
                              } else {
                                return {...data, state: false};
                              }
                            }),
                          )
                        }
                        key={i}
                        style={{
                          borderWidth: 1,
                          borderColor:
                            item1.state === false ? '#eee' : '#447DD1',
                          backgroundColor:
                            item1.state === false ? '#fff' : '#447DD1',
                          borderRadius: 8,
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          marginRight: 5,
                          marginBottom: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Medium',
                            lineHeight: 18,
                            color: item1.state === false ? '#447DD1' : '#fff',
                          }}>
                          {item1.ct_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={{paddingBottom: 30}}>
                  <Text
                    style={{
                      fontFamily: 'NotoSansKR-Medium',
                      color: '#999999',
                      fontSize: 14,
                    }}>
                    카테고리 2
                    <Text style={{fontSize: 12, color: '#B7B7B7'}}>
                      {' '}
                      (선택1)
                    </Text>
                  </Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {category2 &&
                      category2.map((item2, i) => (
                        <TouchableOpacity
                          key={i}
                          style={{
                            borderWidth: 1,
                            borderColor: '#eee',
                            borderRadius: 8,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginRight: 5,
                            marginBottom: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontFamily: 'NotoSansKR-Medium',
                              lineHeight: 18,
                            }}>
                            {item2.ct_name2}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
                <View style={{paddingBottom: 30}}>
                  <Text
                    style={{
                      fontFamily: 'NotoSansKR-Medium',
                      color: '#999999',
                      fontSize: 14,
                    }}>
                    카테고리 3
                    <Text style={{fontSize: 12, color: '#B7B7B7'}}>
                      {' '}
                      (선택1)
                    </Text>
                  </Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {category2.ct3_list &&
                      category2.ct3_list.map((item3, i) => (
                        <TouchableOpacity key={i}>
                          <Text>{item3.ct_name3}</Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
                <View style={{paddingBottom: 30}}>
                  <Text
                    style={{
                      fontFamily: 'NotoSansKR-Medium',
                      color: '#999999',
                      fontSize: 14,
                    }}>
                    거래유형
                  </Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <FtrType />
                  </View>
                </View>
                <View style={{marginBottom: 10}}>
                  <Text
                    style={{
                      fontFamily: 'NotoSansKR-Medium',
                      color: '#999999',
                      fontSize: 14,
                    }}>
                    가격대
                  </Text>
                  <View style={{flex: 1}}>
                    <FtrPrice />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 20,
                  }}>
                  <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="refresh-outline"
                      size={20}
                      color="#444"
                      style={{marginRight: 5}}
                    />
                    <Text
                      style={{fontSize: 13, fontFamily: 'NotoSansKR-Medium'}}>
                      필터 초기화
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalOpen(false)}
                    style={{
                      backgroundColor: '#447DD1',
                      height: 45,
                      width: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'NotoSansKR-Medium',
                        color: '#fff',
                      }}>
                      선택완료
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
      <View style={{paddingHorizontal: PADDING, flex: 1}}>
        <FlatList
          data={newitem}
          style={{flex: 1, alignSelf: 'center'}}
          renderItem={({item, index}) => <PrdItem item={item} />}
          keyExtractor={item => `${item.idx}`}
          numColumns={1}
        />
      </View>
    </View>
  );
};

// const PrdListItems = props => {
//   return (
//     <FlatList
//       data={newitem}
//       style={{flex: 1, alignSelf: 'center'}}
//       renderItem={({item, index}) => <PrdItem item={item} />}
//       keyExtractor={item => `${item.idx}`}
//       numColumns={1}
//     />
//   );
// };

function PrdItem({item}) {
  console.log('prd', item);

  const [fav, setFav] = useState('off');
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        Width: Width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
        paddingTop: 15,
      }}
      onPress={() => navigation.navigate('PrdDetail')}>
      <View
        style={{
          width: Box,
          height: Box,
          borderWidth: 1,
          borderColor: '#e3e3e3',
          borderRadius: 8,
          marginRight: 10,
          padding: 10,
        }}>
        <Image
          style={{resizeMode: 'cover', width: '100%', height: '100%'}}
          source={{uri: item.pt_image1}}
        />
      </View>
      <View style={{flexGrow: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 20,
              width: '60%',
            }}
            numberOfLines={1}>
            {item.pt_title}
          </Text>
          {/* <TouchableWithoutFeedback>
            <Image
              source={
                fav === 'off'
                  ? require('../images/heart_no.png')
                  : require('../images/heart.png')
              }
            />
          </TouchableWithoutFeedback> */}
        </View>
        <Text
          style={{
            fontFamily: 'NotoSansKR-Medium',
            color: '#333',
            fontSize: 13,
            lineHeight: 15,
            paddingBottom: 5,
          }}>
          즉시구매{' '}
          <Text style={{fontFamily: 'NotoSansKR-Regular', color: '#555'}}>
            {item.pt_selling_price}원
          </Text>
        </Text>
        <Text
          style={{
            fontFamily: 'NotoSansKR-Medium',
            color: '#333',
            fontSize: 13,
            lineHeight: 15,
          }}>
          견적 마감{' '}
          <Text style={{fontFamily: 'NotoSansKR-Regular', color: '#555'}}>
            {item.dday}일 전
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
            width: HashWidth,
          }}>
          <Text style={styles.hashtag}>asda</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hashtag: {
    backgroundColor: '#F8F8F8',
    fontSize: 10,
    fontFamily: 'NotoSansKR-Medium',
    lineHeight: 15,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 7,
    color: '#707070',
    marginRight: 4,
    marginBottom: 4,
  },
});

export default NewPrdList;
