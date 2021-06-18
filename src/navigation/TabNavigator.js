import * as React from 'react';
import {Image,Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import {
    MainStack,
    ChatStack,
    EstimateStack,
    MypageStack,
} from './StackNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const BottomTabNavigator = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor:'#444',
                inactiveTintColor:'#999',
                labelStyle:{
                    fontSize:13,
                    paddingBottom:5,
                    letterSpacing:-0.5,
                    fontFamily:'NotoSansKR-Medium',
                    lineHeight:15,
                },
                style:{
                    height:65,
                    backgroundColor:'#fff',
                }
            }}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                     let iconName;
                     if (route.name === 'Home') {
                         iconName = focused
                            ? require('../images/menu01_on.png')
                            : require('../images/menu01.png');
                     } else if (route.name === 'Estimate') {
                         iconName = focused
                            ? require('../images/menu02_on.png')
                            : require('../images/menu02.png');
                     } else if (route.name === 'Chat') {
                         iconName = focused
                            ? require('../images/menu03_on.png')
                            : require('../images/menu03.png');
                     } else if (route.name === 'Mypage') {
                         iconName = focused
                            ? require('../images/menu04_on.png')
                            : require('../images/menu04.png');
                     };
                     return(
                         <Image
                             source={iconName}
                             resizeMode="contain"
                             style={{width:30,}}
                         />
                     )
                }
            })
            }>
            <Tab.Screen name="Home" component={MainStack} options={{tabBarLabel:'홈으로'}}/>
            <Tab.Screen name="Estimate" component={EstimateStack} options={{tabBarLabel:'내 견적'}}/>
            <Tab.Screen name="Chat" component={ChatStack} options={{tabBarLabel:'채팅'}}/>
            <Tab.Screen name="Mypage" component={MypageStack} options={{tabBarLabel:'마이페이지'}}/>
        </Tab.Navigator>
    );
};

const TabNavigator = () => {
    return(
        <Stack.TabNavigator screenOptions={{headerShown: false}}>
          
        </Stack.TabNavigator>
    );
};

export default TabNavigator;
