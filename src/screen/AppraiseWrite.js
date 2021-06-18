import React, {useState,useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity,StyleSheet,TextInput,Modal,Dimensions,Alert} from 'react-native';
import {DetailHead} from '../components/header';
import {DefaultPicker,DefaultCategoryPicker} from '../components/Select';
import Icon from 'react-native-vector-icons/Ionicons';
import Postcode from '@actbase/react-daum-postcode';
import {useSelector} from 'react-redux';
import API_CALL from '../ApiCall';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Boxwidth = Width - 40;
const Boxheight = Height - 100;
const paymentPicker = [
    {label: '신용카드', value:'card'},
    {label: '무통장입금', value:'deposit'},
    {label: '계좌이체', value:'account'},
]

const AppraiseWrite = (props) => {
    const {route:{params},navigation} = props;
    const {member} = useSelector(state => state.login);
    const {category1} = useSelector(state => state.categorys);
    const [defaultcategory1,setDefaultCategory1] = useState(category1.map((val)=>{return {label:val.ct_name,value:val.ct_id}}))
    const [selectcategory1,setSelectCategory1] = useState('')
    const [defaultcategory2,setDefaultCategory2] = useState([])
    const [selectcategory2,setSelectCategory2] = useState('')
    const [defaultcategory3,setDefaultCategory3] = useState([])
    const [selectcategory3,setSelectCategory3] = useState('')
    const [title,setTitle] = useState('')
    const [pakage, setPakage] = useState([]);
    const [usepost,setUsePost] = useState(false);
    const [brandPicker,setBrandPicker] = useState([]);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [brand,setBrand] = useState('');
    const [mt_zip, setZip] = useState('');
    const [mt_add1, setAdd1] = useState('');
    const [option2_etc, setOption2Etc] = useState('');
    const [mt_add2, setAdd2] = useState('');
    const [defaultprice,setDefaultPrice] = useState([])
    const [price,setPrice] = useState('')
    const [selectmonth, setSelectMonth] = useState([]);
    const [selectyear, setSelectYear] = useState([]);
    const [select_month, setMonth] = useState('');
    const [select_year, setYear] = useState('');
    const [selectpakage, setSelectPakage] = useState([]);
    const [option1, setOption1] = useState('')
    const [memo,setMemo] = useState('')
    const [data_1,setData_1] = useState([]);
    const [payment_type,setPayment]=useState('');
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
    const onPresspakage = (el) => {
        let result = Object.assign([], selectpakage);
        selectpakage.length === 0 || selectpakage.indexOf(el.io_id) === -1 ?
          result.push(el.io_id) :
          result = result.filter((val) => {
            return val !== el.io_id
          })          
        setSelectPakage(result)
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
    const getbrand = async() => {
        const form = new FormData();
        form.append('method', 'proc_brand_list');
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        const {
            data: {item, result,message},
        } = api;
        if (result === '0') return Alert.alert('', message);
        if (result === '1') {
            setBrandPicker(
                item?.map(value => {
                    return { label: value.brand_name, value: value.idx };
                }),
            )
        }
    }
    const multipleselect = (option,type) => {
        let result = [];
        if(type=='default'){
            option.indexOf('케이스')!==-1&&result.push('8')
            option.indexOf('택')!==-1&&result.push('10')
            option.indexOf('영수증')!==-1&&result.push('11')
            option.indexOf('기타')!==-1&&result.push('13')
        }else{
            option.indexOf('8')!==-1&&result.push('케이스')
            option.indexOf('10')!==-1&&result.push('택')
            option.indexOf('11')!==-1&&result.push('영수증')
            option.indexOf('13')!==-1&&result.push('기타')
        }
        return result?result.join(','):''
    }
    const onPressappraisal  = async() => {
        try{
            const form = new FormData();
            let money = price;
            if(money.indexOf(',')!==-1){
                money = money.replace(/,/g, '');
            }
            if(params&&params.regi_id){
                form.append('method', 'proc_appraisal_request');
                form.append('mt_sell_idx', member.mt_idx);
                form.append('pidx', params.regi_id);
            }else{
                form.append('method', 'proc_appraisal_request_main');
                form.append('mt_idx', member.mt_idx);
            }
            form.append('mt_name', name);
            form.append('mt_hp', phone);
            form.append('mt_zip', mt_zip);
            form.append('mt_address1', mt_add1);
            form.append('mt_address2', mt_add2);
            form.append('ct_id', selectcategory1);
            form.append('ct_id2', selectcategory2);
            form.append('ct_id3', selectcategory3);
            form.append('bidx', brand);
            form.append('pt_title', title);
            form.append('pt_buy_year', select_year);
            form.append('pt_buy_month', select_month);
            form.append('buy_place',option1);
            form.append('component[]', multipleselect(selectpakage));
            form.append('component_etc', option2_etc);
            form.append('request_price', money);
            form.append('memo', memo);
            form.append('payment_type', payment_type);
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, true);
            const {
                data:{result,item,message},
            } = api;        
            if (result === '0') return Alert.alert('', message);
            if (result === '1') {
                navigation.navigate('AppraiseWriteComplete');
                resetstate();
            }
        }catch(e){
            console.log('감정신청',e)
        }
    }
    const resetstate = (item=null) => {
        if(!item){
            setName('');
            setPhone('');
            setBrand('');
            setZip('');
            setAdd1('');
            setOption2Etc('');
            setAdd2('');
            setPrice('');
            setTitle('');
            setOption1('');
            setSelectPakage([]);
            setMemo('');
            setPayment('');
        }else{
            setName(item.mt_name);
            setBrand(item.bidx);
            setPhone(item.mt_hp);
            setOption2Etc(item.component_etc);            
            setTitle(item.pt_title);
            setOption1(item.buy_place);
            setSelectCategory1(item.ct_pid);
            setSelectPakage(multipleselect(item.component.split(',').filter((val)=>val!=='정품 보증서'),'default'));                    
        }
    }
    const getcategory2 = async() => {
        const form = new FormData();
        form.append('method', 'proc_category_list2');
        form.append('ct_id', selectcategory1);
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        const {
            data: {item, result,message},
        } = api;
        if (result === '0') return Alert.alert('', message);
        if (result === '1') {   
            setDefaultCategory2(item?.map((val)=>{return {label:val.ct_name2,value:val.ct_id2,list:val.ct3_list}}))
        }
    }
    const getdefaultprice = async() => {
        const form = new FormData();
        form.append('method', 'proc_appraisal_price_list');
        form.append('ct_id', selectcategory1);
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        const {
            data: {item, result,message},
        } = api;
        if (result === '0') return Alert.alert('', message);
        if (result === '1') {   
            setDefaultPrice(item)
        }
    }
    const selectPrice = (name) => {        
        let arr = defaultprice.filter((rows,idx)=>rows.ct_id2==selectcategory2)[0]
        let selectbrand = brandPicker.filter((rows,index)=>rows.value==brand)[0];
        let result = '';
        
        if(arr&&arr.brand_list){
            for(let val of arr.brand_list){                
                if(selectbrand.label==val.brand&&name==val.ct_name3){
                    result = val.price
                }                
            }            
            setPrice(result)
        }
    }
    useEffect(() => {      
        defaultsetting();  
        getbrand();
        getselect1();
        getselect2();
        getdefaultprice();
        if(params)getproduct();
    }, [])
    const getproduct = async()=>{
        const form = new FormData();
        form.append('method', 'proc_appraisal_procuct_detail');
        form.append('idx', params.regi_id);
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        const {
            data: {item, result,message},
        } = api;
        if (result === '0') return Alert.alert('', message);
        if (result === '1') {   
            resetstate(item[0])
        }
    }
    useEffect(() => {        
        if(selectcategory1){
            getcategory2();
            setSelectCategory3('');
        }
    }, [selectcategory1])
    useEffect(() => {
        setSelectCategory3('')
    }, [selectcategory2,brand])
    
    
    const handleComplete = data => {
        let zipcode = data.zonecode;
        let fullAddress = data.address;
        let extraAddress = '';
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress +=
              extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
          setZip(zipcode);
          setAdd1(fullAddress);
          setUsePost(false);
      };
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <DetailHead title="감정신청"/>
            <Modal
              transparent={true}
              animationType="fade"
              visible={usepost}
              onRequestClose={() => setUsePost(false)}>
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
                  <Postcode
                    style={{
                      width: Boxwidth,
                      height: Boxheight,
                      marginBottom: 10,
                    }}
                    jsOptions={{animated: true}}
                    // onSelected={data => alert(JSON.stringify(data))}
                    onSelected={handleComplete}
                  />
                </View>
              </View>
            </Modal>
            <ScrollView style={{flex:1,}}>
                <View style={{padding:20,paddingBottom:60,}}>
                    {/* 신청자 정보 */}
                    <View> 
                        <Text 
                        style={{
                            fontSize:15,
                            fontFamily:'NotoSansKR-Bold',
                            lineHeight:20,
                            paddingBottom:20,
                        }}>신청자 정보</Text>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>이름<Text style={styles.contsubtitle}>(필수)</Text></Text>
                            <TextInput
                                style={styles.inputstyle}
                                placeholder="이름을 입력하세요"
                                placeholderTextColor="#C9C9C9"
                                onChangeText={text=>setName(text)}
                                value={name}
                            />
                        </View>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>전화번호<Text style={styles.contsubtitle}>(필수)</Text></Text>
                            <TextInput
                                style={styles.inputstyle}
                                placeholder="전화번호를 입력하세요"
                                placeholderTextColor="#C9C9C9"
                                keyboardType='numeric'
                                onChangeText={text=>setPhone(text)}
                                value={phone}
                            />
                        </View>
                        <View style={styles.contbox}>
                            <Text style={styles.contitle}>주소<Text style={styles.contsubtitle}>(필수)</Text></Text>
                            <View style={{flexDirection:'row',}}>
                                <TextInput
                                    style={[styles.inputstyle, {flex:1}]}
                                    placeholder="주소를 입력하세요"
                                    placeholderTextColor="#C9C9C9"
                                    value={mt_zip}
                                />
                                <TouchableOpacity 
                                style={{
                                    backgroundColor:'#447DD1',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    height:35,
                                    borderRadius:8,
                                    width:80,
                                    marginLeft:5,
                                }}
                                onPress={()=>setUsePost(true)}>
                                    <Text  style={{fontSize:13,fontFamily:'NotoSansKR-Medium',color:'#fff',lineHeight:20,}}>주소검색</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput style={styles.inputstyle} value={mt_add1}/>
                            <TextInput style={styles.inputstyle} onChangeText={text=>setAdd2(text)}/>
                        </View>
                    </View>
                    {/* 상품 정보 */}
                    <View>
                        <Text 
                            style={{
                                fontSize:15,
                                fontFamily:'NotoSansKR-Bold',
                                lineHeight:20,
                                paddingBottom:20,
                            }}>상품 정보</Text>
                            <View style={styles.contbox}>
                              <Text style={styles.contitle}>상품명<Text style={styles.contsubtitle}>(필수)</Text></Text>
                              <TextInput 
                                style={styles.inputstyle}
                                placeholder="상품명을 입력하세요"
                                placeholderTextColor="#C9C9C9"
                                onChangeText={text=>setTitle(text)}
                                value={title}
                              />
                            </View>
                            <View style={styles.contbox}>
                              <Text style={styles.contitle}>브랜드<Text style={styles.contsubtitle}>(필수)</Text></Text>
                              <DefaultPicker 
                                placeholder="브랜드 선택"
                                picker={brandPicker}
                                onChange={setBrand}
                                value={brand?brand:null}
                              />
                            </View>
                            {
                                defaultcategory1?
                                <View style={styles.contbox}>
                                <Text style={styles.contitle}>카테고리1<Text style={styles.contsubtitle}>(필수)</Text></Text>
                                <DefaultPicker 
                                    placeholder="카테고리1 선택"
                                    picker={defaultcategory1}
                                    onChange={setSelectCategory1}
                                    value={selectcategory1?selectcategory1:null}
                                />
                                </View>
                                :null
                            }
                            {
                                defaultcategory2?
                                <View style={styles.contbox}>
                                <Text style={styles.contitle}>카테고리2<Text style={styles.contsubtitle}>(필수)</Text></Text>
                                <DefaultCategoryPicker 
                                    placeholder="카테고리2 선택"
                                    picker={defaultcategory2}
                                    onChange={setSelectCategory2}
                                    setDefaultCategory3={setDefaultCategory3}                                    
                                />
                                </View>:null
                            }
                            <View style={styles.contbox}>
                              <Text style={styles.contitle}>품목<Text style={styles.contsubtitle}>(필수)</Text></Text>
                              <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                  {
                                      defaultcategory3?.map((rows,index)=>{
                                          return(
                                            <TouchableOpacity
                                            key={rows.ct_id3}
                                            style={{
                                                paddingHorizontal:20,
                                                paddingVertical:8,
                                                backgroundColor:selectcategory3 !== rows.ct_id3 ? '#fff' : '#447DD1',
                                                borderWidth:1,
                                                borderColor:'#447DD1',
                                                borderRadius:8,
                                                justifyContent:'center',
                                                alignItems:'center',
                                                marginRight:5,
                                                marginBottom:5,
                                            }}
                                            onPress={()=>{setSelectCategory3(rows.ct_id3),selectPrice(rows.ct_name3)}}
                                            >
                                                <Text style={{
                                                    fontSize:13,
                                                    fontFamily:'NotoSansKR-Medium',
                                                    lineHeight:16,
                                                    color: selectcategory3 !== rows.ct_id3 ? '#447DD1' : '#fff', 
                                                }}>{rows.ct_name3}</Text>
                                            </TouchableOpacity>
                                          )
                                      })
                                  }
                                {/* {itemdata.map((element, key) => (
                                    <TouchableOpacity
                                    key={key}
                                    onPress={() => setItemdata(itemdata.map(data=>{
                                        if(data.id == element.id){
                                            return{...data, state:true}
                                        } else {
                                            return{...data, state:false}
                                        }
                                    }))}
                                    style={{
                                        paddingHorizontal:20,
                                        paddingVertical:8,
                                        backgroundColor:element.state === false ? '#fff' : '#447DD1',
                                        borderWidth:1,
                                        borderColor:'#447DD1',
                                        borderRadius:8,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        marginRight:5,
                                        marginBottom:5,
                                    }}
                                    >
                                        <Text style={{
                                            fontSize:13,
                                            fontFamily:'NotoSansKR-Medium',
                                            lineHeight:16,
                                            color: element.state === false ? '#447DD1' : '#fff', 
                                        }}>{element.title}</Text>
                                    </TouchableOpacity>
                                ))} */}
                              </View>
                            </View>
                            <View style={styles.contbox}>
                                <Text style={styles.contitle}>구매시기를 아시나요?<Text style={styles.contsubtitle}>(필수)</Text></Text>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{width:100,marginRight:10,}}>
                                        <DefaultPicker picker={selectyear} placeholder="연도 선택" onChange={setYear}/>
                                    </View>
                                    <View style={{width:100,}}>
                                        <DefaultPicker picker={selectmonth} placeholder="월 선택" onChange={setMonth}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.contbox}>
                                <Text style={styles.contitle}>어디서 구매하셨나요? <Text style={styles.seltext}> (선택1)</Text></Text>
                                <View>
                                {data_1?.map((element, key) => (
                                    <TouchableOpacity
                                    key={key}
                                    onPress={() => { setOption1(element.option_name) }
                                    }
                                    style={{
                                        flex: 1,
                                        height: 40,
                                        backgroundColor:
                                        element.option_name !== option1 ? '#F8F8F8' : '#447DD1',
                                        paddingLeft: 20,
                                        justifyContent: 'center',
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1,
                                    }}>
                                    <Text
                                        style={{
                                        fontSize: 14,
                                        fontFamily: 'NotoSansKR-Medium',
                                        color: element.option_name !== option1 ? '#222' : '#fff',
                                        }}>
                                        {element.option_name}
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
                                <Text style={styles.contitle}>구성품이 있나요? <Text style={styles.seltext}> (다중 선택 가능)</Text></Text>
                                <View>
                                {
                pakage?.map((element,index)=>{                    
                    return(
                        element.option_name!="정품 보증서"&&
                        <TouchableOpacity
                        key={element.io_id}
                        style={{
                            flex: 1,
                            height: 40,
                            backgroundColor: selectpakage.length===0||selectpakage.indexOf(element.io_id)=== -1 ? '#F8F8F8' : '#447DD1',
                            paddingLeft: 20,
                            justifyContent: 'center',
                        }}
                        onPress={()=>onPresspakage(element)}>
                        <Text
                            style={{
                            fontSize: 14,
                            fontFamily: 'NotoSansKR-Medium',
                            color: selectpakage.length===0||selectpakage.indexOf(element.io_id)=== -1 ? '#222' : '#fff',
                            }}>
                            {element.option_name}
                        </Text>
                        </TouchableOpacity>
                    )
                
                })
              }
              {selectpakage.indexOf('13')!==-1 && (
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
                    value={option2_etc}
                  />
                </View>
              )}
                                </View>
                            </View>
                            <View style={styles.contbox}>
                              <Text style={styles.contitle}>기타문의</Text>
                              <TextInput 
                              style={[styles.inputstyle, {height:'auto',textAlignVertical:'top',paddingVertical:10,}]}
                              placeholder="문의사항을 남겨주세요"
                              placeholderTextColor="#C9C9C9"
                              numberOfLines={10}
                              multiline={true}
                              onChangeText={text=>setMemo(text)}
                              />
                            </View>
                            <View style={styles.contbox}>
                              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={styles.contitle}>감정 신청 비용</Text>
                                <Text style={styles.contsubtitle}>{price?price:'데이터가 없습니다.'}</Text>
                              </View>
                              <DefaultPicker 
                              placeholder="결제 방법 선택"
                              picker={paymentPicker}
                              onChange={setPayment}
                              />
                              <View style={[styles.graybox, {marginTop:10,}]}>
                                <Text style={styles.grayboxtext}>※ 감정 비용이 “가격 상담”일 경우, 전화로 상담 진행합니다.</Text>
                                <Text style={styles.grayboxtext}>※ 신청 완료하시면 결제가 진행됩니다.</Text>
                            </View>
                            </View>
                            <TouchableOpacity 
                            onPress={() => {
                                    onPressappraisal()                                
                                }
                            }
                            style={{
                                backgroundColor:'#447DD1',
                                borderRadius:8,
                                height:58,
                                width:'100%',
                                justifyContent:'center',
                                alignItems:'center',
                            }}>
                                <Text style={{
                                    fontSize:16,
                                    fontFamily:'NotoSansKR-Medium',
                                    color:'#fff'
                                }}>신청완료</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contbox:{
        paddingBottom:20,
    },
    contitle:{
        fontSize:14,
        fontFamily:'NotoSansKR-Medium',
        lineHeight:20,
        paddingBottom:10,
    },
    contsubtitle: {
        fontSize:12,
        fontFamily:'NotoSansKR-Regular',
        lineHeight:16,
        color:'#999',
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
        color:'#222'
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

});

export default AppraiseWrite;