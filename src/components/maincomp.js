import React, {useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, Dimensions,ActivityIndicator, Alert} from 'react-native';
import axios from "axios";
import API_CALL from '../ApiCall';
import {useSelector,useDispatch} from 'react-redux';
import styles from '../style/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation,useIsFocused } from '@react-navigation/native';


export const Width = Dimensions.get('window').width;
export const Boxwidth = Width / 2 - 30;
export const Boxheight = Boxwidth * 1.4;

const MainComp = () => {
    return(
        <View>
            <Text></Text>
        </View>
    );
};




function NewItem({item}){
    const navigation = useNavigation();
    console.log(item) 
    return(
        <TouchableOpacity 
           style={styles.prdRow} 
           onPress={()=> navigation.navigate('PrdDetail', {idx:item.idx})}>
              <View style={{width:155,height:155,borderColor:'#e3e3e3',borderWidth:1,borderRadius:15,justifyContent:'center',alignItems:'center',marginBottom:10,overflow:'hidden'}}>
                 <Image style={{resizeMode:'cover',width:'100%',height:'100%'}}
                    source = {{uri:item.pt_image1}}
                 />
              </View>
              <View style={{width:155}}>
                  <Text style={{fontSize:17,fontFamily:'NotoSansKR-Bold',lineHeight:25,}} numberOfLines={1} ellipsizeMode='tail'>{item.pt_title}</Text>
                  <Text style={{fontFamily:'NotoSansKR-Medium',fontSize:13,lineHeight:18}}>입찰기간</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                      <Text style={{fontFamily:'NotoSansKR-Regular',fontSize:13,lineHeight:18}}>{item.pt_selling_edate}</Text>
                      <Text style={{justifyContent:'center',alignItems:'center',borderRadius:10,paddingLeft:8,paddingRight:8,backgroundColor:'#477DD1',fontSize:12,color:'#fff',fontFamily:'NotoSansKR-Regular',lineHeight:18,}}>{item.dday}</Text>
                  </View>
              </View>
           </TouchableOpacity>
    );
};


export const NewPrd = () => {
    const isfocused = useIsFocused()
    const [pt_title, setTitle] = useState('')
    const [pt_image1, setImage1] = useState('')
    const [pt_selling_edate, setSelling_edate] = useState('')
    const [dday, setDday] = useState('')
    const [idx, setIdx] = useState('')

    const [newitem, setNewItem] = useState([]);
    const {member} = useSelector(state => state.login)
    useEffect(()=>{
        if(isfocused){
            console.log(101010)
            getNewItem()
        }
    },[member.mb_type,isfocused])

    const getNewItem = async () =>{
      
        const form = new FormData();
        form.append('method', 'proc_main_new_list')
        form.append('pt_title',pt_title)
        form.append('pt_image1',pt_image1)
        form.append('pt_selling_edate',pt_selling_edate)
        form.append('dday',dday)
        form.append('idx',idx)

        const url = 'http://dmonster1566.cafe24.com'
        const path = '/json/proc_json.php'

        const api = await API_CALL(url+path, form, true)

        const { data : { method, result, message, count, item} } = api;
        if(result==='0')return Alert.alert('',message)
        if(result==='1'){
            console.log(item)
            setNewItem(item)
        }

    }
    
    return(
        <FlatList
            data={newitem}
            style={{flex:1,}}
            renderItem={({item, index} ) => <NewItem item={item}/>}
            keyExtractor={(item) => `${item.idx}`}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    );
};


function RvItem({rvItem}){
    const [starlist,setStarList] = useState(new Array(5).fill(0))
    const navigation = useNavigation(); 
    return(
        <TouchableOpacity style={{
            backgroundColor:'#F1F1F1',
            width:Boxwidth,
            height:Boxheight,
            overflow:'hidden',
            borderRadius:9,
            marginBottom:20,
          }}
          onPress={() => navigation.push('ReviewDetail',{idx:rvItem.idx})}
          >
            <View style={{width:Boxwidth,height:143,justifyContent:'center',alignItems:'center'}}>
            <Image
              style={rvItem&&rvItem.rt_img1!=='https://dmonster1566.cafe24.com/images/uploads/'?{width:Boxwidth,height:143,justifyContent:'center',alignItems:'center'}:{width:80,height:80,resizeMode:'contain'}}
              source={rvItem&&rvItem.rt_img1!=='https://dmonster1566.cafe24.com/images/uploads/'?{uri:rvItem.rt_img1}:require('../images/no_img.png')}
            />
            </View>
            <View>
              <Text style={styles.reviewText} numberOfLines={2}>{rvItem.rt_content}</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10,}}>
                <View style={{flexDirection:'row',}}>
                {
                    starlist?.map((value,idx)=>{
                        return(
                            rvItem.rt_score>=idx+1?<Icon name="star" size={23} color="#477DD1" key={idx}/>:<Icon name="star-border" size={23} color="#DDDDDD" key={idx}/>
                        )
                    })
                }
                </View>
                <Text>
                  <Text style={{color:'#444',fontFamily:'NotoSansKR-Regular',fontSize:12,lineHeight:13,}}>{rvItem.rt_score}</Text>
                  <Text style={{color:'#999',fontFamily:'NotoSansKR-Regular',fontSize:12,lineHeight:13,}}>/5</Text>
                </Text>
              </View>
              <Text style={{alignSelf:'flex-end',paddingRight:10,color:'#999',fontFamily:'NotoSansKR-Regular',lineHeight:13,fontSize:12,}}>{rvItem.user}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const MainReview = () => {
    const [reviewlist,setReviewList] = useState([])
    const isfocused = useIsFocused()
    const getReview = async() =>{
        try{
            const form = new FormData();
            form.append('method', 'proc_main_review_list')
            const url = 'http://dmonster1566.cafe24.com'
            const path = '/json/proc_json.php'
            const api = await API_CALL(url+path, form, true)
            const { data : { result, message, item} } = api;
            if(result==='0')Alert.alert('',message)
            else if(result==='1'){
                setReviewList(item)
            }
        }catch(e){
            console.log('getReview',e)
        }
    }
    useEffect(() => {
        if(isfocused)getReview()        
    }, [isfocused])
    return(
        <>
            {reviewlist?.map((rvItem) => (
                <RvItem key={rvItem.idx} rvItem={rvItem}/>
            ))} 
        </>
    );
};


export default MainComp;