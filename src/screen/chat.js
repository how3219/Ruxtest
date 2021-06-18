 import React from 'react';
import {View,Text,SafeAreaView,Image,TouchableOpacity} from 'react-native';

import styles from '../style/style';
import ChatList from '../components/ChatList';

const ChatScreen = ({navigation}) => {
    return(
    <SafeAreaView style={{flex:1,backgroundColor: '#fff',}}>
          <ChatList/>
    </SafeAreaView>
    )
}

export default ChatScreen
