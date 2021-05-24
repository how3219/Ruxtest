import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { useSelector } from 'react-redux';


import Header from '../components/header';
import MainScreen from '../screen/main';
import EstimateScreen from '../screen/estimate';
import ChatScreen from '../screen/chat';
import MypageScreen from '../screen/mypage';
import PrdList from '../screen/PrdList';
import NewPrdList from '../screen/NewPrdList';
import PrdDetail from '../screen/PrdDetail';
import Bidding from '../screen/bidding';
import BidFinish from '../screen/BidFinish';
import EstDetail from '../screen/EstDetail';
import EstCheck from '../screen/EstCheck';
import EstCheck2 from '../screen/EstCheck2';
import PurchaseOrder from '../screen/PurchaseOrder';
import ChatDetail from '../screen/ChatDetail';
import Review, { ReviewWrite, ReviewComplete, ReviewList } from '../screen/review';
import ReviewDetail from '../screen/reviewdetail';
import FavoriteList from '../screen/favoritelist';
import DeliveryCheck from '../screen/deliverycheck';
import Tracking from '../screen/tracking';
import Setting from '../screen/setting';
import Useredit from '../screen/useredit';
import CustomerCenter from '../screen/customercenter';
import NotiSetting from '../screen/Notisetting';
import KeywordSet from '../screen/keywordset';
import Transaction from '../screen/transaction';
import ProductRegistCaution from '../screen/ProductRegistCaution';
import ProductRegistCategory from '../screen/ProductRegistCategory0';
import ProductRegistCategory1 from '../screen/ProductRegistCategory1';
import ProductRegistBrand from '../screen/ProductRegistBrand';
import ProductRegistInfo from '../screen/ProductRegistInfo';
import AppraisalCostGuide from '../screen/AppraisalCostGuide';
import Appraise from '../screen/Appraise';
import AppraiseWrite from '../screen/AppraiseWrite';
import AppraiseWriteComplete from '../screen/AppraiseWriteComplete';
import Login from '../screen/Login';
import RegisterAgree from '../screen/RegisterAgree';
import Register from '../screen/Register';
import RegisterFinish from '../screen/RegisterFinish';
import RegisteredProduct from '../screen/RegisteredProduct';
import ReigsteredProductInfo from '../screen/ReigsteredProductInfo';
import Category from '../screen/category';
import TermsOfService from '../screen/TermsOfService';
import PrivacyPolicy from '../screen/PrivacyPolicy';
import OrderInformation from '../screen/OrderInformation';
import CustomDrawer from '../components/customdrawer';

const Stack = createStackNavigator();

export const MainStack = () => {

  const {isLoggedin} = useSelector(state => state.users)

    return(
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Main"
          >
            <Stack.Screen name="Main" component={MainScreen}/>
            <Stack.Screen name="CustomDrawer" component={CustomDrawer}/>
            <Stack.Screen name="PrdList" component={PrdList}/>
            <Stack.Screen name="NewPrdList" component={NewPrdList}/>
            <Stack.Screen name="PrdDetail" component={PrdDetail}/>
            <Stack.Screen name="Bidding" component={Bidding}/>
            <Stack.Screen name="BidFinish" component={BidFinish}/>
            <Stack.Screen name="PurchaseOrder" component={PurchaseOrder}/>
            <Stack.Screen name="Review" component={Review}/>
            <Stack.Screen name="ReviewWrite" component={ReviewWrite}/>
            <Stack.Screen name="ReviewComplete" component={ReviewComplete}/>
            <Stack.Screen name="ReviewList" component={ReviewList}/>
            <Stack.Screen name="ReviewDetail" component={ReviewDetail}/>
            <Stack.Screen name="head" component={Header}/>
            <Stack.Screen name="ProductRegistCaution" component={ProductRegistCaution}/>
            <Stack.Screen name="ProductRegistCategory" component={ProductRegistCategory}/>
            <Stack.Screen name="ProductRegistCategory1" component={ProductRegistCategory1}/>
            <Stack.Screen name="ProductRegistBrand" component={ProductRegistBrand}/>
            <Stack.Screen name="ProductRegistInfo" component={ProductRegistInfo}/>
            <Stack.Screen name="AppraisalCostGuide" component={AppraisalCostGuide}/>
            <Stack.Screen name="Appraise" component={Appraise}/>
            <Stack.Screen name="AppraiseWrite" component={AppraiseWrite}/>
            <Stack.Screen name="AppraiseWriteComplete" component={AppraiseWriteComplete}/>
            {!isLoggedin &&  <Stack.Screen name="Login" component={Login}/>}
            
            <Stack.Screen name="RegisterAgree" component={RegisterAgree}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="RegisterFinish" component={RegisterFinish}/>
            <Stack.Screen name="Tracking" component={Tracking}/>
            <Stack.Screen name="RegisteredProduct" component={RegisteredProduct}/>
            <Stack.Screen name="ReigsteredProductInfo" component={ReigsteredProductInfo}/>
            <Stack.Screen name="Estimate" component={EstimateScreen}/>
            <Stack.Screen name="EstDetail" component={EstDetail}/>
            <Stack.Screen name="EstCheck" component={EstCheck}/>
            <Stack.Screen name="Chat" component={ChatScreen}/>
            <Stack.Screen name="ChatDetail" component={ChatDetail}/>
            <Stack.Screen name="Mypage" component={MypageScreen}/>
            <Stack.Screen name="FavoriteList" component={FavoriteList}/>
            <Stack.Screen name="DeliveryCheck" component={DeliveryCheck}/>
            <Stack.Screen name="Setting" component={Setting}/>
            <Stack.Screen name="Useredit" component={Useredit}/>
            <Stack.Screen name="CustomerCenter" component={CustomerCenter}/>
            <Stack.Screen name="NotiSetting" component={NotiSetting}/>
            <Stack.Screen name="KeywordSet" component={KeywordSet}/>
            <Stack.Screen name="Transaction" component={Transaction}/>
            <Stack.Screen name="Category" component={Category}/>
            <Stack.Screen name="TermsOfService" component={TermsOfService}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}/>
        </Stack.Navigator>
    );
};

