import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native'

const LOCATION = ['North', 'South', 'East', 'West', 'Central'];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPicker = (props) => {

    const onPressItem = (location) => {
        props.changeModalVisibility(false);
        props.setData(location);
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

    return (
        <TouchableOpacity 
            onPress={() => props.changeModalVisibilty(false)}
            style={style.container}
            >

            <View style={[style.modal, {width: WIDTH - 20, height: HEIGHT/2}]}>
                <ScrollView>
                    {location}
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
        fontWeight: 'bold'
    }
})

export {ModalPicker}