import React, {Component} from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';



export default StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex:1,
  },
  header:{
    backgroundColor: 'white',
    width:'100%',
  },
  header01:{
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    borderBottomColor:'#eee',
    borderBottomWidth:1,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:2,
    paddingBottom:2,
  },
  header02:{
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:15,
    paddingRight:15,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  wrapper: {
    height:254,
    marginBottom:15,
    },
  // slide1: {
  //   flex:1,
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   resizeMode:'cover',
  // },
  // slide2: {
  //   flex:1,
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   resizeMode:'cover',
  // },
  slide: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    resizeMode:'cover',
  },
  prdRow : {
    marginRight: 15,
  },
  rv_list: {
    backgroundColor:'#F1F1F1',
    width:180,
    height:247,
    overflow:'hidden',
    borderRadius:9,
    marginBottom:20,
  },
  reviewText: {
    paddingHorizontal:10,
    paddingVertical:5,
    fontFamily:'NotoSansKR-Regular',
    fontSize:13,
  },
  star: {
    marginRight:2,
  },
  footer: {
    backgroundColor: '#F8F8F8',
    paddingVertical:30,
    paddingHorizontal:20,

  },
  footText: {
    fontSize:13,
    color:'#999',
    fontFamily:'NotoSansKR-Regular',
    lineHeight:20,
  },
  bottomTabNav: {
    position:'absolute',
    bottom:0,
    left:0,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    paddingVertical:10,
    shadowOffset:{width:0,height:10},
    shadowColor:'#000',
    shadowOpacity: 1,
    elevation: 30,
    backgroundColor:'#fff',
  },
})
