import React,{useState} from 'react';
import {View,Text,Image,Dimensions,StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';


export const Width = Dimensions.get('window').width;
export const Slidewidth = Width - 40;
export const Slideheight = Slidewidth * 0.6;

const ReviewSlide = ({item}) => {
    return(
        <Swiper
            showsPagination={false}
            showsButtons={true}
            height={Slideheight}
            width={Slidewidth}
            style={{}}
            containerStyle={{backgroundColor:'#DDDDDD',borderRadius:8,overflow:'hidden'}}
            buttonWrapperStyle={{position:'absolute',top:0,left:0,}}
            >
            <View style={{width:Slidewidth,justifyContent:'center',alignItems:'center',height:Slideheight}}>
                <Image 
                style={item.rt_img1=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img1?{resizeMode:'contain',width:90,height:90}:{resizeMode:'cover',width:Slidewidth,height:Slideheight}}
                source={item.rt_img1=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img1?require('../images/no_img.png'):{uri:item.rt_img1}}/>
            </View>
            <View style={{width:Slidewidth,justifyContent:'center',alignItems:'center',height:Slideheight}}>
                <Image 
                style={item.rt_img1=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img2?{resizeMode:'contain',width:90,height:90}:{resizeMode:'cover',width:Slidewidth,height:Slideheight}}
                source={item.rt_img2=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img2?require('../images/no_img.png'):{uri:item.rt_img2}}/>
            </View>
            <View style={{width:Slidewidth,justifyContent:'center',alignItems:'center',height:Slideheight}}>
                <Image 
                style={item.rt_img1=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img3?{resizeMode:'contain',width:90,height:90}:{resizeMode:'cover',width:Slidewidth,height:Slideheight}}
                source={item.rt_img3=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img3?require('../images/no_img.png'):{uri:item.rt_img3}}/>
            </View>
            <View style={{width:Slidewidth,justifyContent:'center',alignItems:'center',height:Slideheight}}>
                <Image 
                style={item.rt_img1=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img4?{resizeMode:'contain',width:90,height:90}:{resizeMode:'cover',width:Slidewidth,height:Slideheight}}
                source={item.rt_img4=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img4?require('../images/no_img.png'):{uri:item.rt_img4}}/>
            </View>
            <View style={{width:Slidewidth,justifyContent:'center',alignItems:'center',height:Slideheight}}>
                <Image 
                style={item.rt_img1=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img5?{resizeMode:'contain',width:90,height:90}:{resizeMode:'cover',width:Slidewidth,height:Slideheight}}
                source={item.rt_img5=='https://dmonster1566.cafe24.com/images/uploads/'||!item.rt_img5?require('../images/no_img.png'):{uri:item.rt_img5}}/>
            </View>
        </Swiper>
    );
};


export default ReviewSlide;
