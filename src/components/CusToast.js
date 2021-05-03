import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StatusBar } from 'react-native';
// import { Toast } from 'native-base';
import Toast from 'react-native-toast-message';
// import { getStatusBarHeight } from 'react-native-status-bar-height';

const cusToast = (message, duration, position, offset) => {
  // Toast.show({ text: message, textStyle: styles.toastTxt, style: styles.toastWr, }); // native-base
  Toast.show({
    type: 'custom_type', //success | error | info
    position: position?position:(Platform.OS === 'ios'?'top':'bottom'),
    text1: message,
    // text2: '내용',
    visibilityTime: duration?duration:1000,
    autoHide: true,
    topOffset: (Platform.OS === 'ios'?66():10),
    bottomOffset: offset?offset+10:10,
    onShow: () => {},
    onHide: () => {}
  });
}

export default cusToast;