import React,{useEffect,useState} from 'react';
import {TouchableOpacity, Text,View} from 'react-native';
import API_CALL from '../ApiCall';

export const FtrBrand = ({setBidx,bidx}) => {
    const [brand,setBrand] = useState([])
    useEffect(() => {
        getbrand()
    }, [])
    const getbrand = async() => {
        const form = new FormData();
        form.append('method', 'proc_brand_list');
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        const {
            data: {item, result,message},
        } = api;
        if (result === '0') return Alert.alert('filterItem', message);
        if (result === '1') {
            setBrand(item)
        }
    }
    return(
        <>
        {brand?.map((brandItem) => ( <BrandItem key={brandItem.idx} brandItem={brandItem} setBidx={setBidx} bidx={bidx}/> ))}
        {/* <TouchableOpacity
            style={{
                backgroundColor:'#447DD1',
                borderRadius:8,
                paddingHorizontal:20,
                paddingVertical:10,
                marginRight:5,
                marginBottom:5,
            }}
        >
            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#fff'}}>더보기</Text>
        </TouchableOpacity> */}
        </>
    );
};

function BrandItem({brandItem,bidx,setBidx}){
    return(
        <TouchableOpacity 
            style={{
                borderWidth:1,
                borderColor:brandItem.idx !== bidx? '#eee' : '#447DD1',
                backgroundColor:brandItem.idx !== bidx ? '#fff' : '#447DD1',
                borderRadius:8,
                paddingHorizontal:20,
                paddingVertical:10,
                marginRight:5,
                marginBottom:5,
            }}
            onPress={()=>setBidx(brandItem.idx)}
            >
                <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:18,color: brandItem.idx !== bidx ? '#447DD1' : '#fff'}}>{brandItem.brand_name}</Text>
            </TouchableOpacity>
    );
};

export const FtrCategory = () => {
    const categoryItems=[
        {
            id:1,
            title:'신발'
        },
        {
            id:2,
            title:'스포츠웨어'
        },
        {
            id:3,
            title:'원피스'
        },
        {
            id:4,
            title:'스커트'
        },
        {
            id:5,
            title:'코트'
        },
        {
            id:6,
            title:'패딩'
        },
        {
            id:7,
            title:'스웨터'
        },
    ]
    return(
        <>
        {categoryItems?.map((categoryItem) => ( <CategoryItem key={categoryItem.id} categoryItem={categoryItem}/> ))}
        <TouchableOpacity
            style={{
                backgroundColor:'#447DD1',
                borderRadius:8,
                paddingHorizontal:20,
                paddingVertical:10,
                marginRight:5,
                marginBottom:5,
            }}
        >
            <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:20,color:'#fff'}}>더보기</Text>
        </TouchableOpacity>
        </>
    );
};

function CategoryItem({categoryItem}){
    return(
        <TouchableOpacity 
            style={{
                borderWidth:1,
                borderColor:'#eee',
                borderRadius:8,
                paddingHorizontal:20,
                paddingVertical:10,
                marginRight:5,
                marginBottom:5,
            }}
            >
                <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:18}}>{categoryItem.title}</Text>
            </TouchableOpacity>
    );
};

export const FtrType = ({customSetDealType,pt_deal_type,selectdealtype}) => {
    const typeItems=[
        {
            id:1,
            title:'즉시구매',
            value:'Y'
        },
        {
            id:2,
            title:'직거래',
            value:'직거래'
        },
        {
            id:3,
            title:'택배거래',
            value:'택배거래'
        },
        {
            id:4,
            title:'중개거래',
            value:'중개거래'
        },
    ]
    return(
        <>
        {typeItems?.map((typeItem) => ( <TypeItem key={typeItem.id} typeItem={typeItem} customSetDealType={customSetDealType} pt_deal_type={pt_deal_type} selectdealtype={selectdealtype}/> ))}
        </>
    );
};

function TypeItem({typeItem,pt_deal_type,customSetDealType,selectdealtype}){
    return(
        <TouchableOpacity 
            style={{
                borderWidth:1,
                borderColor:selectdealtype&&selectdealtype.indexOf(typeItem.value) === -1? '#eee' : '#447DD1',
                backgroundColor:selectdealtype&&selectdealtype.indexOf(typeItem.value) === -1? '#fff' : '#447DD1',
                borderRadius:8,
                paddingHorizontal:20,
                paddingVertical:10,
                marginRight:5,
                marginBottom:5,
            }}
            onPress={()=>{customSetDealType(typeItem.value)}}
            >
                <Text style={{fontSize:13,fontFamily:'NotoSansKR-Medium',lineHeight:18,color: selectdealtype&&selectdealtype.indexOf(typeItem.value) === -1 ? '#447DD1' : '#fff',}}>{typeItem.title}</Text>
            </TouchableOpacity>
    );
};

