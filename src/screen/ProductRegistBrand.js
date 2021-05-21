import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_CALL from '../ApiCall';

//컴포넌트
// import ProductRegistBrandList from '../components/ProductRegistBrandList';

const ProductRegistBrand = props => {
  const {navigation} = props;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: '#EEEEEE',
            borderBottomWidth: 1,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#aaa" />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontFamily: 'NotoSansKR-Bold'}}>
            브랜드 선택
          </Text>
          <View style={{width: 30, height: 30}}></View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#eee',
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 35,
            paddingHorizontal: 10,
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          <TextInput
            style={{padding: 0, color: '#222'}}
            placeholder="제품명을 입력해주세요."
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity>
            <Icon name="search" size={24} color="#447DD1" />
          </TouchableOpacity>
        </View>
      </View>
      <ProductRegistBrandList {...props} />
    </SafeAreaView>
  );
};

const Width = Dimensions.get('window').width;
const Boxwidth = Width / 2 - 30;
const Boxheight = Boxwidth - 70;

const ProductRegistBrandList = props => {
  // const brandItem= [
  //     {
  //         id:1,
  //         title:'티파니',
  //         image:require('../images/make01.jpg'),
  //     },
  //     {
  //         id:2,
  //         title:'지방시',
  //         image:require('../images/make02.jpg'),
  //     },
  //     {
  //         id:3,
  //         title:'에르메스',
  //         image:require('../images/make03.jpg'),
  //     },
  //     {
  //         id:4,
  //         title:'프라다',
  //         image:require('../images/make04.jpg'),
  //     },
  //     {
  //         id:5,
  //         title:'오메가',
  //         image:require('../images/make05.jpg'),
  //     },
  // ]

  const {route, navigation} = props;
  const {params} = route;
  const [ct_id, setId] = useState(params.ct_id);
  const [ct_id2, setId2] = useState(params.ct_id2);
  const [ct_id3, setId3] = useState(params.ct_id3);
  const [idx, setIdx] = useState('');
  const [brand_name, setBrand_name] = useState('');
  const [brand_img, setBrand_img] = useState('');

  const [items, setItem] = useState([]);

  useEffect(() => {
    getBrandItem();
  }, []);

  const getBrandItem = async () => {
    const form = new FormData();
    form.append('method', 'proc_brand_list');
    form.append('idx', idx);
    form.append('brand_name', brand_name);
    form.append('brand_img', brand_img);
    form.append('ct_id', ct_id);
    form.append('ct_id2', ct_id2);
    form.append('ct_id3', ct_id3);

    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';

    const api = await API_CALL(url + path, form, true);
    // console.log(api);
    const {
      data: {method, result, message, count, item},
    } = api;

    setItem(item);
    // console.log(item);
  };
  //   console.log('item', item);

  return (
    <View
      style={{
        width: Width,
        flex: 1,
        padding: 20,
      }}>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={{flex: 1}}
        data={items}
        renderItem={({item, index}) => (
          <BrandItem
            item={item}
            navigation={navigation}
            params={params}
            items={items}
          />
        )}
        keyExtractor={item => `${item.idx}`}
        numColumns={2}
      />
    </View>
  );
};

const BrandItem = props => {
  // const navigation = useNavigation();
  const {item, navigation, params, items} = props;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductRegistInfo', {
          brand_name: item.brand_name,
          idx: item.idx,
          ct_id: params.ct_id,
          ct_id2: params.ct_id2,
          ct_id3: params.ct_id3,
          brand: items,
        })
      }
      style={{width: Boxwidth, paddingBottom: 12}}>
      <View
        style={{
          width: Boxwidth,
          borderWidth: 1,
          borderColor: '#eee',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <View style={{width: Boxwidth, height: Boxheight}}>
          <Image
            style={{resizeMode: 'cover', width: '100%', height: '100%'}}
            source={{uri: item.brand_img}}
          />
        </View>
      </View>
      <View style={{width: Boxwidth, alignItems: 'center', paddingTop: 6}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'NotoSansKR-Medium',
            lineHeight: 20,
          }}>
          {item.brand_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductRegistBrand;
