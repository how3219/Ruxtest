import React, {Component, useState} from 'react';
import {View, Image, TouchableOpacity, Dimensions, Alert} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import styles from '../style/style';
import API_CALL from '../ApiCall';
export const Width = Dimensions.get('window').width - 65;

export default class MainSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      MainItems: [],
    };
  }
  componentDidMount = async () => {
    try {
      const form = new FormData();
      form.append('method', 'proc_main_banner');
      const url = 'http://dmonster1566.cafe24.com';
      const path = '/json/proc_json.php';
      const api = await API_CALL(url + path, form, false);
      const {
        data: {result, item},
      } = api;
      if (result === '0') return Alert.alert('','no result Slide');
      if (result === '1') {
        this.setState({MainItems: item});
      }
    } catch (e) {
      
    }
  };
  _renderItem = ({item, index}) => {
    let bn_begin = new Date(item.bn_begin);
    let bn_end = new Date(item.bn_end);
    let current = new Date();
    return (
      bn_begin < current &&
      current < bn_end && (
        <View style={{marginBottom: 15, height: 254}}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Image
              key={index}
              source={{uri: item.mt_img}}
              style={{resizeMode: 'cover', width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
        </View>
      )
    );
  };

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Carousel
          autoplay={false}
          layout={'default'}
          ref={ref => (this.carousel = ref)}
          data={this.state.MainItems}
          renderItem={this._renderItem}
          sliderWidth={Width}
          itemWidth={Width}
        />
      </View>
    );
  }
}