export const FtrPrice = ({setPt_deal_price,pt_deal_price}) => {
    const priceItems=[
        {
            id:1,
            price:'300,000원 미만',
            value:'~ 300000'
        },
        {
            id:2,
            price:'300,000원 이상  500,000원 미만',
            value:'300000 ~ 500000'
        },
        {
            id:3,
            price:'500,000원 이상  1,000,000원 미만',
            value:'500000 ~ 1000000'
        },
        {
            id:4,
            price:'1,000,000원 이상 1,500,000원 미만',
            value:'1000000 ~ 1500000'
        },
        {
            id:5,
            price:'1,500,000원 이상',
            value:'1500000'
        },
    ]
    return(
        <>
        {priceItems?.map((priceItem) => ( <PriceItem key={priceItem.id} priceItem={priceItem} setPt_deal_price={setPt_deal_price} pt_deal_price={pt_deal_price}/> ))}

        </>
    );
};

function PriceItem({priceItem,setPt_deal_price,pt_deal_price}){
    return(
        <TouchableOpacity 
        style={{
            borderWidth:1,
            borderColor:priceItem.value !== pt_deal_price? '#eee' : '#447DD1',
            backgroundColor:priceItem.value !== pt_deal_price ? '#fff' : '#447DD1',
            borderRadius:8,
            marginBottom:5,
            paddingHorizontal:20,
            height:36,
            justifyContent:'center',
        }}
        onPress={()=>setPt_deal_price(priceItem.value)}>
            <Text style={{fontFamily:'NotoSansKR-Medium',fontSize:13,lineHeight:18,color: priceItem.value !== pt_deal_price ? '#447DD1' : '#fff',}}>{priceItem.price}</Text>
        </TouchableOpacity>
    );
};

export const Category2 = ({ct_pid,setFct_id2,fct_id2,setFct_id3_List,setFct_id3,fct_id3}) => {
    const [category2,setCategory2] = useState([])
    useEffect(() => {
        if(ct_pid){
            getcategory2()
        }
    }, [ct_pid])
    const getcategory2 = async() => {
        const form = new FormData();
        form.append('method', 'proc_category_list2');
        form.append('ct_id', ct_pid);
        const url = 'http://dmonster1566.cafe24.com';
        const path = '/json/proc_json.php';
        const api = await API_CALL(url + path, form, true);
        const {
            data: {item, result,message},
        } = api;
        if (result === '0') return Alert.alert('Category2', message);
        if (result === '1') {
            setCategory2(item)
        }
    }
    return(
            category2?.map((item2, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  borderWidth: 1,
                  borderColor:item2.ct_id2 !== fct_id2? '#eee' : '#447DD1',
                  backgroundColor:item2.ct_id2 !== fct_id2 ? '#fff' : '#447DD1',
                  borderRadius: 8,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginRight: 5,
                  marginBottom: 5,
                }}
                onPress={()=>{setFct_id2(fct_id2==item2.ct_id2?'':item2.ct_id2),setFct_id3(''),setFct_id3_List(fct_id2==item2.ct_id2?'':item2.ct3_list)}}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 18,
                    color: item2.ct_id2 !== fct_id2 ? '#447DD1' : '#fff',
                  }}>
                  {item2.ct_name2}
                </Text>
              </TouchableOpacity>
            ))
    )
}

export const Category3 = ({setFct_id3,fct_id3,fct_id3_list}) => {    
    return(
            fct_id3_list&&fct_id3_list?.map((item3, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  borderWidth: 1,
                  borderColor:item3.ct_id3!== fct_id3? '#eee' : '#447DD1',
                  backgroundColor:item3.ct_id3 !== fct_id3 ? '#fff' : '#447DD1',
                  borderRadius: 8,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginRight: 5,
                  marginBottom: 5,
                }}
                onPress={()=>setFct_id3(fct_id3==item3.ct_id3?'':item3.ct_id3)}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'NotoSansKR-Medium',
                    lineHeight: 18,
                    color: item3.ct_id3 !== fct_id3 ? '#447DD1' : '#fff',
                  }}>
                  {item3.ct_name3}
                </Text>
              </TouchableOpacity>
            ))
    )
}