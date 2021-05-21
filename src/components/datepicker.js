import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {View,Platform} from 'react-native';


const Datepicker = ({show,setShow,date,setDate}) => {

    const onChange = async(event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      return (
        <View>
              {show&&
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange}
                  />
              }
        </View>
      );
}
export default Datepicker