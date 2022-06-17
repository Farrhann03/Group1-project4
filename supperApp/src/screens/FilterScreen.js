import React, {useState} from 'react'
import {
    StyleSheet, 
    Text, 
    View,
    Modal, 
    TouchableOpacity,
    SafeAreaView,
    ImageBackground
} from 'react-native'
import COLORS from "../consts/colors";
import { ModalPicker } from '../consts/ModalPicker';
import Icon from "react-native-vector-icons/MaterialIcons";

const FilterScreen = ({navigation}) => {

    const [chooseLoc, setchooseLoc] = useState('Location... ');
    const [chooseCui, setchooseCui] = useState('Desired Cuisine... ');
    const [choosePri, setchoosePri] = useState('Price Range... ');
    const [isLocModalVisible, setisLocModalVisible] = useState(false);
    const [isCuiModalVisible, setisCuiModalVisible] = useState(false);

    const changeLocModalVisibility = (bool) => {
        setisLocModalVisible(bool)
    }
    const changeCuiModalVisibility = (bool) => {
        setisLocModalVisible(bool)
    }

    const setLocation = (option) => {
        setchooseLoc(option)
    }
    const setCuisine = (option) => {
        setchooseCui(option)
    }

    return (
        <SafeAreaView style={style.container}>
            <ImageBackground
            style={{flex: 1, backgroundColor: COLORS.dark}}
            source={require('../assets/Brine_001.jpeg')}
            imageStyle={{opacity: 0.7}}>
        <Icon 
        name="arrow-back-ios" 
        size={28} 
        color={COLORS.white} 
        onPress={() => navigation.navigate('HomeScreen')}
        style={{paddingLeft: 10, top: -210, left: -170}}
      />
            <TouchableOpacity 
                onPress={() => changeLocModalVisibility(true)}
                style={style.touchableOpacity}>
                <Text style={style.text}>{chooseLoc}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => changeCuiModalVisibility(true)}
                style={style.touchableOpacity}>
                <Text style={style.text}>{chooseCui}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => changeModalVisibility(true)}
                style={style.touchableOpacity}>
                <Text style={style.text}>{choosePri}</Text>
            </TouchableOpacity>
            <Modal 
                transparent={true} 
                animationType='fade'
                visible={isLocModalVisible}
                nRequestClose={() => changeLocModalVisibility(false)}
                >
                    <ModalPicker
                        changeLocModalVisibility={changeLocModalVisibility}
                        setLocation={setLocation}
                    />
                    
            </Modal>
            <Modal 
                transparent={true} 
                animationType='fade'
                visible={isLocModalVisible}
                nRequestClose={() => changeCuiModalVisibility(false)}
                >
                    <ModalPicker
                        changeLocModalVisibility={changeCuiModalVisibility}
                        setCuisine={setCuisine}
                    />
                    
            </Modal>
            </ImageBackground>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginVertical: 20,
        fontSize: 19,
        color: COLORS.primary2,
        fontWeight: 'bold'
    },
    touchableOpacity: {
        backgroundColor: COLORS.white,
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        borderRadius: 10,
        margin: 15,
        marginHorizontal: 20
    },
    arrow: {
        fontSize: 23,
    }
});

export default FilterScreen;