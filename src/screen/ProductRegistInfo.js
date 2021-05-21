import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DefaultPicker } from '../components/Select';
import API_CALL from '../ApiCall';
import { useSelector } from 'react-redux';
import DatePicker from '../components/datepicker';
import {launchImageLibrary} from 'react-native-image-picker';
const Width = Dimensions.get('window').width;
const PADDING = 20;
const StatWidth = (Width - PADDING * 2 - 40) / 3;
const PhotoWidth = (Width - PADDING * 2 - 20) / 2;
const PhotoHeight = PhotoWidth - 40;

const sellPicker = [
  { label: '예', value: 'Y' },
  { label: '아니오', value: 'N' },
];

const cityPicker0 = [
  { label: '강원도', value: '강원도' },
  { label: '경기도', value: '경기도' },
  { label: '경상남도', value: '경상남도' },
  { label: '경상북도', value: '경상북도' },
  { label: '광주광역시', value: '광주광역시' },
  { label: '대구광역시', value: '대구광역시' },
  { label: '대전광역시', value: '대전광역시' },
  { label: '부산광역시', value: '부산광역시' },
  { label: '서울특별시', value: '서울특별시' },
  { label: '세종특별자치시', value: '세종특별자치시' },
  { label: '울산광역시', value: '울산광역시' },
  { label: '인천광역시', value: '인천광역시' },
  { label: '전라남도', value: '전라남도' },
  { label: '전라북도', value: '전라북도' },
  { label: '제주특별자치도', value: '제주특별자치도' },
  { label: '충청남도', value: '충청남도' },
  { label: '충청북도', value: '충청북도' },
];



const deliveryPicker = [
  { label: '유료 배송', value: '유료 배송' },
  { label: '무료 배송', value: '무료 배송' },
];

const pakageitem = {
  case: false,
  guarantee: false,
  tag: false,
  receipt: false,
  etc: false,
};

const dealtype = {
  direct: false,
  courier: false,
  safe: false,
};

