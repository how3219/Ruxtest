import React,{useState} from 'react';
import {View,Text,Image,FlatList,TouchableOpacity,Dimensions} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../style/style';

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
const PADDING = 20;
const Box = (Width - PADDING * 2 - 20) /2

function ReviewItem({item: renderItems}) {
    const [starcount,setStarCount] = useState(new Array(5).fill(0));
    const navigation = useNavigation();
    const starsRender = (idx) => {
        return idx<=renderItems.rt_score?<Icon key={idx} name="star" size={20} color="#477DD1"/>:<Icon name="star-border" key={idx} size={20} color="#DDDDDD"/>
    }
    return(
        <TouchableOpacity style={{
            backgroundColor:'#F1F1F1',
            width:Box,
            overflow:'hidden',
            borderRadius:9,
            margin:10,
            paddingBottom:10,
        }}
        onPress={() => navigation.navigate('ReviewDetail',{idx:renderItems.idx})}
        >
            <View style={{width:Box,height:Box,alignItems:'center',justifyContent:'center'}}>
                <Image
                    style={{width:renderItems&&renderItems.rt_img1?Box:75,height:renderItems&&renderItems.rt_img1!=='https://dmonster1566.cafe24.com/images/uploads/'?Box:75,resizeMode:renderItems&&renderItems.rt_img1!=='https://dmonster1566.cafe24.com/images/uploads/'?'cover':'contain',}}
                    source={renderItems&&renderItems.rt_img1!=='https://dmonster1566.cafe24.com/images/uploads/'?{uri:renderItems.rt_img1}:require('../images/no_img.png')}
                />
            </View>
            <Text style={styles.reviewText} numberOfLines={2}>{renderItems.rt_content}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10,}}>
                <View style={{flexDirection:'row',}}>
                    {starcount?.map((row,idx)=>{
                        return starsRender(idx+1)
                    })}
                </View>
                <Text>
                  <Text style={{color:'#444',fontFamily:'NotoSansKR-Regular',fontSize:12,lineHeight:13,}}>{renderItems.rt_score}</Text>
                  <Text style={{color:'#999',fontFamily:'NotoSansKR-Regular',fontSize:12,lineHeight:13,}}>/5</Text>
                </Text>
              </View>
            <Text style={{alignSelf:'flex-end',paddingRight:10,color:'#999',}}>{renderItems.mt_name}</Text>
        </TouchableOpacity>
    );
};

const Rv_List = ({navigation,item}) => {
    return(
        <FlatList
        style={{flex:1,}}
        data={item}
        renderItem={({item, index} ) => <ReviewItem item={item}/>}
        keyExtractor={(item) => `${item.idx}`}
        numColumns={2}
        />

    );
}


export default Rv_List;