import React, { useEffect } from 'react';
import {View, Text, StatusBar,Dimensions,Alert,Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector, Provider} from 'react-redux';

import DrawerNavigator from './src/navigation/DrawerNavigator';
import {navigationRef} from './src/navigation/RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons'
import Toast, {BaseToast} from 'react-native-toast-message';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
const Width = Dimensions.get('window').width;
const ToastWidth = Width - 40;

const toastConfig = {
  error: ({text1,props,...rest}) => (
    <BaseToast 
      {...rest}
      style={{
        borderLeftColor: '#fff',
        padding:0,
        elevation:10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight:'400'
      }}
      text1={text1}
      text2={props.uuid}
    />
  ),
  my_custom_type: ({ text1, props, ...rest }) => (
      <View style={{
        width:ToastWidth,
        borderRadius:10,
        paddingVertical:20, 
        backgroundColor: '#fff',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
        elevation:10,
         }}>
        <Icon name="alert-circle" size={24} color="#ff0000"/>
        <Text style={{fontFamily:'NotoSansKR-Medium',marginLeft:10,}}>{text1}</Text>
      </View>
  ),

  'custom_type': (internalState) => (
    <View style={{ width: '90%', backgroundColor: '#000000e0', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 17 }}>
      <Text style={{textAlign: 'center', color: '#fff', fontSize: 11.5}}>{internalState.text1}</Text>
    </View>
    )
}
messaging().onMessage(async remoteMessage => {
  if(Platform.OS!=='ios')return Alert.alert('', JSON.stringify(remoteMessage.data.message));
  else if(Platform.OS==='ios'){return Alert.alert('',JSON.stringify(remoteMessage.notification.title))}
});

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();  
    }, 1000);
  }, [])

  return (
    <Provider store={store}>
      <StatusBar hidden={false} />
      <NavigationContainer ref={navigationRef}>
        <DrawerNavigator />
      </NavigationContainer>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
};

export default App;
