import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import API_CALL from '../ApiCall';

const defaultIsVisible = {
  clothes: false,
  shoes: false,
  bag: false,
  acc: false,
};

const ProductRegistCategory1 = props => {
  const {route} = props;
  const {navigation} = props;
  const {params} = route;
  const [ct_id, setId] = useState(params.ct_id);
  const [ct_name, setName] = useState(params.ct_name);
  const [ct_id2, setId2] = useState('');
  const [ct_name2, setName2] = useState('');
  const [ct_id3, setId3] = useState('');
  const [ct_name3, setName3] = useState('');

  // const [categories, setCategories] = useState([]);
  const [item, setItem] = useState([]);

  const [isClicked, setIsClicked] = useState('');

  const onPressToggle = val => {
    if (isClicked === val) {
      setIsClicked('');
    } else {
      setIsClicked(val);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const form = new FormData();
    form.append('method', 'proc_category_list2');
    form.append('ct_id', ct_id);
    form.append('ct_id2', ct_id2);
    form.append('ct_name2', ct_name2);
    form.append('ct_id3', ct_id3);
    form.append('ct_name3', ct_name3);

    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';

    const api = await API_CALL(url + path, form, true);
    console.log(api);
    const {
      data: {method, result, message, count, item},
    } = api;

    setItem(item);
  };
  console.log('item', item[0]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
          {ct_name}
        </Text>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate('Main')}>
          <Icon name="close" size={30} color="#AAAAAA" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          {item.map((arr, i) => (
            <View key={i}>
              <TouchableOpacity
                onPress={() => onPressToggle(i)}
                style={styles.depth1}>
                <Text style={styles.depth1_txt}>{arr.ct_name2}</Text>
                {isClicked !== i ? (
                  <Icon name="add" size={20} color="#aaa" />
                ) : (
                  <Icon name="remove" size={20} color="#aaa" />
                )}
              </TouchableOpacity>
              {isClicked === i ? (
                <View>
                  {arr.ct_name2
                    ? arr.ct3_list.map((arr2, i2) =>
                        arr2.ct_name3 ? (
                          <TouchableOpacity
                            key={i2}
                            style={styles.depth2}
                            onPress={() =>
                              navigation.navigate('ProductRegistBrand', {
                                ct_id: ct_id,
                                ct_id2: arr.ct_id2,
                                ct_id3: arr2.ct_id3,
                              })
                            }>
                            <Text style={styles.depth2_txt}>
                              {arr2.ct_name3}
                            </Text>
                            <Icon
                              name="ios-chevron-forward"
                              size={20}
                              color="#aaa"
                            />
                          </TouchableOpacity>
                        ) : null,
                      )
                    : null}
                </View>
              ) : null}
              {console.log(arr.ct_name2)}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  depth1: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  depth1_txt: {
    fontSize: 16,
    fontFamily: 'NotoSansKR-Bold',
    lineHeight: 20,
  },
  depth2: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  depth2_txt: {
    fontSize: 14,
    fontFamily: 'NotoSansKR-Medium',
    lineHeight: 20,
  },
});

export default ProductRegistCategory1;
