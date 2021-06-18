import React,{useState,useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { DetailHead } from '../components/header';
import Footer from '../components/footer';
import ReviewSlide from '../components/reviewslide';
import API_CALL from '../ApiCall';
import Product from '../components/product';
import BotLine from '../components/bottomline';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Width = Dimensions.get('window').width;

export const Box = Width / 4 - 18;
export const Boxheight = Box * 0.7;

const boxWidth = Dimensions.get('window').width / 4;

const ReviewDetail = (props) => {
    const {navigation,route:{params}} = props;
    const [reviewDetail,setReviewDetail] = useState({});
    const [starcount,setStarCount] = useState(new Array(5).fill(0));
    const getReviewDetail = async() => {
        try{
            const form = new FormData;
            form.append('method','proc_review_detail');
            form.append('idx',params.idx);
            console.log(form)
            const url = 'http://dmonster1566.cafe24.com';
            const path = '/json/proc_json.php';
            const api = await API_CALL(url + path, form, false);
            const {
              data:{result,item,message}
            } = api;      
            if (result === '0') return Alert.alert('reviewlist no result', message);
            if (result === '1') {
                console.log(1010,item)
                setReviewDetail(item[0])
            } 
          } catch(e){
            console.log(e)
          }
    }
    useEffect(() => {
        getReviewDetail()        
    }, [])
    const starsRender = (idx) => {
        return idx<=reviewDetail.rt_score?<Icon key={idx} name="star" size={40} color="#477DD1"/>:<Icon name="star-border" key={idx} size={40} color="#DDDDDD"/>
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#fff',}}>
            <DetailHead title="리뷰 상세"/>
            <ScrollView>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                    style={{
                    borderWidth: 1,
                    borderColor: '#eee',
                    borderRadius: 6,
                    width: boxWidth,
                    height: boxWidth,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 20,
                    }}>
                    {reviewDetail && (
                    <Image
                        source={{uri: reviewDetail.pt_image1}}
                        style={{resizeMode: 'cover', width: '100%', height: '100%'}}
                    />
                    )}
                </View>
                <View>
                    <Text
                    style={{
                        fontSize: 16,
                        lineHeight: 20,
                        fontFamily: 'NotoSansKR-Bold',
                        paddingBottom: 10,
                        width: Width - 180,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {reviewDetail.pt_title}
                    </Text>
                    <Text
                    style={{
                        fontSize: 13,
                        lineHeight: 16,
                        fontFamily: 'NotoSansKR-Medium',
                    }}>
                    구매가
                    </Text>
                    <Text
                        style={{
                        fontSize: 13,
                        lineHeight: 16,
                        color: '#555',
                        paddingRight: 4,
                        fontFamily: 'NotoSansKR-Regular',
                        }}>
                        {`${reviewDetail.pt_selling_price}원`}
                    </Text>
                </View>
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
                    <Text style={{fontSize:16,fontFamily:'NotoSansKR-Bold',lineHeight:20,}}>별점</Text>
                    <Text style={{fontSize:13,fontFamily:'NotoSansKR-Regular',lineHeight:15,color:'#B7B7B7'}}><Text style={{fontFamily:'NotoSansKR-Regular',lineHeight:15,color:'#477DD1'}}>{reviewDetail.rt_score}</Text>/5</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:20,}}>
                    {starcount?.map((row,idx)=>{
                        return starsRender(idx+1)
                    })}
                    </View>
                    <Text style={styles.title}>상세한 후기</Text>
                    <View style={{paddingHorizontal:20,paddingVertical:10,backgroundColor:'#f8f8f8',borderRadius:7,marginBottom:20,}}>
                        <Text style={styles.textbox}>{reviewDetail.rt_content}</Text>
                    </View>
                    <Text style={styles.title}>리뷰 사진</Text>
                    <View style={{justifyContent:'center',alignItems:'center',paddingBottom:80}}>
                        <ReviewSlide item={reviewDetail}/>
                        <View style={{flex:1,paddingVertical:20,}}>
                            <ScrollView style={{}} horizontal={true}>
                                <ReviewItem img={reviewDetail.rt_img2}/>
                                <ReviewItem img={reviewDetail.rt_img3}/>
                                <ReviewItem img={reviewDetail.rt_img4}/>
                                <ReviewItem img={reviewDetail.rt_img5}/>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

function ReviewItem({img}){
    return(
        <TouchableOpacity style={{
            width:Box,
            height:Boxheight,
            borderWidth:1,
            borderColor:'#eee',
            backgroundColor:'#F1F1F1',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:7,
            overflow:'hidden',
            marginRight:10,
            }}>
            <Image 
            source={img=='https://dmonster1566.cafe24.com/images/uploads/'||!img?require('../images/no_img.png'):{uri:img}}
            style={{resizeMode:'cover',width:Box,height:Boxheight}}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    textbox:{
        paddingVertical:7,
        fontSize:14,
        fontFamily:'NotoSansKR-Regular',
    },
    title:{
        fontSize:16,
        fontFamily:'NotoSansKR-Bold',
        lineHeight:20,
        paddingBottom:20,
    }
})

export default ReviewDetail;
