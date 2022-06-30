import React from "react";
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert} from 'react-native'
import COLORS from "../consts/colors";
import SelectList from "react-native-dropdown-select-list";
import Icon from "react-native-vector-icons/MaterialIcons";

const FilterScreen = ({navigation}) => {

    const [selected, setSelected] = React.useState("");

    const showMessage = () => {
        Alert.alert('onPress Called...')
      }

    const data = [
        {key: '1' , value: 'North'},
        {key: '2' , value: 'South'},
        {key: '3' , value: 'East'},
        {key: '4' , value: 'West'},
        {key: '5' , value: 'Central'},
    ];

    const price = [
        {key: '1' , value: 'Any 💲 & above'},
        {key: '2' , value: '2 💲 & above'},
        {key: '3' , value: '3 💲 & above'},
        {key: '4' , value: '4 💲 & above'},
        {key: '5' , value: '5 💲'},
    ];

    const rating = [
        {key: '1' , value: 'Any ⭐ & above'},
        {key: '2' , value: '2 ⭐ & above'},
        {key: '3' , value: '3 ⭐ & above'},
        {key: '4' , value: '4 ⭐ & above'},
        {key: '5' , value: '5 ⭐'},
    ];



    return (
        <ImageBackground source={require('../assets/wall.jpeg')} resizeMode='cover' style={style.image}>
            <Icon 
                name="arrow-back-ios" 
                size={28}
                style={style.back}
                onPress={navigation.goBack}
                />
             <View style={style.FilterScreen}>
            <SelectList 
                boxStyles={{backgroundColor: COLORS.white, margin: 15}} 
                inputStyles={{fontSize: 16, color: COLORS.primary2, fontWeight: 'bold'}}
                dropdownStyles={{backgroundColor: COLORS.white}}
                dropdownItemStyles={{marginHorizontal: 10}}
                dropdownTextStyles={{color: COLORS.primary2, fontSize: 13}}
                data={data} 
                setSelected={setSelected} />

            <SelectList 
                boxStyles={{backgroundColor: COLORS.white, margin: 15}} 
                inputStyles={{fontSize: 16, color: COLORS.primary2, fontWeight: 'bold'}}
                dropdownStyles={{backgroundColor: COLORS.white}}
                dropdownItemStyles={{marginHorizontal: 10}}
                dropdownTextStyles={{color: COLORS.primary2, fontSize: 13}}
                data={price} 
                setSelected={setSelected} />

            <SelectList 
                boxStyles={{backgroundColor: COLORS.white, margin: 15}} 
                inputStyles={{fontSize: 16, color: COLORS.primary2, fontWeight: 'bold'}}
                dropdownStyles={{backgroundColor: COLORS.white}}
                dropdownItemStyles={{marginHorizontal: 10}}
                dropdownTextStyles={{color: COLORS.primary2, fontSize: 13}}
                data={rating} 
                setSelected={setSelected} />

            <TouchableOpacity style={style.button}>
                <Text 
                    style={style.buttonText}
                    onPress={showMessage}
                    >Submit</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    FilterScreen: {
        paddingHorizontal: 30,
        paddingVertical: 140,
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: COLORS.primary2,
        borderRadius: 5,
        width: 90,
        height: 30,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 22,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    back: {
        color: COLORS.primary2,
        marginTop: 50,
        marginLeft: 13
    }
});

export default FilterScreen