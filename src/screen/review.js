import React,{useEffect,useState} from 'react';
import {SafeAreaView, View, Text, Button, ScrollView, Image, TextInput, Dimensions,TouchableOpacity,Alert} from 'react-native';
import API_CALL from '../ApiCall';
import Header, {DetailHead, ReviewHeader} from '../components/header';
import Footer from '../components/footer';
import Product from '../components/product';
import { useSelector } from 'react-redux';
import BotLine from '../components/bottomline';
import Btn, {BtnFull} from '../components/button';
import Rv_List from '../components/ReviewListitem';
import ReviewDetail from '../screen/reviewdetail';
import { launchImageLibrary } from 'react-native-image-picker';
export const Width = Dimensions.get('window').width / 4 - 10

export const ReviewWrite = (props) => {
    const { member } = useSelector(state => state.login);
    const {route:{params},navigation} = props;
    const [item,setItem] = useState([]);
    const [memo,setMemo] = useState('');
    const [score,setScore] = useState(0);
    const [starcount,setStarCount] = useState(new Array(5).fill(0));
    const [imageList,setImageList] = useState([]);
    const getReviewItem = async() => {
        try{
            const form = new FormData;
            form.append('method','proc_review_product');
            form.append('idx',params.pt_idx)
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, false);
            const {
              data:{result,item,message}
            } = api;      
            if (result === '0') return Alert.alert('', message);
            if (result === '1') {
                props.route.params = {...props.route.params,...item[0]}
                setItem(item[0])
            } 
          } catch(e){
            console.log(e)
          }
    }

    useEffect(() => {
        getReviewItem();
    }, [])
    const pickImg = () => {
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
            if(imageList>=5)return;
            else{
               let result = Object.assign([],imageList);
               let image = {name: response.fileName,
                            type: response.type,
                            uri: response.uri}
                result.push(image);
                setImageList(result)
            }
          }
        });
      };
      const onPressreview = async() => {
          try{
                const form = new FormData;
                form.append('method','proc_review')
                form.append('mt_idx',member.mt_idx)
                form.append('mt_seller_idx',params.deal_id)
                form.append('pt_idx',params.pt_idx)
                form.append('rt_content',memo)
                form.append('rt_score',score)
                params.ot_code?form.append('ot_code',params.ot_code):null
                imageList[0]?form.append('rt_img1',imageList[0]):null
                imageList[1]?form.append('rt_img2',imageList[1]):null
                imageList[2]?form.append('rt_img3',imageList[2]):null
                imageList[3]?form.append('rt_img4',imageList[3]):null
                imageList[4]?form.append('rt_img5',imageList[4]):null
                const url = 'http://dmonster1566.cafe24.com';
                const path = '/json/proc_json.php';
                const api = await API_CALL(url + path, form, false);
                const {
                data:{result,item,message}
                } = api;      
                if (result === '0') return Alert.alert('', message);
                if (result === '1') {
                    Alert.alert('', message);
                    if(!params.success){
                        navigation.navigate('ReviewComplete',{pt_image1:params.pt_image1,pt_selling_edate:params.pt_selling_edate,pt_title:params.pt_title,dday:params.dday})
                    }else{
                        navigation.goBack();
                    }
                } 
            }catch(e){
                console.log('onPressreview',e)
            }

      }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <DetailHead title="리뷰 작성"/>
            <ScrollView>
                <View style={{padding:20,}}>
                    <Product {...props}/>
                </View>
                <BotLine/>
                <View style={{padding:20,}}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        borderBottomWidth:1,
                        borderBottomColor:'#eee',
                        paddingBottom:10,
                    }}>
                        <Text style={{fontSize:16,fontWeight:'bold'}}>별점</Text>
                        <Text><Text style={{color:'#477DD1'}}>{score}</Text>/5</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingTop:20,paddingBottom:30,}}>
                        {
                            starcount?.map((row,idx)=>{
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={()=>setScore(idx+1)}>
                                        <Image style={{resizeMode:'cover',marginHorizontal:3,}} source={score>=idx+1?require('../images/review_star.png'):require('../images/review_star_none.png')}/>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View>
                        <Text style={{fontSize:16,fontWeight:'bold'}}>상세한 후기</Text>
                        <TextInput
                          style={{
                              borderWidth:1,
                              borderColor:'#eee',
                              borderRadius:10,
                              textAlignVertical:'top',
                              color:'#000'
                          }}
                          placeholder="구매하신 상품의 후기를 작성해주세요."
                          placeholderTextColor="#C9C9C9"
                          numberOfLines={8}
                          multiline={true}
                          onChangeText={text=>setMemo(text)}
                        />
                        <View style={{flexDirection:'row-reverse'}}>
                            <Text style={{fontSize:13,color:'#c9c9c9'}}>0 / 최소 20자</Text>
                        </View>
                    </View>
                    <View style={{paddingBottom:20,}}>
                        <Text>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>사진을 올려주세요</Text>
                            <Text style={{fontSize:13,color:"#c9c9c9"}}> (선택)</Text>
                        </Text>
                        <View style={{flexDirection:'row',paddingTop:20,flexWrap:'wrap'}}>
                            {
                                imageList.length==0?
                            <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                width:Width,
                                height:Width,
                                borderWidth:1,
                                borderColor:'#C9C9C9',
                                borderRadius:10,
                                borderStyle:'dashed',
                                marginRight:10,
                                }}>
                                <View style={{width:31,height:28,marginBottom:10,}}>
                                    <Image style={{resizeMode:'contain',width:'auto'}} source={require('../images/camera.png')}/>
                                </View>
                                <Text style={{fontSize:10,color:'#B7B7B7'}}>0/5</Text>
                            </View>:
                            imageList?.map((row,idx)=>{
                                console.log(row)
                                return (
                                    <View style={{
                                        justifyContent:'center',
                                        alignItems:'center',
                                        width:Width,
                                        height:Width,
                                        borderWidth:1,
                                        borderColor:'#C9C9C9',
                                        borderRadius:10,
                                        borderStyle:'dashed',
                                        marginRight:10,
                                        }}
                                        key={idx}>
                                        <View>
                                            <Image style={{resizeMode:'cover',width:'auto',width:Width,height:Width,}} source={{uri:row.uri}}/>
                                        </View>
                                        
                                    </View>
                                )
                            })
                            }
                            {
                                imageList.length<5&&
                            <TouchableOpacity style={{
                                justifyContent:'center',
                                alignItems:'center',
                                width:Width,
                                height:Width,
                                borderWidth:1,
                                borderColor:'#C9C9C9',
                                borderRadius:10,
                                borderStyle:'dashed',
                                marginRight:10,
                                }}
                                onPress={()=>pickImg()}>
                                <Image style={{resizeMode:'cover'}}source={require('../images/camera_plus.png')}/>
                            </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        width:'100%',
                        height:57,
                        borderRadius:8,
                        backgroundColor:'#477DD1',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                    onPress={()=>onPressreview()}>
                        <Text style={{color:'#fff',fontSize:16,fontFamily:'NotoSansKR-Bold'}}>리뷰 등록</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const ReviewComplete = (props) => {
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <DetailHead title="리뷰 작성"/>
            <View style={{flex:1,}}>
                <View  style={{justifyContent:'center',alignItems:'center',height:70,backgroundColor:'#F8F8F8'}}>
                    <Text style={{fontSize:13,color:'#444'}}>리뷰 작성이 완료되었습니다.</Text>
                </View>
                <BotLine/>
                <View style={{padding:20,}}>
                  <Product/>
                </View>
                <View style={{paddingHorizontal:20,}}>
                  <BtnFull title="리뷰 목록"/>
                </View>
            </View>
            <Footer/>
        </SafeAreaView>
    );
};

export const ReviewList = ({navigation}) => {
    const [reviewList,setReviewList] = useState([]);
    const [search,setSearch] = useState('');
    useEffect(() => {    
        getReviewList()
    }, [])
    const getReviewList = async() => {
        try{
            const form = new FormData;
            form.append('method','proc_review_list');
            search&&form.append('search',search);
            console.log(form)
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, false);
            const {
              data:{result,item,message}
            } = api;      
            if (result === '0') return Alert.alert('', message);
            if (result === '1') {
                console.log(5252,item)
                setReviewList(item)
            } 
          } catch(e){
            console.log(e)
          }
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <ReviewHeader title="리뷰" getReviewList={getReviewList} search={search} setSearch={setSearch}/>
            <View style={{flex:1,padding:10,paddingBottom:0}}>
                {reviewList.length>0&&<Rv_List item={reviewList}/>}
            </View>
        </SafeAreaView> 
    );
};


const Review = ({navigation}) => {
    return(
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{marginBottom:10,}}>
            <Button title="리뷰 작성" onPress={()=> navigation.navigate('ReviewWrite')}/>
        </View>
        <View style={{marginBottom:10,}}>
            <Button title="리뷰 작성 완료" onPress={()=> navigation.navigate('ReviewComplete')}/>
        </View>
        <View style={{marginBottom:10,}}>
            <Button title="리뷰 목록" onPress={()=> navigation.navigate('ReviewList')}/>
        </View>
        <View style={{marginBottom:10,}}>
            <Button title="리뷰 상세" onPress={()=> navigation.navigate('Rv_Detail')}/>
        </View>
    </SafeAreaView>
    );
}

export default Review;