export const EstimateStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{
              headerShown: false,}}
          >
            <Stack.Screen name="Estimate" component={EstimateScreen}/>
            <Stack.Screen name="EstDetail" component={EstDetail}/>
            <Stack.Screen name="EstCheck" component={EstCheck}/>
        </Stack.Navigator>
    );
};

export const ChatStack = () => {
    return(
        <Stack.Navigator
        screenOptions={{
          headerShown: false,// CardStyleInterpolators.forHorizontalIOS
        }}
        >
            <Stack.Screen name="Chat" component={ChatScreen}/>
            <Stack.Screen name="ChatDetail" component={ChatDetail}/>
            <Stack.Screen name="PurchaseOrder" component={PurchaseOrder}/>
            <Stack.Screen name="EstCheck2" component={EstCheck2}/>
        </Stack.Navigator>
    );
};

export const MypageStack = () => {

  const {isLoggedin} = useSelector(state => state.users)

  // navigation.navigate('name', {screen : 'from', params: '', initial : false })
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isLoggedin === false ? <Stack.Screen name="Login" component={Login}/> :
            <Stack.Screen name="Mypage" component={MypageScreen}/>}
            <Stack.Screen name="FavoriteList" component={FavoriteList}/>
            <Stack.Screen name="PrdDetail" component={PrdDetail}/>
            <Stack.Screen name="DeliveryCheck" component={DeliveryCheck}/>
            <Stack.Screen name="Setting" component={Setting}/>
            <Stack.Screen name="Useredit" component={Useredit}/>
            <Stack.Screen name="CustomerCenter" component={CustomerCenter}/>
            <Stack.Screen name="NotiSetting" component={NotiSetting}/>
            <Stack.Screen name="KeywordSet" component={KeywordSet}/>
            <Stack.Screen name="Review" component={Review}/>
            <Stack.Screen name="ReviewWrite" component={ReviewWrite}/>
            <Stack.Screen name="ReviewComplete" component={ReviewComplete}/>
            <Stack.Screen name="ReviewList" component={ReviewList}/>
            <Stack.Screen name="ReviewDetail" component={ReviewDetail}/>
            <Stack.Screen name="Transaction" component={Transaction}/>
            <Stack.Screen name="OrderInformation" component={OrderInformation}/>
            <Stack.Screen name="Appraise" component={Appraise}/>
            <Stack.Screen name="AppraiseWrite" component={AppraiseWrite}/>
            <Stack.Screen name="AppraiseWriteComplete" component={AppraiseWriteComplete}/>
        </Stack.Navigator>
    );
};

export const PrdStack = ({navigation}) => {
    return(
      <Stack.Navigator
        initialRouteName="PrdList"
        screenOptions={{
          headerShown: false,}}
      >
        <Stack.Screen name="PrdList" component={PrdList}/>
        <Stack.Screen name="PrdDetail" component={PrdDetail}/>
        <Stack.Screen name="Bidding" component={Bidding}/>
        <Stack.Screen name="BidFinish" component={BidFinish}/>
        <Stack.Screen name="PurchaseOrder" component={PurchaseOrder}/>
      </Stack.Navigator>
    );
};

export const ReviewStack = () => {
  return(
    <Stack.Navigator
      initialRouteName="Review"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Review" component={Review}/>
      <Stack.Screen name="ReviewWrite" component={ReviewWrite}/>
      <Stack.Screen name="ReviewComplete" component={ReviewComplete}/>
      <Stack.Screen name="ReviewList" component={ReviewList}/>
      <Stack.Screen name="ReviewDetail" component={ReviewDetail}/>
    </Stack.Navigator>
  );
};

const StackNavigation = () => {
  return(
    <View>
      <Text></Text>
    </View>
  );
};

export default StackNavigation;
