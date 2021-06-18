import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export const Sch_history = ({searchlist,delsearch,setSearch,keywordSearch}) => {
    return(
        <>
            {searchlist?.map((schItem) => ( <HistoryItem key={schItem.idx} schItem={schItem} delsearch={delsearch} keywordSearch={keywordSearch} setSearch={setSearch}/>))}
        </>
    );
};

function HistoryItem({schItem,delsearch,keywordSearch}){
    return(
        <View style={{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            borderWidth:1,
            borderColor:'#eee',
            borderRadius:7,
            paddingHorizontal:8,
            paddingVertical:5,
            marginRight:5,
            marginBottom:5,
            }}>
            <TouchableOpacity onPress={()=>{keywordSearch(schItem.slt_txt)}}>
                <Text style={{fontFamily:'NotoSansKR-Medium',fontSize:13,lineHeight:20,paddingRight:5,color:'#707070'}}># {schItem.slt_txt}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>delsearch(schItem.idx)}>
                <Icon name="close" size={14} color="#707070"/>
            </TouchableOpacity>
        </View>
    );
}; 


export const Key_alert = ({list,delkeyword}) => {
   
    return(
        <>
            {list?.map((listItem) => ( <AlertItem key={listItem.idx} listItem={listItem} delkeyword={delkeyword}/>))}
        </>
    );
};

function AlertItem({listItem,delkeyword}){
    return(
        <View style={{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#F8F8F8',
            borderRadius:7,
            paddingHorizontal:8,
            paddingVertical:5,
            marginRight:5,
            marginBottom:5,
            }}>
            <TouchableOpacity>
                <Text style={{fontFamily:'NotoSansKR-Medium',fontSize:13,lineHeight:20,paddingRight:5,color:'#707070'}}># {listItem.slt_keyword}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>delkeyword(listItem.idx)}>
                <Icon name="close" size={14} color="#707070"/>
            </TouchableOpacity>
        </View>
    );
}; 