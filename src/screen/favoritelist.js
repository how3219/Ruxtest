import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import Header, {FavoriteHeader} from '../components/header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API_CALL from '../ApiCall';

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
const PADDING = 20;
const Box = Width / 4;

const FavoriteList = ({navigation}) => {
  useEffect(() => {
    getZzimlist();
  }, []);
  const {member} = useSelector(state => state.login);
  const [search,setSearch] = useState('');
  const getZzimlist = async () => {
    const form = new FormData();
    form.append('method', 'proc_myzzim_list');
    form.append('mt_id', member.mt_idx);
    search&&form.append('search', search);
    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    const api = await API_CALL(url + path, form, false);
    const {
      data: {item, result},
    } = api;
    // console.log(item);
    if (result === '0') return;
    if (result === '1') {
      setFavitem(item);
      console.log('AddItem', item);
    }
  };

  const [favitem, setFavitem] = useState([]);
  const handleOnPress = async pm_id => {
    try {
      const form = new FormData();
      form.append('method', 'proc_myzzim_delete');
      form.append('pm_id', pm_id);
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: {result},
      } = api;
      if (result === '0') return Alert.alert('', 'no result');
      if (result === '1') {
        getZzimlist();
      }
    } catch {
      console.log(e);
      
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff '}}>
      <FavoriteHeader title="찜 목록" search={search} setSearch={setSearch} getZzimlist={getZzimlist}/>
      <FlatList
        numColumns={1}
        keyExtractor={item => item.pm_id}
        data={favitem}
        renderItem={({item}) => (
          <View
            style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 20}}>
            <TouchableOpacity
              style={{
                Width: Width,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
                paddingBottom: 10,
                paddingTop: 15,
              }}
              onPress={() => navigation.navigate('PrdDetail',{idx:item.pt_idx})}
              >
              <View
                style={{
                  width: Box,
                  height: Box,
                  borderWidth: 1,
                  borderColor: '#e3e3e3',
                  borderRadius: 8,
                  marginRight: 10,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{resizeMode: 'contain', width: Box, height: Box}}
                  source={{uri: item.pt_image1}}
                />
              </View>
              <View style={{flexGrow: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'NotoSansKR-Bold',
                      lineHeight: 20,
                      flex: 1,
                    }}
                    numberOfLines={1}>
                    {item.pt_title}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'NotoSansKR-Medium',
                    color: '#333',
                    fontSize: 13,
                    lineHeight: 20,
                  }}
                  numberOfLines={1}>
                  즉시구매{' '}
                  <Text style={{fontWeight: 'normal', color: '#555'}}>
                    {item.pt_selling_price}원
                  </Text>
                </Text>
                <Text
                  style={{
                    fontFamily: 'NotoSansKR-Medium',
                    color: '#333',
                    fontSize: 13,
                    lineHeight: 20,
                  }}>
                  견적 마감{' '}
                  <Text style={{fontWeight: 'normal', color: '#555'}}>
                    {item.dday}일 전
                  </Text>
                </Text>
              </View>
              <View style={{alignSelf: 'flex-end'}}>
                <TouchableWithoutFeedback
                  onPress={() => handleOnPress(item.pm_id)}
                  key={item.index}>
                  {/* {fav === false ? (
                    <Icon name="heart-outline" size={30} color="#ccc" />
                  ) : ( */}
                  <Icon name="heart" size={30} color="#477DD1" />
                  {/* )} */}
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FavoriteList;
