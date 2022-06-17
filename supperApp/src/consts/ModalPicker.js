import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from './colors';

const LOCATION = ['North', 'South', 'East', 'West', 'Central'];
const CUISINE = ['Chinese', 'Fast Food', 'Indian', 'Korean', 'Japanese'];
const PRICE = ['$', '$$', '$$$', '$$$$', '$$$$$'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPicker = (props) => {

    const onPressItem = (location) => {
        props.changeLocModalVisibility(false);
        props.setLocation(location);
    }
    
    const location = LOCATION.map((item, index) => {
        return (
            <TouchableOpacity 
                style={style.option}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={style.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    const cuisine = CUISINE.map((item, index) => {
        return (
            <TouchableOpacity 
                style={style.option}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={style.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    const price = PRICE.map((item, index) => {
        return (
            <TouchableOpacity 
                style={style.option}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={style.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity 
            onPress={() => props.changeLocModalVisibility(false)}
            style={style.container}
            >

            <View style={[style.modal, {width: WIDTH - 20, height: HEIGHT/2}]}>
                <ScrollView>
                    <View>{location}</View>
                </ScrollView>
            </View>
        </TouchableOpacity>

    )
}


const style = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 10
    }, 
    option: {
        alignItems: 'flex-start'
    },
    text: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary2
    }
})

export {ModalPicker}