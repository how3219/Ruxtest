import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import styles from '../style/style';
import {DefaultPicker, DealType2, ReviewSelect} from './Select';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Search from './search';
// import PrdFilter from './filter';
import {FtrBrand, FtrCategory, FtrType, FtrPrice} from './filterItem';
import {useSelector,useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import API_CALL from '../ApiCall';
 
const prdPicker= [
  {label:'인기상품순' , value:'인기상품순'},
]

const reviewPicker= [
  {label:'제품명' , value:'pt_title'},
]

const estPicker= [
  {label:'직거래' , value:'직거래'},
  {label:'택배거래' , value:'택배거래'},
  {label:'안전거래' , value:'안전거래'},
]

const Height = Dimensions.get('window').height - 70;



const Header = () => {
  const navigation = useNavigation(); 

  const dispatch = useDispatch();

  const {member} = useSelector(state => state.login)
  const [mb_type,setMb_type] = useState('B')
  console.log(member)
  // useEffect(()=>{
   
  // },[])
  const setMemType = async (mb_type) => {
    // console.log("m", member)
    console.log(mb_type)
    const form = new FormData
    form.append('method','proc_seller_change')
    form.append('mt_idx',member.mt_idx)
    form.append('mb_type',mb_type)
    const url = 'http://dmonster1566.cafe24.com'
    const params = '/json/proc_json.php'
    try{

      const api = await API_CALL(url+params, form, false)
      console.log(api)
      const { data } = api;
      const { item, result,message } = data;
      if(result === '0') return Alert.alert("제목",message)
      if(result === '1') {
        console.log("item", item[0])
        const changeData = Object.assign({}, item[0]);
        const memberConvert = Object.assign( member, changeData)

        console.log(memberConvert)
        dispatch({
          type:'LOGIN',
          payload: memberConvert
        })

        const saveType = {mathod: 'proc_seller_change', mt_idx: member.mt_idx , mb_type }
        await AsyncStorage.setItem('saveType', JSON.stringify(saveType))
        // const saveLogin = {mb_type}
        // await AsyncStorage.setItem('saveLogin',JSON.stringify(saveLogin))
        setMb_type(mb_type)
        // Alert.alert("제목","전환 성공")
      }
    }
    catch(e){
      console.log("change Error" ,e)
      Alert.alert("","전환 실패 에러")
    }
  
  }

  return(

    <View style={styles.header}>
        <DefaultHead/>
        <View style={styles.header02}>
            <TouchableOpacity 
            accessibilityRole="button"
            onPress={() => navigation.openDrawer()}
            style={{flexDirection:'row',alignItems:'center'}}>
                    <Image
                    style={{width:40,height:40,resizeMode:'contain',}}
                    source={require('../images/img_cate.png')}
                    />
                <Text style={{fontSize:17,paddingLeft:8,fontFamily:'NotoSansKR-Bold'}}>상품 카테고리</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row',backgroundColor:'#DEDEDE',borderRadius:8,width:120,height:40,justifyContent:'space-between',alignItems:'center'}}>
                <TouchableOpacity
                onPress ={ () => setMemType('B')}
                style={{backgroundColor:  member.mb_type === 'B' ? '#477DD1' : '#DEDEDE',width:60,height:40,borderRadius:8,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:  member.mb_type === 'B' ? '#fff' : '#999' ,fontFamily:'NotoSansKR-Medium',}}>구매자</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress ={ () => setMemType('S')}
                style={{backgroundColor:  member.mb_type === 'S' ? '#477DD1' : '#DEDEDE',width:60,height:40,borderRadius:8,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color:  member.mb_type === 'S' ? '#fff' : '#999' ,fontFamily:'NotoSansKR-Medium',}}>판매자</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export const DetailHead = ({title}) => {
  const navigation = useNavigation();
  return(
    <View style={{flexDirection:'row',justifyContent: 'center', alignItems:'center',backgroundColor: '#fff',height:62,borderBottomWidth:1,borderBottomColor: '#eee',}}>
      <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold',}}>{title}</Text>
      <TouchableOpacity
        style={{position:'absolute',left:15,}}
        onPress={() => navigation.goBack()}>
        <Image source={require('../images/head_arr.png')}/>
      </TouchableOpacity>
    </View>
  );
};

export const EstHeader = ({title,setSearch,search,getEstData,setPt_deal_type}) => {
  const {member} = useSelector(state => state.login)

  const dispatch = useDispatch();

  const [mb_type,setMb_type] = useState(member.mb_type)

  // useEffect(() => {
  //   setType()
  // },[])


  const setMemType = async (mb_type) => {
    // console.log("m", member)
    const form = new FormData
    form.append('method','proc_seller_change')
    form.append('mt_idx',member.mt_idx)
    form.append('mb_type',mb_type)
    const url = 'http://dmonster1566.cafe24.com'
    const params = '/json/proc_json.php'
    try{

      const api = await API_CALL(url+params, form, false)
      console.log(api)
      const { data } = api;
      const { item, result,message } = data;
      if(result === '0') return Alert.alert("제목",message)
      if(result === '1') {
        console.log("item", item[0])

        const changeData = Object.assign({}, item[0]);

        // console.log('a',changeData)
        // console.log('ba',changeData)


        const memberConvert = Object.assign( member, changeData)

      
        console.log(memberConvert)
        dispatch({
          type:'LOGIN',
          payload: memberConvert
        })

        const saveType = {mathod: 'proc_seller_change', mt_idx: member.mt_idx , mb_type }
        await AsyncStorage.setItem('saveType', JSON.stringify(saveType))
        // const saveLogin = {mb_type}
        // await AsyncStorage.setItem('saveLogin',JSON.stringify(saveLogin))
        setMb_type(mb_type)
        // Alert.alert("제목","전환 성공")
      }
    }
    catch(e){
      console.log("change Error" ,e)
      Alert.alert("","전환 실패 에러")
    }
  
  }


  return(
    <View style={styles.header , {paddingBottom:10,}}>
        <DefaultHead/>
        <View style={{alignItems: 'center',justifyContent: 'center',height:50,}}>
          <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold',}}>{title}</Text>
        </View>
        <View style={{
                paddingBottom:5,
                paddingLeft:15,
                paddingRight:15,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
              <View style={{flex:1,marginRight:5,}}>
                <DefaultPicker placeholder="거래방식 선택" picker={estPicker} onChange={setPt_deal_type}/>
              </View>
            <View style={{flexDirection:'row',backgroundColor:'#DEDEDE',borderRadius:8,width:120,height:35,justifyContent:'space-between',alignItems:'center'}}>
                <TouchableOpacity
                onPress ={ () => setMemType('B')}
                style={{backgroundColor: member.mb_type === 'B' ? '#477DD1' : '#DEDEDE',width:60,height:35,borderRadius:8,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color: member.mb_type === 'B' ? '#fff' : '#999' ,fontFamily:'NotoSansKR-Medium',lineHeight:20}}>구매자</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress ={ () => setMemType('S')}
                style={{backgroundColor:  member.mb_type === 'S' ? '#477DD1' : '#DEDEDE',width:60,height:35,borderRadius:8,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color: member.mb_type === 'S' ? '#fff' : '#999' ,fontFamily:'NotoSansKR-Medium',lineHeight:20}}>판매자</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{marginHorizontal: 15,borderWidth:1,borderColor:'#eee',borderRadius:8,height:35,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal: 10}}>
          <TextInput
            style={{height:35,paddingVertical: 0,justifyContent:'center',flex:1,fontSize:13,color:'#000'}}
            placeholder="제품명을 입력해주세요."
            placeholderTextColor="#C9C9C9"
            value={search}
            onChangeText={text=>setSearch(text)}
          />
          <TouchableOpacity onPress={()=>getEstData()}>
            <Icon name="search" size={20} color="#477DD1"/>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export const ChatHeader = ({title,setSearch,search,getChatList})=> {

  const {member} = useSelector(state => state.login)

  const dispatch = useDispatch();

  const [mb_type,setMb_type] = useState(member.mb_type)

  // useEffect(() => {
  //   setType()
  // },[])


  const setMemType = async (mb_type) => {
    // console.log("m", member)
    console.log(mb_type)
    const form = new FormData
    form.append('method','proc_seller_change')
    form.append('mt_idx',member.mt_idx)
    form.append('mb_type',mb_type)
    const url = 'http://dmonster1566.cafe24.com'
    const params = '/json/proc_json.php'
    try{

      const api = await API_CALL(url+params, form, false)
      const { data } = api;
      const { item, result,message } = data;
      if(result === '0') return Alert.alert("제목",message)
      if(result === '1') {
        console.log("item", item[0])

        const changeData = Object.assign({}, item[0]);

        // console.log('a',changeData)
        // console.log('ba',changeData)


        const memberConvert = Object.assign( member, changeData)

      
        console.log(memberConvert)
        dispatch({
          type:'LOGIN',
          payload: memberConvert
        })

        const saveType = {mathod: 'proc_seller_change', mt_idx: member.mt_idx , mb_type }
        await AsyncStorage.setItem('saveType', JSON.stringify(saveType))
        // const saveLogin = {mb_type}
        // await AsyncStorage.setItem('saveLogin',JSON.stringify(saveLogin))
        setMb_type(mb_type)
        // Alert.alert("제목","전환 성공")
      }
    }
    catch(e){
      console.log("change Error" ,e)
      Alert.alert("","전환 실패 에러")
    }
  
  }

  return(
    <View style={styles.header, {paddingBottom:10,}}>
        <DefaultHead/>
        <View style={{alignItems: 'center',justifyContent: 'center',height:50,}}>
          <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>{title}</Text>
        </View>
        <View style={{
                paddingBottom:5,
                paddingLeft:15,
                paddingRight:15,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
            <View style={{flex:1,marginRight:5,borderWidth:1,borderColor:'#eee',borderRadius:8,height:35,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal: 10}}>
              <TextInput
                style={{height:35,paddingVertical: 0,justifyContent:'center',flex:1,fontSize:13,color:'#000'}}
                placeholder="제품명을 입력해주세요."
                placeholderTextColor="#C9C9C9"
                onChangeText={text=>setSearch(text)}
                value={search}
              />
              <TouchableOpacity onPress={()=>getChatList()}>
                <Icon name="search" size={20} color="#477DD1"/>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',backgroundColor:'#DEDEDE',borderRadius:8,width:120,height:35,justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity
                onPress ={ () => setMemType('B')}
                style={{backgroundColor: member.mb_type === 'B' ? '#477DD1' : '#DEDEDE',width:60,height:35,borderRadius:8,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color: member.mb_type === 'B' ? '#fff' : '#999' ,fontFamily:'NotoSansKR-Medium',lineHeight:20}}>구매자</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress ={ () => setMemType('S')}
                style={{backgroundColor: member.mb_type === 'S' ? '#477DD1' : '#DEDEDE',width:60,height:35,borderRadius:8,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{color: member.mb_type === 'S' ? '#fff' : '#999' ,fontFamily:'NotoSansKR-Medium',lineHeight:20}}>판매자</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

export const ChatDetailHeader = ({title,deal_id}) => {
  const navigation = useNavigation();
  return(
    <View>
      <View style={{flexDirection:'row',justifyContent: 'center', alignItems:'center',backgroundColor: '#fff',height:62,borderBottomWidth:1,borderBottomColor: '#eee',}}>
        <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>{title}</Text>
        <TouchableOpacity
          style={{position:'absolute',left:15,}}
          onPress={() => navigation.goBack()}>
          <Image source={require('../images/head_arr.png')}/>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',}}>
        <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent: 'space-between',alignItems:'center',height:48,backgroundColor: '#EBEBEB',paddingHorizontal:20,borderRightWidth:1,borderRightColor:'#fff'}} onPress={()=>navigation.push('ProfileScreen',deal_id)}>
          <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold'}}>프로필 정보</Text>
          <Icon name="chevron-forward" size={20} color="#333"/>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent: 'space-between',alignItems:'center',height:48,backgroundColor: '#EBEBEB',paddingHorizontal:20,}} onPress={()=>navigation.push('ScamPrevention')}>
          <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold'}}>사기 방지 가이드</Text>
          <Icon name="chevron-forward" size={20} color="#333"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const MypageHeader = () => {
  return(
    <View style={styles.header}>
        <DefaultHead/>
    </View>
  );
};

export const ReviewHeader = ({title,setSearch,search,getReviewList}) => {


  const {member} = useSelector(state => state.login)

  const dispatch = useDispatch();

  const [mb_type,setMb_type] = useState(member.mb_type)

  // useEffect(() => {
  //   setType()
  // },[])


  const setMemType = async (mb_type) => {
    // console.log("m", member)
    console.log(mb_type)
    const form = new FormData
    form.append('method','proc_seller_change')
    form.append('mt_idx',member.mt_idx)
    form.append('mb_type',mb_type)
    const url = 'http://dmonster1566.cafe24.com'
    const params = '/json/proc_json.php'
    try{

      const api = await API_CALL(url+params, form, false)
      console.log(api)
      const { data } = api;
      const { item, result,message } = data;
      if(result === '0') return Alert.alert("제목",message)
      if(result === '1') {
        console.log("item", item[0])

        const changeData = Object.assign({}, item[0]);

        // console.log('a',changeData)
        // console.log('ba',changeData)


        const memberConvert = Object.assign( member, changeData)

      
        console.log(memberConvert)
        dispatch({
          type:'LOGIN',
          payload: memberConvert
        })

        const saveType = {mathod: 'proc_seller_change', mt_idx: member.mt_idx , mb_type }
        await AsyncStorage.setItem('saveType', JSON.stringify(saveType))
        // const saveLogin = {mb_type}
        // await AsyncStorage.setItem('saveLogin',JSON.stringify(saveLogin))
        setMb_type(mb_type)
        // Alert.alert("제목","전환 성공")
      }
    }
    catch(e){
      console.log("change Error" ,e)
      Alert.alert("","전환 실패 에러")
    }
  
  }


  return(
    <View style={styles.header, {zIndex:999}}>
        <DefaultHead/>
        <View style={{alignItems: 'center',justifyContent: 'center',height:50,}}>
          <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>{title}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,}}>
          <TouchableOpacity
          onPress ={ () => setMemType('B')}
          style={{
            backgroundColor: member.mb_type === 'B' ? '#477DD1' : '#fff',
            flex:1,
            height:35,
            borderRadius:8,
            justifyContent:'center',
            alignItems:'center',
            borderWidth:1,
            borderColor:'#477DD1',
            marginRight:5,
            }}>
              <Text style={{color: member.mb_type === 'B' ? '#fff' : '#477DD1' ,fontFamily:'NotoSansKR-Medium',fontSize:14,lineHeight:20,}}>구매자</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress ={ () => setMemType('S')}
          style={{
            backgroundColor: member.mb_type === 'S' ? '#477DD1' : '#fff',
            flex:1,
            height:35,
            borderRadius:8,
            justifyContent:'center',
            alignItems:'center',
            borderWidth:1,
            borderColor:'#477DD1',
            }}>
              <Text style={{color: member.mb_type === 'S' ? '#fff' : '#477DD1' ,fontFamily:'NotoSansKR-Medium',fontSize:14,lineHeight:20,}}>판매자</Text>
          </TouchableOpacity>
      </View>
      <View style={{width:'100%',height:45,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20}}>
        <View style={{flex:1,marginRight:5,}}>
          <DefaultPicker picker={reviewPicker} placeholder="제품명"/>
        </View>
        <View style={{flex:2,borderWidth:1,borderColor:'#eee',borderRadius:8,height:35,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal: 10}}>
              <TextInput
                style={{height:35,paddingVertical: 0,justifyContent:'center',flex:1,fontSize:13,color:'#000'}}
                placeholder="제품명을 입력해주세요."
                placeholderTextColor="#C9C9C9"
                value={search}
                onChangeText={text=>setSearch(text)}
              />
              <TouchableOpacity onPress={()=>getReviewList()}>
                <Icon name="search" size={20} color="#477DD1"/>
              </TouchableOpacity>
            </View>
      </View>
    </View>
  );
};

export const FavoriteHeader = ({title,search,setSearch,getZzimlist}) => {
  return(
    <View style={styles.header}>
      <DefaultHead/>
        <View style={{flexDirection:'row',justifyContent: 'center', alignItems:'center',backgroundColor: '#fff',height:62}}>
          <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>{title}</Text>
        </View>
        <View style={{
          paddingHorizontal:20,paddingBottom:10,
        }}>
          <View style={{width:'100%',borderWidth:1,borderColor:'#eee',borderRadius:8,height:35,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal: 10}}>
            <TextInput
              style={{height:35,paddingVertical: 0,justifyContent:'center',flex:1,fontFamily:'NotoSansKR-Regular',fontSize:13,color:'#000'}}
              placeholder="제품명을 입력해주세요."
              placeholderTextColor="#C9C9C9"
              value={search}
              onChangeText={text=>setSearch(text)}
            />
              <TouchableOpacity onPress={()=>{getZzimlist()}}>
              <Icon name="search" size={20} color="#477DD1"/>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};
const Appraisepicker=[{label:'제품명',value:'pt_title'},{label:'브랜드명',value:'brand'}]
export function AppraiseHeader({title,search,setSearch,getappraiallist,setType}){
  const navigation = useNavigation();
  return(
    <SafeAreaView>
      <DefaultHead/>
       <View style={{flexDirection:'row',justifyContent: 'center', alignItems:'center',backgroundColor: '#fff',height:62}}>
          <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>{title}</Text>
          <TouchableOpacity 
          style={{
            position:'absolute',
            top:14,
            right:20,
            backgroundColor:'#447DD1',
            width:98,
            height:35,
            borderRadius:8,
            justifyContent:'center',
            alignItems:'center'
            }}
            onPress={()=>navigation.push('AppraiseWrite')}
            >
            <Text style={{
              fontSize:14,
              fontFamily:'NotoSansKR-Medium',
              lineHeight:20,
              color:'#fff'
            }}>신청서 작성</Text>
          </TouchableOpacity>
        </View>
        <View 
        style={{
          flexDirection:'row',
          paddingHorizontal:20,
          paddingBottom:10,
          width:'100%',
          alignItems:'center',
        }}>
          <View style={{flex:4,marginRight:5}}>
             <DefaultPicker placeholder="제품명" picker={Appraisepicker} onChange={setType}/>
          </View>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            borderWidth:1,
            borderColor:'#eee',
            borderRadius:8,
            height:35,
            flex:6,
            }}>
            <TextInput
            placeholder="제품명을 입력해주세요."
            placeholderTextColor="#C9C9C9"
            style={{height:35,padding:0,paddingLeft:10,width:'80%',color:'#000'}}
            value={search}
            onChangeText={(text)=>setSearch(text)}
            />
            <TouchableOpacity style={{width:30,}} onPress={()=>getappraiallist()}>
              <Icon name="search" size={24} color="#447DD1"/>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
};

export const RPHeader = ({title,setSearch,getEnrollment,setSearchType}) => {
  return(
    <View style={styles.header, {zIndex:999}}>
        <DefaultHead/>
        <View style={{alignItems: 'center',justifyContent: 'center',height:50,}}>
          <Text style={{fontSize:18,fontFamily:'NotoSansKR-Bold'}}>{title}</Text>
        </View>
      <View style={{width:'100%',height:45,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20}}>
        <View style={{flex:1,marginRight:5,}}>
          <DefaultPicker picker={reviewPicker} placeholder="제품명" onChange={setSearchType}/>
        </View>
        <View style={{flex:2,borderWidth:1,borderColor:'#eee',borderRadius:8,height:35,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal: 10}}>
              <TextInput
                style={{height:35,paddingVertical: 0,justifyContent:'center',flex:1,fontSize:13,color:'#000'}}
                placeholder="제품명을 입력해주세요."
                placeholderTextColor="#C9C9C9"
                onChangeText={text=>setSearch(text)}
              />
              <TouchableOpacity
              onPress={()=>getEnrollment()}>
                <Icon name="search" size={20} color="#477DD1"/>
              </TouchableOpacity>
            </View>
      </View>
    </View>
  );
};

export const DefaultHead = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return(
    <>
    <View style={styles.header01}>
        <View>
            <Image
            style={{width:120,height:60,resizeMode:'contain',}}
            source={require('../images/logo01.png')}
            />
        </View>
        <View style={{width:70,height:50,justifyContent:'space-between',flexDirection:'row',paddingTop:10,}}>
            <TouchableOpacity 
            style={{width:30,height:30}}
            onPress={() => setModalOpen(true)}
            >
                <Image
                style={{width:30,height:30,resizeMode:'contain'}}
                source={require('../images/img_hd01.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{width:30,height:30}}>
                <Image
                style={{width:30,height:30,resizeMode:'contain'}}
                source={require('../images/img_hd02.png')}
                />
            </TouchableOpacity>
        </View>
    </View>
    <Modal visible={modalOpen} animationType="slide" onRequestClose={()=>setModalOpen(false)}>
      <TouchableOpacity 
        style={{width:24,height:24,justifyContent:'center',alignItems:'center',alignSelf:'flex-end',marginRight:20,marginTop:20,}}
        onPress={() => setModalOpen(false)}
        >
            <Icon name="close" size={24} color="#AAAAAA"/>
      </TouchableOpacity>
      <Search ModalOpenClose={setModalOpen}/>
    </Modal>
    </>
  );
};



export default Header;
