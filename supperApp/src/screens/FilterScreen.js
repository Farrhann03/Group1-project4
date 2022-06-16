import React, {useState} from 'react'
import {
    StyleSheet, 
    Text, 
    View,
    Modal, 
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
import COLORS from "../consts/colors";
import { ModalPicker } from '../consts/ModalPicker';

const FilterScreen = () => {

    const [chooseData, setchooseData] = useState('Select Location...');
    const [isModalVisible, setisModalVisible] = useState(false);

    const changeModalVisibility = (bool) => {
        setisModalVisible(bool)
    }

    const setData = (option) => {
        setchooseData(option)
    }

    return (
        <SafeAreaView style={style.container}>
            <TouchableOpacity 
                onPress={() => changeModalVisibility(true)}
                style={style.touchableOpacity}>
                <Text style={style.text}>{chooseData}</Text>
            </TouchableOpacity>
            <Modal 
                transparent={true} 
                animationType='fade'
                visible={isModalVisible}
                nRequestClose={() => changeModalVisibility(false)}
                >
                    <ModalPicker
                        changeModalVisibility={changeModalVisibility}
                        setData={setData}
                    />
            </Modal>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    text: {
        marginVertical: 20,
        fontSize: 19,
        color: COLORS.primary2
    },
    touchableOpacity: {
        backgroundColor: COLORS.white,
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        borderRadius: 10,
        margin: 15,
        marginHorizontal: 20
    }
});

export default FilterScreen;