const ProductRegistInfo = props => {
  const {
    navigation,
    route: { params },
  } = props;
  const defaultsetting = () => {
    let year = new Date().getFullYear();
    let year_option = [];
    let month_option = [];
    setSelectBrand(
      params.brand.map(value => {
        return { label: value.brand_name, value: value.idx };
      }),
    );
    for (let i = 2000; i <= year; i++) {
      year_option[i-2000] = { key: i, label: i + '년', value: i };
    }

    for (let i = 1; i <= 12; i++) {
      month_option[i-1] = { key: i, label: i + '월', value: i };
    }
    setSelectMonth(month_option);
    setSelectYear(year_option);
  };
  const getarea = async() => {
    try{
      const form = new FormData;
      form.append('method','proc_pt_direct_sigugun')
      form.append('pt_direct_si',directsi)
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';

      const api = await API_CALL(url + path, form, false);
      const {data:{result,item}} = api;
      if(result==='0'){Alert.alert('직거래 가능지역 result')}
      else if(result==='1'){
        let gugun = item.map((value)=>{
          return {label:value.pt_direct_gugun,value:value.pt_direct_gugun}
        })
        setCityPicker(gugun)
      }
      
    }catch(e){
      console.log(e)
    }
  }
  const { member } = useSelector(state => state.login);
  const [selectbrand, setSelectBrand] = useState([]);
  const [selectmonth, setSelectMonth] = useState([]);
  const [selectyear, setSelectYear] = useState([]);
  const [title, setTitle] = useState('')
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('')
  const [buyyear, setBuyYear] = useState('');
  const [buymonth, setBuyMonth] = useState('');
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('');
  const [option2_etc, setOption2Etc] = useState('');
  const [directsell, setDirectSell] = useState('');
  const [price, setPrice] = useState('')
  const [deal_type, setDealtype] = useState('');
  const [baesongprice, setBaeSongPrice] = useState('');
  const [baesongcheck, setBaesongCheck] = useState('');
  const [directsi, setdirectsi] = useState('')
  const [directgugun, setdirectgugun] = useState('');
  const [option3, setOption3] = useState('');
  const [option3_etc, setOption3Etc] = useState('');
  const [salenow, setSalenow] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [img5, setImg5] = useState('');
  const [tag, settag] = useState('');
  const [pakage, setPakage] = useState(pakageitem);
  const [deal, setDeal] = useState(dealtype);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [cityPicker,setCityPicker] = useState([])
  useEffect(() => {
    if(directsi){
      getarea()
    }
  }, [directsi]);
  useEffect(() => {
    defaultsetting();    
  }, []);
  const [data_1, setData_1] = useState([
    {
      id: 1,
      title: '백화점',
      state: false,
    },
    {
      id: 2,
      title: '아울렛',
      state: false,
    },
    {
      id: 3,
      title: '편집샵',
      state: false,
    },
    {
      id: 4,
      title: '인터넷',
      state: false,
    },
    {
      id: 5,
      title: '중고거래',
      state: false,
    },
    {
      id: 6,
      title: '모릅니다',
      state: false,
    },
  ]);
  const [data_2, setData_2] = useState([
    {
      id: 14,
      title: '전시품급 컨디션',
      state: false,
    },
    {
      id: 15,
      title: '미세한 사용감',
      state: false,
    },
    {
      id: 16,
      title: '적당한 사용감',
      state: false,
    },
    {
      id: 17,
      title: '사용감이 있어 눈에 보이는 정도',
      state: false,
    },
    {
      id: 18,
      title: '하자나 헤짐 있는 상품',
      state: false,
    },
  ]);
  const [data_3, setData_3] = useState({
    repairstate:false,
    pollutionstate:false,
    Hedgingstate:false,
    scratchstate:false
  });

  const [enroll, setEnroll] = useState(false);
  const [warranty, setWarranty] = useState(false);
  const FormatDate = (date) => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    let result = `${year}-${month}-${day}`
    return result;
  }
  const pickImg = (id) => {
    const options = {
      title: '사진',
      takePhotoButtonTitle: '카메라',
      chooseFromLibraryButtonTitle: '이미지 선택',
      cancelButtonTitle: '취소',
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(img1)
        switch (id) {
          case 1:
            setImg1({
              name:response.fileName,
              type:response.type,
              uri:response.uri
            })
            break;
          case 2:
            setImg2({
              name:response.fileName,
              type:response.type,
              uri:response.uri
            })
            break;
          case 3:
            setImg3({
              name:response.fileName,
              type:response.type,
              uri:response.uri
            })
            break;
          case 4:
            setImg4({
              name:response.name,
              type:response.type,
              uri:response.uri
            })
            break;
          case 5:
            setImg5({
              name:response.name,
              type:response.type,
              uri:response.uri
            })
            break;
          default:
            break;
        }
      }
    });
  };
  const multipleselect = (option,type) => {
    let result = [];
    if(type==='pakage'){
      option.case&&result.push('8')
      option.guarantee&&result.push('10')
      option.tag&&result.push('11')
      option.receipt&&result.push('12')
      option.etc&&result.push('13')
    }else if(type==='deal'){
      option.direct&&result.push('D')
      option.courier&&result.push('B')
      option.safe&&result.push('S')
    }else if(type==='data_3'){
      option.repairstate&&result.push('수선여부')
      option.pollutionstate&&result.push('오염')
      option.Hedgingstate&&result.push('해짐')
      option.scratchstate&&result.push('스크래치')
    }
    return result?result.join(','):''
  }
  const productregi = async() => {
    const form = new FormData;
    form.append('method','proc_item_add')
    form.append('idx',member.mt_idx)
    form.append('ct_id',params.ct_id)
    form.append('ct_id2',params.ct_id2)
    form.append('ct_id3',params.ct_id3)
    form.append('bidx',brand)
    form.append('pt_title',title)
    form.append('pt_size',size)
    form.append('pt_buy_year',buyyear)
    form.append('pt_buy_month',buymonth)
    form.append('pt_option_name1',option1)
    form.append('pt_option_name2[]',multipleselect(pakage,'pakage'))
    form.append('pt_option_name2_etc',option2_etc)
    form.append('pt_direct_sell',directsell)
    form.append('pt_selling_price',price)
    form.append('pt_selling_edate',FormatDate(date))
    form.append('pt_deal_type[]',multipleselect(deal,'deal'))
    form.append('pt_baesong_price_yn',baesongcheck)
    form.append('pt_baesong_price',baesongprice)
    form.append('pt_direct_si',directsi)
    form.append('pt_direct_gugun',directgugun)
    form.append('pt_sale_now',salenow)
    form.append('pt_option_name3',option3)
    form.append('pt_option_name3_etc[]',multipleselect(data_3,'data_3'))
    form.append('pt_image1',img1)
    form.append('pt_image2',img2)
    form.append('pt_image3',img3)
    form.append('pt_image4',img4)
    form.append('pt_image5',img5)
    form.append('pt_tag',size)
    console.log(form)
    const url = 'http://dmonster1566.cafe24.com';
    const path = '/json/proc_json.php';
    const api = await API_CALL(url + path, form, true);
    const {data} = api;
    console.log(data)
    
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
        <Text style={{ fontSize: 18, fontFamily: 'NotoSansKR-Bold' }}>
          상품 정보 입력
        </Text>
        <View style={{ width: 30, height: 30 }}></View>
      </View>
      <ScrollView>
        <View style={{ padding: 20, paddingBottom: 100 }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'NotoSansKR-Bold',
              lineHeight: 20,
              paddingBottom: 20,
            }}>
            상품 정보
          </Text>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>상품명을 알고 계신가요?</Text>
            <TextInput
              placeholder="상품명 입력"
              placeholderTextColor="#C9C9C9"
              style={styles.inputstyle}
              onChangeText={text => setTitle(text)}
            />
            <View style={styles.graybox}>
              <Text style={styles.grayboxtext}>
                ※브랜드명은 쓰지 않아도 되며 상품과 관련없는 경우 불량게시물로
                간주됩니다.
              </Text>
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>브랜드</Text>
            <View style={{}}>
              <DefaultPicker
                picker={selectbrand}
                placeholder="브랜드 선택"
                keyboardType="numeric"
                onChange={setBrand}
              />
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>사이즈가 어떻게 되나요?</Text>
            <TextInput
              placeholder="사이즈 입력"
              placeholderTextColor="#C9C9C9"
              style={styles.inputstyle}
              onChangeText={text => setSize(text)}
            />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>구매시기를 아시나요?</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 100, marginRight: 10 }}>
                <DefaultPicker picker={selectyear} placeholder="연도 선택" onChange={setBuyYear} />
              </View>
              <View style={{ width: 100 }}>
                <DefaultPicker picker={selectmonth} placeholder="월 선택" onChange={setBuyMonth} />
              </View>
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              어디서 구매하셨나요? <Text style={styles.seltext}> (선택1)</Text>
            </Text>
            <View>
              {data_1.map((element, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    setData_1(
                      data_1.map(data => {
                        if (data.id === element.id) {
                          return { ...data, state: true };
                        } else {
                          return { ...data, state: false };
                        }
                      }),
                    ),
                      setOption1(element.title)
                    }
                  }
                  style={{
                    flex: 1,
                    height: 40,
                    backgroundColor:
                      element.state === false ? '#F8F8F8' : '#447DD1',
                    paddingLeft: 20,
                    justifyContent: 'center',
                    borderBottomColor: '#eee',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NotoSansKR-Medium',
                      color: element.state === false ? '#222' : '#fff',
                    }}>
                    {element.title}
                  </Text>
                </TouchableOpacity>
              ))}
              {/* <TouchableOpacity 
                            onPress={() => setStorechoice({...storechoice, outletSelect: !storechoice.outletSelect})}
                            style={{flex:1,height:40,backgroundColor: storechoice.outletSelect === false ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: storechoice.outletSelect === false ? '#222' : '#fff'}}>아울렛</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,height:40,backgroundColor:'#F8F8F8',paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',}}>편집샵</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,height:40,backgroundColor:'#F8F8F8',paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',}}>인터넷(병행수입, 직구)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,height:40,backgroundColor:'#F8F8F8',paddingLeft:20,justifyContent:'center'}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',}}>중고거래</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1,height:40,backgroundColor:'#F8F8F8',paddingLeft:20,justifyContent:'center',}}>
                                <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',}}>모릅니다</Text>
                            </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              구성품이 있나요?{' '}
              <Text style={styles.seltext}> (다중 선택 가능)</Text>
            </Text>
            <View>
              <TouchableOpacity
                onPress={() =>
                  setPakage({ ...pakage, case: !pakage.case, idx: '8' })
                }
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor:
                    pakage.case === false ? '#F8F8F8' : '#447DD1',
                  paddingLeft: 20,
                  justifyContent: 'center',
                  borderBottomColor: '#eee',
                  borderBottomWidth: 1,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NotoSansKR-Medium',
                    color: pakage.case === false ? '#222' : '#fff',
                  }}>
                  케이스
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setPakage({
                    ...pakage,
                    guarantee: !pakage.guarantee,
                    idx: '10',
                  })
                }
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor:
                    pakage.guarantee === false ? '#F8F8F8' : '#447DD1',
                  paddingLeft: 20,
                  justifyContent: 'center',
                  borderBottomColor: '#eee',
                  borderBottomWidth: 1,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NotoSansKR-Medium',
                    color: pakage.guarantee === false ? '#222' : '#fff',
                  }}>
                  정품보증서
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setPakage({ ...pakage, tag: !pakage.tag, idx: '11' })
                }
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: pakage.tag === false ? '#F8F8F8' : '#447DD1',
                  paddingLeft: 20,
                  justifyContent: 'center',
                  borderBottomColor: '#eee',
                  borderBottomWidth: 1,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NotoSansKR-Medium',
                    color: pakage.tag === false ? '#222' : '#fff',
                  }}>
                  택
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setPakage({ ...pakage, receipt: !pakage.receipt, idx: '12' })
                }
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor:
                    pakage.receipt === false ? '#F8F8F8' : '#447DD1',
                  paddingLeft: 20,
                  justifyContent: 'center',
                  borderBottomColor: '#eee',
                  borderBottomWidth: 1,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NotoSansKR-Medium',
                    color: pakage.receipt === false ? '#222' : '#fff',
                  }}>
                  영수증
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setPakage({ ...pakage, etc: !pakage.etc, idx: '13' })
                }
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: pakage.etc === false ? '#F8F8F8' : '#447DD1',
                  paddingLeft: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NotoSansKR-Medium',
                    color: pakage.etc === false ? '#222' : '#fff',
                  }}>
                  기타
                </Text>
              </TouchableOpacity>
              {pakage.etc && (
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <Icon
                    name="md-return-down-forward-sharp"
                    size={20}
                    color="#c9c9c9"
                  />
                  <TextInput
                    style={{
                      borderColor: '#eee',
                      borderWidth: 1,
                      borderRadius: 8,
                      height: 35,
                      padding: 0,
                      paddingLeft: 10,
                      flexGrow: 1,
                      marginLeft: 10,
                      color:'#000'
                    }}
                    placeholder="구성품 입력"
                    placeholderTextColor="#c9c9c9"
                    onChangeText={text=>setOption2Etc(text)}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>즉시 판매가 가능합니까?</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 100 }}>
                <DefaultPicker
                  placeholder="예"
                  picker={sellPicker}
                  onChange={setDirectSell}
                />
              </View>
              <TextInput
                placeholder="판매 금액"
                placeholderTextColor="#c9c9c9"
                keyboardType="numeric"
                style={[styles.inputstyle, { flex: 1, marginLeft: 5 }]}
                onChangeText={text => setPrice(text)}
              />
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>입찰 마감일이 언제입니까?</Text>
            <TouchableOpacity
              onPress={() => setShow(!show)}>
              <TextInput
                placeholder="날짜 선택"
                placeholderTextColor="#C9C9C9"
                style={styles.inputstyle}
                editable={false}
                value={FormatDate(date)}
              />
            </TouchableOpacity>
            <DatePicker show={show} setShow={setShow} date={date} setDate={setDate} />
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              거래 유형을 선택해주세요.
              <Text style={styles.seltext}> (다중 선택 가능)</Text>
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {setDeal({ ...deal, direct: !deal.direct })}}
                style={{
                  backgroundColor: deal.direct === false ? '#fff' : '#447DD1',
                  borderColor: '#447DD1',
                  borderWidth: 1,
                  height: 35,
                  flex: 1,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NotoSansKR-Medium',
                    color: deal.direct === false ? '#447DD1' : '#fff',
                    lineHeight: 20,
                  }}>
                  직거래
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {setDeal({ ...deal, courier: !deal.courier })}}
                style={{
                  backgroundColor: deal.courier === false ? '#fff' : '#447DD1',
                  borderColor: '#447DD1',
                  borderWidth: 1,
                  height: 35,
                  flex: 1,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NotoSansKR-Medium',
                    color: deal.courier === false ? '#447DD1' : '#fff',
                    lineHeight: 20,
                  }}>
                  택배거래
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDeal({ ...deal, safe: !deal.safe })}
                style={{
                  backgroundColor: deal.safe === false ? '#fff' : '#447DD1',
                  borderColor: '#447DD1',
                  borderWidth: 1,
                  height: 35,
                  flex: 1,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NotoSansKR-Medium',
                    color: deal.safe === false ? '#447DD1' : '#fff',
                    lineHeight: 20,
                  }}>
                  안전거래
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {deal.direct && (
            <View style={styles.contbox}>
              <Text style={styles.contitle}>
                직거래 가능 지역을 선택해주세요.
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 120, marginRight: 10 }}>
                  <DefaultPicker
                    placeholder="시/도 선택"
                    picker={cityPicker0}
                    onChange={setdirectsi}
                  />
                </View>
                <View style={{ width: 120 }}>
                  <DefaultPicker
                    placeholder="구/군 선택"
                    picker={cityPicker}
                    onChange={setdirectgugun}
                  />
                </View>
              </View>
            </View>
          )}
          {(deal.courier || deal.safe) && (
            <View style={styles.contbox}>
              <Text style={styles.contitle}>배송비가 있습니까?</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 120, marginRight: 10 }}>
                  <DefaultPicker
                    placeholder="유료 배송"
                    picker={deliveryPicker}
                    onChange={setBaesongCheck}
                  />
                </View>
                <TextInput
                  placeholder="금액 입력"
                  style={[styles.inputstyle, { flex: 1 }]}
                  keyboardType="numeric"
                  onChangeText={text=>setBaeSongPrice(text)}
                />
              </View>
            </View>
          )}
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              제품의 상태를 알려주세요.
              <Text style={styles.seltext}> (선택1)</Text>
            </Text>
            <View>
              {data_2.map((element, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() =>{
                    setData_2(
                      data_2.map(data => {
                        if (data.id === element.id) {
                          return { ...data, state: true };
                        } else {
                          return { ...data, state: false };
                        }
                      }),
                    )
                    setOption3(element.id)
                    }
                  }
                  style={{
                    flex: 1,
                    height: 40,
                    backgroundColor:
                      element.state === false ? '#F8F8F8' : '#447DD1',
                    paddingLeft: 20,
                    justifyContent: 'center',
                    borderBottomColor: '#eee',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NotoSansKR-Medium',
                      color: element.state === false ? '#222' : '#fff',
                    }}>
                    {element.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 10, width: '100%' }}>
              <Icon
                name="md-return-down-forward-sharp"
                size={20}
                color="#c9c9c9"
              />
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  marginLeft: 10,
                }}>
                  <TouchableOpacity
                    onPress={() =>{setData_3({...data_3,repairstate:!data_3.repairstate})}}
                    style={{
                      backgroundColor:
                      data_3.repairstate=== false ? '#fff' : '#447DD1',
                      borderColor: '#447DD1',
                      borderWidth: 1,
                      height: 35,
                      width: StatWidth,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'NotoSansKR-Medium',
                        color: data_3.repairstate === false ? '#447DD1' : '#fff',
                        lineHeight: 20,
                      }}>
                      수선여부
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>{setData_3({...data_3,pollutionstate:!data_3.pollutionstate})}}
                    style={{
                      backgroundColor:
                      data_3.pollutionstate === false ? '#fff' : '#447DD1',
                      borderColor: '#447DD1',
                      borderWidth: 1,
                      height: 35,
                      width: StatWidth,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'NotoSansKR-Medium',
                        color: data_3.pollutionstate === false ? '#447DD1' : '#fff',
                        lineHeight: 20,
                      }}>
                      오염
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>{setData_3({...data_3,Hedgingstate:!data_3.Hedgingstate})}}
                    style={{
                      backgroundColor:
                      data_3.Hedgingstate === false ? '#fff' : '#447DD1',
                      borderColor: '#447DD1',
                      borderWidth: 1,
                      height: 35,
                      width: StatWidth,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'NotoSansKR-Medium',
                        color: data_3.Hedgingstate === false ? '#447DD1' : '#fff',
                        lineHeight: 20,
                      }}>
                      헤짐
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>{setData_3({...data_3,scratchstate:!data_3.scratchstate})}}
                    style={{
                      backgroundColor:
                      data_3.scratchstate === false ? '#fff' : '#447DD1',
                      borderColor: '#447DD1',
                      borderWidth: 1,
                      height: 35,
                      width: StatWidth,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'NotoSansKR-Medium',
                        color: data_3.scratchstate === false ? '#447DD1' : '#fff',
                        lineHeight: 20,
                      }}>
                      스크래치
                    </Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.contbox}>
            <Text style={styles.contitle}>
              사진 등록<Text style={styles.seltext}> (필수)</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#C9C9C9',
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    width: PhotoWidth,
                    height: PhotoHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                  onPress={()=>{pickImg(1)}}>                                      
                  {                    
                    <>
                      <View style={!img1?{ width: 44, height: 38, marginBottom: 5 }:{width: '100%', height: '100%'}}>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                          source={img1?{uri:img1.uri}:require('../images/camera.png')}
                        />
                      </View>
                      {
                        !img1&&
                      <View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                            textAlign: 'center',
                          }}>
                          전면
                        </Text>
                      </View>     
                      }
                      </>
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#C9C9C9',
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    width: PhotoWidth,
                    height: PhotoHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                  onPress={()=>{pickImg(2)}}>                                      
                  {                                    
                    <>
                      <View style={!img2?{ width: 44, height: 38, marginBottom: 5 }:{width: '100%', height: '100%'}}>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                          source={img2?{uri:img2.uri}:require('../images/camera.png')}
                        />
                      </View>
                      {
                        !img2&&
                      <View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                            textAlign: 'center',
                          }}>
                          후면
                        </Text>
                      </View>
                      }
                      </>
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#C9C9C9',
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    width: PhotoWidth,
                    height: PhotoHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                  onPress={()=>{pickImg(3)}}>                                      
                  {                    
                    <>
                      <View style={!img3?{ width: 44, height: 38, marginBottom: 5 }:{width: '100%', height: '100%'}}>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                          source={img3?{uri:img3.uri}:require('../images/camera.png')}
                        />
                      </View>
                      {
                        !img3&&
                      <View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                            textAlign: 'center',
                          }}>
                          냅주 허리택, 목택, 브랜드 택
                        </Text>
                      </View>     
                      }
                      </>
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#C9C9C9',
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    width: PhotoWidth,
                    height: PhotoHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                  onPress={()=>{pickImg(4)}}>                                      
                  {                    
                    <>
                      <View style={!img4?{ width: 44, height: 38, marginBottom: 5 }:{width: '100%', height: '100%'}}>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                          source={img4?{uri:img4.uri}:require('../images/camera.png')}
                        />
                      </View>
                      {
                        !img4&&
                      <View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                            textAlign: 'center',
                          }}>
                          구성품
                        </Text>
                      </View>     
                      }
                      </>
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#C9C9C9',
                    borderStyle: 'dashed',
                    borderRadius: 5,
                    width: PhotoWidth,
                    height: PhotoHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                  onPress={()=>{pickImg(5)}}>                                      
                  {                    
                    <>
                      <View style={!img5?{ width: 44, height: 38, marginBottom: 5 }:{width: '100%', height: '100%'}}>
                        <Image
                          style={{
                            resizeMode: 'cover',
                            width: '100%',
                            height: '100%',
                          }}
                          source={img5?{uri:img5.uri}:require('../images/camera.png')}
                        />
                      </View>
                      {
                        !img5&&
                      <View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: 'NotoSansKR-Regular',
                            lineHeight: 20,
                            textAlign: 'center',
                          }}>
                          사용감, 하자
                        </Text>
                      </View>     
                      }
                      </>
                  }
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#EBEBEB',
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: '#fff',
          }}>
          <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Medium' }}>
            등록 취소
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#EBEBEB',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setWarranty(true)}>
          <Text style={{ fontSize: 16, fontFamily: 'NotoSansKR-Medium' }}>
            상품 등록
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={enroll}
        transparent={true}
        style={{ flex: 1 }}
        onRequestClose={() => setEnroll(false)}
        animationType="fade">
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              height: 140,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 20,
                paddingBottom: 10,
              }}>
              상품 등록
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'NotoSansKR-Regular',
                lineHeight: 20,
              }}>
              입력 하신 내용으로 상품을 등록하시겠습니까?
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  borderRadius: 8,
                  height: 35,
                  width: 64,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                }}
                onPress={() => setEnroll(false)}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    color: '#fff',
                    lineHeight: 20,
                  }}>
                  취소
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  borderRadius: 8,
                  height: 35,
                  width: 64,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                }}
                onPress={() => {setWarranty(true),productregi()}}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    color: '#fff',
                    lineHeight: 20,
                  }}>
                  확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={warranty}
        animationType="fade"
        transparent={true}
        style={{ flex: 1 }}
        onRequestClose={() => setWarranty(false)}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              paddingVertical: 30,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'NotoSansKR-Medium',
                lineHeight: 20,
                paddingBottom: 10,
              }}>
              상품 등록
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'NotoSansKR-Regular',
                lineHeight: 20,
                textAlign: 'center',
              }}>
              정품 보증서를 발급 받으실 경우, 더욱 더 원활한 판매가 가능합니다.
              정품 감정 서비스를 신청 하시겠습니까?
            </Text>
            <View style={{ paddingTop: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 35,
                  width: 185,
                  marginBottom: 10,
                }}
                onPress={()=>{setSalenow('N')}}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    color: '#fff',
                    lineHeight: 20,
                  }}>
                  네, 신청할게요
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 35,
                  width: 185,
                  marginBottom: 10,
                }}
                onPress={() => {setEnroll(true),setSalenow('Y')}}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    color: '#fff',
                    lineHeight: 20,
                  }}>
                  아니요, 괜찮아요
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#447DD1',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 35,
                  width: 185,
                  marginBottom: 5,
                }}
                onPress={() => { setWarranty(false), navigation.navigate('AppraisalCostGuide') }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Regular',
                    color: '#fff',
                    lineHeight: 20,
                  }}>
                  감정 비용 보기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  inputstyle: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    height: 35,
    paddingLeft: 10,
    paddingVertical: 0,
    marginBottom: 5,
    color: '#000',
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
  seltext: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'NotoSansKR-Regular',
  },
});

export default ProductRegistInfo;
