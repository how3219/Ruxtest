import React, {useState,useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet,TextInput,Dimensions, Image, Modal, Alert,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DefaultPicker} from '../components/Select';
import {useSelector} from 'react-redux';
import DatePicker from '../components/datepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import API_CALL from '../ApiCall';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const PADDING = 20;
const StatWidth = (Width - PADDING * 2 - 40) / 3;
const PhotoWidth = (Width - PADDING * 2 - 20) / 2;
const PhotoHeight = PhotoWidth - 40;


const sellPicker =[
    {label: '예', value:'Y'},
    {label: '아니오', value:'N'},
]

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
    {label: '유료 배송', value:'Y'},
    {label: '무료 배송', value:'N'},
]



const dealtype= {
    direct: false,
    courier: false,
    safe: false,
}



const ReigsteredProductInfo = (props) => {
    const {route:{params},navigation} = props
    const {member} = useSelector(state => state.login)
    const [isLoading,setisLoading] = useState(true)
    const [pakage, setPakage] = useState([]);
    const [detailitem,setDetailItem] = useState([])
    const [cityPicker,setCityPicker] = useState([])
    const [brandPicker,setBrandPicker] = useState([]);
    const [brand,setBrand] = useState('');
    const [deal, setDeal] = useState(dealtype);
    const [selectdeal, setSelectDeal] = useState('');
    const [selectmonth, setSelectMonth] = useState([]);
    const [selectyear, setSelectYear] = useState([]);
    const [select_month, setMonth] = useState('');
    const [select_year, setYear] = useState('');
    const [sell, setSell] = useState('');
    const [exposure,setExposure] = useState('');
    const [directsi, setdirectsi] = useState('')
    const [directgugun, setdirectgugun] = useState('');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [data_1,setData_1] = useState([]);
    const [data_2,setData_2] = useState([])
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [img5, setImg5] = useState('');
    const [selectimg,setSelectImg] = useState('');
    const [useimage,setUseImage] = useState(false)
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('');
    const [price,setPrice] = useState('');
    const [option2_etc, setOption2Etc] = useState('');
    const [option3, setOption3] = useState('');
    const [option3_etc, setOption3Etc] = useState('');
    const [title,setTitle] = useState('');
    const [size,setSize] = useState('');
    const [baesongcheck,setBaesongCheck] = useState('');
    const [baesongprice,setBaesongPrice] = useState('');
    const [data_3,setData_3] = useState([
        {
            id:1,
            title:'수선여부',
            state:false,
        },
        {
            id:2,
            title:'오염',
            state:false,
        },
        {
            id:3,
            title:'헤짐',
            state:false,
        },
        {
            id:4,
            title:'스크래치',
            state:false,
        },
    ])
    
    const multipleselect = (option,type) => {
        let result = [];
        if(type==='pakage'){
          option.indexOf('케이스')!==-1&&result.push('8')
          option.indexOf('택')!==-1&&result.push('10')
          option.indexOf('영수증')!==-1&&result.push('11')
          option.indexOf('정품 보증서')!==-1&&result.push('12')
          option.indexOf('기타')!==-1&&result.push('13')
        }else if(type==='deal'){
          option.indexOf('직거래')!==-1&&result.push('D')
          option.indexOf('택배거래')!==-1&&result.push('B')
          option.indexOf('안전거래')!==-1&&result.push('S')
        }
        return result?result.join(','):''
      }

    const defaultsetting = () => {
        let year = new Date().getFullYear();
        let year_option = [];
        let month_option = [];        
        for (let i = 2010; i <= year; i++) {
          year_option[i-2010] = { key: i, label: i + '년', value: i.toString() };
        }    
        for (let i = 1; i <= 12; i++) {
          month_option[i-1] = { key: i, label: i + '월', value: i<10?'0'+i:i.toString() };
        }
        setSelectMonth(month_option);
        setSelectYear(year_option);
      };
    const getarea = async(si) => {
        try{
            const form = new FormData;
            form.append('method','proc_pt_direct_sigugun')
            form.append('pt_direct_si',directsi?directsi:si)
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';

            const api = await API_CALL(url + path, form, false);
            const {data:{result,item,message}} = api;
            if(result==='0'){Alert.alert('',message)}
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
    const getDetailItem = async() => {
        const form = new FormData;
        form.append('method','proc_item_mdetail')
        form.append('idx',params.idx)
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {data:{result,item,message}} = api;
        if(result==='0'){Alert.alert('',message)}
        else if(result==='1'){  
            createSelectVal(item[0])
            setDetailItem(item[0])
            await getarea(item[0].pt_direct_si)
            setSelectDeal(item[0].pt_deal_type.split('/'))
            setisLoading(false)
           
        }
    }
    
    const FormatDate = (date) => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth());
        month = month >= 10 ? month : '0' + month;
        let day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        let result = `${year}-${month}-${day}`
        return result;
      }
    const getbrand = async() => {
        const form = new FormData();
        form.append('method', 'proc_brand_list');
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        // console.log(api);
        const {
        data: {method, result, message, count, item},
        } = api;
        if(result==='0'){Alert.alert('',message)}
        if(result==='1'){
            await setBrandPicker(
                item.map(value => {
                    return { label: value.brand_name, value: value.idx };
                }),
            )
        }
    }
    const createSelectVal = (item) => {
        setBrand(item.bidx)
        setMonth(item.pt_buy_month)
        setYear(item.pt_buy_year)
        setSell(item.pt_direct_sell)
        setExposure(item.pt_sale_now)
        setdirectsi(item.pt_direct_si)
        setdirectgugun(item.pt_direct_gugun)
        setTitle(item.pt_title)
        setSize(item.pt_size)
        setDate(new Date(item.pt_selling_edate))
        setOption1(item.pt_option_name1)
        setOption2(item.pt_option_name2.split(','))
        setPrice(item.pt_selling_price)
        setBaesongCheck(item.pt_baesong_price_yn)
        setBaesongPrice(item.pt_baesong_price)
        setOption3(item.pt_option_name3_id)
        setOption3Etc(item.pt_option_name3_etc.split(','))
        setImg1(item.pt_image1=="https://dmonster1566.cafe24.com/images/uploads/"?'':{uri:item.pt_image1})
        setImg2(item.pt_image2=="https://dmonster1566.cafe24.com/images/uploads/"?'':{uri:item.pt_image2})
        setImg3(item.pt_image2=="https://dmonster1566.cafe24.com/images/uploads/"?'':{uri:item.pt_image3})
        setImg4(item.pt_image4=="https://dmonster1566.cafe24.com/images/uploads/"?'':{uri:item.pt_image4})
        setImg5(item.pt_image5=="https://dmonster1566.cafe24.com/images/uploads/"?'':{uri:item.pt_image5})
    }

    const pickImg = (id) => {
      const options = {
        title: 'Select Image',
        customButtons: [
          { 
            name: 'customOptionKey', 
            title: 'Choose file from Custom Option' 
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
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
          switch (id) {
            case '1':
              setImg1({
                name:response.fileName,
                type:response.type,
                uri:response.uri
              })
              break;
            case '2':
              setImg2({
                name:response.fileName,
                type:response.type,
                uri:response.uri
              })
              break;
            case '3':
              setImg3({
                name:response.fileName,
                type:response.type,
                uri:response.uri
              })
              break;
            case '4':
              setImg4({
                name:response.name,
                type:response.type,
                uri:response.uri
              })
              break;
            case '5':
              setImg5({
                name:response.name,
                type:response.type,
                uri:response.uri
              })
              break;
            default:
              break;
          }
          setUseImage(false)
        }
      });
    };

    const getselect1 = async() => {
        const form = new FormData;
        form.append('method','proc_item_select_list')
        form.append('select_name','어디서 구매하셨나요?')
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {data:{result,item,message}} = api;
        if(result==='0'){Alert.alert('',message)}
        else if(result==='1'){  
            setData_1(item)
        }
    }
    const onPressOption2 = (el) => {
      let result = Object.assign([],option2);
      option2.length===0||option2.indexOf(el.option_name)===-1?
      result.push(el.option_name):
        result = result.filter((val)=>{
          return val!==el.option_name
        })
        setOption2(result)
    }
    const getselect2 = async() => {
        const form = new FormData;
        form.append('method','proc_item_select_list')
        form.append('select_name','구성품이 있나요?')
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {data:{result,item,message}} = api;
        if(result==='0'){Alert.alert('',message)}
        else if(result==='1'){  
            setPakage(item)
        }
    }
    const getselect3 = async() => {
        const form = new FormData;
        form.append('method','proc_item_select_list')
        form.append('select_name','제품의 상태를 알려주세요.')
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, false);
        const {data:{result,item,message}} = api;
        if(result==='0'){Alert.alert('',message)}
        else if(result==='1'){  
            setData_2(item)
        }
    }
    useEffect(() => {
        if(directsi){
          getarea()
        }
      }, [directsi]);
      
      useEffect(() => {
        defaultsetting();    
        getDetailItem();
        getbrand();
        getselect1();
        getselect2();
        getselect3();
      }, []);
      const opPressDeal = (type) => {
        let result = Object.assign([],selectdeal);
        selectdeal.length===0||selectdeal.indexOf(type)===-1?
        result.push(type):
          result = result.filter((val)=>{
            return val!==type
          })
          setSelectDeal(result)
      }
    const onPressOption3 = (el) => {
      let result = Object.assign([],option3_etc);
      option3_etc.length===0||option3_etc.indexOf(el)===-1?
      result.push(el):
        result = result.filter((val)=>{
          return val!==el
        })
        setOption3Etc(result)
    }
    const delImg = (id) => {
      switch (id) {
        case '1':
          setImg1(null)
          break;
        case '2':
          setImg2(null)
          break;
        case '3':
          setImg3(null)
          break;
        case '4':
          setImg4(null)
          break;
        case '5':
          setImg5(null)
          break;
        default:
          break;
      }
      setUseImage(false)
    }
    const productregi = async() => {
      const form = new FormData;
      form.append('method','proc_item_detail')
      form.append('idx',member.mt_idx)
      form.append('ct_id',detailitem.ct_pid)
      form.append('ct_id2',detailitem.ct_id)
      form.append('ct_id3',detailitem.ct_id2)
      form.append('bidx',brand)
      form.append('pt_title',title)
      form.append('pt_size',size)
      form.append('pt_buy_year',select_year)
      form.append('pt_buy_month',select_month)
      form.append('pt_option_name1',option1)
      form.append('pt_option_name2',multipleselect(option2,'pakage'))
      form.append('pt_option_name2_etc',detailitem.pt_option_name2_etc)
      form.append('pt_direct_sell',sell)
      form.append('pt_selling_price',price)
      form.append('pt_selling_edate',FormatDate(date))
      form.append('pt_deal_type',multipleselect(selectdeal,'deal'))
      form.append('pt_baesong_price_yn',baesongcheck)
      form.append('pt_baesong_price',baesongprice)
      form.append('pt_direct_si',directsi)
      form.append('pt_direct_gugun',directgugun)
      form.append('pt_sale_now',exposure)
      form.append('pt_option_name3',option3)
      form.append('pt_option_name3_etc',option3_etc)
      img1?form.append('pt_image1',img1):form.append('pt_image1_del','Y')
      img2?form.append('pt_image2',img2):form.append('pt_image2_del','Y')
      img3?form.append('pt_image3',img3):form.append('pt_image3_del','Y')
      img4?form.append('pt_image4',img4):form.append('pt_image4_del','Y')
      img5?form.append('pt_image5',img5):form.append('pt_image5_del','Y')
      console.log(form)
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, true);
      const {data:{result,message}} = api;
      console.log(result,message)
      if(result==='0') Alert.alert('',message)
      else if(result==='1'){
        Alert.alert('',message)
        navigation.navigate('RegisteredProduct');
      }      
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
          {isLoading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                flex: 1,
                height: Dimensions.get('window').height,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
                elevation: 0,
                backgroundColor: 'rgba(255,255,255,0.8)',
              }}>
              <ActivityIndicator size="large" color="#275696" />
            </View>
          )}
          <Modal
              transparent={true}
              animationType="fade"
              visible={useimage}
              onRequestClose={() => setUseImage(false)}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                }}>
                <View
                  style={{
                    width: Width,
                    height: Height,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <TouchableOpacity style={{paddingHorizontal:70,paddingVertical:20,marginBottom:10,backgroundColor:'white'}} onPress={()=>pickImg(selectimg)}>
                      <Text style={{fontWeight:'bold',fontSize:16}}>사진 선택</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingHorizontal:70,paddingVertical:20,marginBottom:10,backgroundColor:'white'}} onPress={()=>delImg(selectimg)}>
                      <Text style={{fontWeight:'bold',fontSize:16}}>사진 삭제</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={{flexDirection:'row',height:60,justifyContent:'space-between',alignItems:'center',borderBottomColor:'#EEEEEE',borderBottomWidth:1,paddingHorizontal:20,}}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#aaa"/>
                </TouchableOpacity>
                <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>상품 정보 입력</Text>
                <View style={{width:30,height:30,}}></View>
            </View>
            <ScrollView>
                <View style={{padding:20,paddingBottom:100,}}>
                    <Text style={{fontSize:15,fontFamily:'NotoSansKR-Bold',lineHeight:20,paddingBottom:20,}}>상품 정보</Text>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>상품명을 알고 계신가요?</Text>
                        <TextInput
                            placeholder="상품명 입력"
                            placeholderTextColor="#C9C9C9"
                            style={styles.inputstyle}
                            value={title}
                            onChangeText={text=>setTitle(text)}
                        />
                        <View style={styles.graybox}>
                            <Text style={styles.grayboxtext}>※브랜드명은 쓰지 않아도 되며 상품과 관련없는 경우 불량게시물로 간주됩니다.</Text>
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>브랜드</Text>
                        <View style={{}}>
                        {brandPicker.length!==0&&<DefaultPicker picker={brandPicker?brandPicker:null} placeholder="브랜드 선택" value={brand?brand:null} onChange={setBrand}/>}
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>사이즈가 어떻게 되나요?</Text>
                        <TextInput
                            placeholder="사이즈 입력"
                            placeholderTextColor="#C9C9C9"
                            style={styles.inputstyle}
                            value={size}
                            onChangeText={text=>setSize(text)}
                        />
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>구매시기를 아시나요?</Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:100,marginRight:10,}}>
                                {detailitem&&detailitem.pt_buy_year&&<DefaultPicker picker={selectyear} placeholder="연도 선택" value={select_year} onChange={setYear}/>}
                            </View>
                            <View style={{width:100,}}>
                                {detailitem&&detailitem.pt_buy_month&&<DefaultPicker picker={selectmonth} placeholder="월 선택" value={select_month} onChange={setMonth}/>}
                            </View>
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>어디서 구매하셨나요? <Text style={styles.seltext}> (선택1)</Text></Text>
                        <View>
                            {data_1?.map((element,key)=>(
                                <TouchableOpacity 
                                    key={key}
                                    onPress={() => {setOption1(element.option_name)}}
                                    style={{flex:1,height:40,backgroundColor: element.option_name !== option1 ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                    <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: element.option_name !== option1 ? '#222' : '#fff'}}>{element.option_name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>구성품이 있나요? <Text style={styles.seltext}> (다중 선택 가능)</Text></Text>
                        <View>
                            {
                                detailitem&&pakage?.map((rows)=>{
                                    return(
                                    <TouchableOpacity 
                                        key={rows.io_id}
                                        onPress={()=>onPressOption2(rows)}
                                        style={{flex:1,height:40,backgroundColor:  option2&&option2.indexOf(rows.option_name)=== -1 ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: option2&&option2.indexOf(rows.option_name)=== -1 ? '#222' : '#fff'}}>{rows.option_name}</Text>
                                    </TouchableOpacity>
                                    )
                                })
                            }
                            { detailitem.pt_option_name2?.indexOf('기타')!== -1 && (
                                <View style={{flexDirection:'row',flex:1,alignItems:'center',paddingTop:10,}}>
                                <Icon name="md-return-down-forward-sharp" size={20} color="#c9c9c9"/>
                                <TextInput
                                    style={{borderColor:'#eee',borderWidth:1,borderRadius:8,height:35,padding:0,paddingLeft:10,flexGrow:1,marginLeft:10,color:'#000'}}
                                    placeholder="구성품 입력"
                                    placeholderTextColor="#c9c9c9"
                                    value={detailitem.pt_option_name2_etc}
                                    onChangeText={text=>setDetailItem({...detailitem,pt_option_name2_etc:text})}
                                />
                            </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>즉시 판매가 가능합니까?</Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:100,}}>
                                <DefaultPicker placeholder="예" picker={sellPicker} value={sell?sell:null} onChange={setSell}/>
                            </View>
                            <TextInput
                                placeholder="금액 입력"
                                placeholderTextColor="#c9c9c9"
                                style={[styles.inputstyle, {flex:1,marginLeft:5,}]}
                                value={price}
                                onChangeText={text=>setPrice(text)}
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
                    <Text style={styles.contitle}>거래 유형을 선택해주세요.<Text style={styles.seltext}> (다중 선택 가능)</Text></Text>
                    <View style={{flexDirection:'row',}}>
                        <TouchableOpacity 
                        onPress={() => opPressDeal('직거래')}
                        style={{
                            backgroundColor: selectdeal&&selectdeal.indexOf('직거래') === -1 ? '#fff' : '#447DD1' ,
                            borderColor: '#447DD1',
                            borderWidth:1,
                            height:35,
                            flex:1,
                            borderRadius:8,
                            justifyContent:'center',
                            alignItems:'center',
                            }}>
                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: selectdeal&&selectdeal.indexOf('직거래') === -1 ? '#447DD1' : '#fff' ,lineHeight:20,}}>직거래</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => opPressDeal('택배거래')}
                        style={{
                            backgroundColor: selectdeal&&selectdeal.indexOf('택배거래') === -1 ? '#fff' : '#447DD1' ,
                            borderColor: '#447DD1',
                            borderWidth:1,
                            height:35,
                            flex:1,
                            borderRadius:8,
                            justifyContent:'center',
                            alignItems:'center',
                            marginHorizontal:5,
                            }}>
                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: selectdeal&&selectdeal.indexOf('택배거래') === -1 ? '#447DD1' : '#fff' ,lineHeight:20,}}>택배거래</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => opPressDeal('안전거래')}
                        style={{
                            backgroundColor: selectdeal&&selectdeal.indexOf('안전거래') === -1 ? '#fff' : '#447DD1' ,
                            borderColor: '#447DD1',
                            borderWidth:1,
                            height:35,
                            flex:1,
                            borderRadius:8,
                            justifyContent:'center',
                            alignItems:'center',
                            }}>
                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: selectdeal&&selectdeal.indexOf('안전거래') === -1 ? '#447DD1' : '#fff' ,lineHeight:20,}}>안전거래</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    {selectdeal&&selectdeal.indexOf('직거래') !== -1 ? (
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>직거래 가능 지역을 선택해주세요.</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:120,marginRight:10,}}>
                                    <DefaultPicker
                                        placeholder="시/도 선택"
                                        picker={cityPicker0}
                                        value={directsi}
                                        onChange={setdirectsi}
                                    />
                                </View>
                                <View style={{width:120,}}>
                                    <DefaultPicker
                                        placeholder="구/군 선택"
                                        picker={cityPicker}
                                        value={cityPicker?directgugun:null}
                                        onChange={setdirectgugun}
                                    />
                                </View>
                            </View>
                        </View>
                    ):null}
                    {(selectdeal&&selectdeal.indexOf('택배거래') !== -1||selectdeal&&selectdeal.indexOf('안전거래') !== -1) ? (
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>배송비가 있습니까?</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:120,marginRight:10,}}>
                                    <DefaultPicker
                                        placeholder="유료 배송"
                                        picker={deliveryPicker}
                                        value={baesongcheck}
                                        onChange={setBaesongCheck}
                                    />
                                </View>
                                <TextInput
                                    placeholder="금액 입력"
                                    style={[styles.inputstyle, {flex:1,}]}
                                    keyboardType="numeric"
                                    value={baesongprice}
                                    onChangeText={text=>setBaesongPrice(text)}
                                />
                            </View>
                        </View>
                    ):null}
                    <View style={styles.contbox}>
                       <Text style={styles.contitle}>제품의 상태를 알려주세요.<Text style={styles.seltext}> (선택1)</Text></Text>
                       <View>
                           {data_2?.map((element, key) => (
                               <TouchableOpacity 
                               key={key}
                               onPress={() => setOption3(element.option_name)}
                               style={{flex:1,height:40,backgroundColor: option3&&option3 !== element.option_name ? '#F8F8F8' : '#447DD1' ,paddingLeft:20,justifyContent:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}>
                               <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: option3&&option3 !== element.option_name ? '#222' : '#fff'}}>{element.option_name}</Text>
                           </TouchableOpacity>
                           ))}
                       </View>
                       <View style={{flexDirection:'row',paddingTop:10,width:'100%'}}>
                                <Icon name="md-return-down-forward-sharp" size={20} color="#c9c9c9"/>
                                <View style={{flexDirection:'row', flexWrap:'wrap',justifyContent:'flex-start',marginLeft:10,}}>
                                    {data_3?.map((element, key) => (
                                        <TouchableOpacity 
                                        key={key}
                                        onPress={() => onPressOption3(element.title)}
                                        style={{
                                            backgroundColor: option3_etc&&option3_etc.indexOf(element.title)=== -1 ? '#fff' : '#447DD1' ,
                                            borderColor: '#447DD1',
                                            borderWidth:1,
                                            height:35,
                                            width:StatWidth,
                                            borderRadius:8,
                                            justifyContent:'center',
                                            alignItems:'center',
                                            marginRight:5,
                                            marginBottom:5,
                                            }}>
                                            <Text style={{fontSize:14,fontFamily:'NotoSansKR-Medium',color: option3_etc&&option3_etc.indexOf(element.title)=== -1 ? '#447DD1' : '#fff' ,lineHeight:20,}}>{element.title}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                    </View>
                    <View style={styles.contbox}>
                      <Text style={styles.contitle}>사진 등록<Text style={styles.seltext}> (필수)</Text></Text>
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
                  onPress={()=>{setUseImage(true),setSelectImg('1')}}
                  >                                      
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
                  onPress={()=>{setUseImage(true),setSelectImg('2')}}
                  >                                      
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
                  onPress={()=>{setUseImage(true),setSelectImg('3')}}
                  >                                      
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
                  onPress={()=>{setUseImage(true),setSelectImg('4')}}
                  >                                      
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
                  onPress={()=>{setUseImage(true),setSelectImg('5')}}
                  >                                      
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
                    <View style={styles.contbox}>
                        <Text style={styles.contitle}>상품 정보를 노출하겠습니까?</Text>
                        <View style={{width:120}}>
                            <DefaultPicker placeholder="예" picker={sellPicker} value={exposure?exposure:null}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{flexDirection:'row',height:60,position:'absolute',bottom:0,left:0,right:0,}}>
                <TouchableOpacity 
                    style={{
                        flex:1,
                        backgroundColor:'#EBEBEB',
                        justifyContent:'center',
                        alignItems:'center',
                        borderRightWidth:1,
                        borderRightColor:'#fff',
                    }}
                    onPress={() => navigation.goBack()}
                    >
                    <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium'}}>등록 취소</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        flex:1,
                        backgroundColor:'#EBEBEB',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                    onPress={() => productregi()}
                    >
                    <Text style={{fontSize:16,fontFamily:'NotoSansKR-Medium'}}>상품 수정</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    contbox:{
        paddingBottom:20,
    },
    contitle: {
        fontSize:14,
        fontFamily:'NotoSansKR-Medium',
        lineHeight:20,
        paddingBottom:10,
    },
    inputstyle: {
        fontSize:13,
        borderWidth:1,
        borderColor:'#eee',
        borderRadius:8,
        height:35,
        paddingLeft:10,
        paddingVertical:0,
        marginBottom:5,
        color:'#000'
    },
    graybox: {
        backgroundColor: '#EBEBEB',
        borderRadius: 9,
        padding:10,
    },
    grayboxtext:{
        fontSize:13,
        fontFamily:'NotoSansKR-Medium',
        lineHeight:20,
    },
    seltext:{
        fontSize:12,
        color:'#999',
        fontFamily:'NotoSansKR-Regular',
    }
})

export default ReigsteredProductInfo;