import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, View, Text, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/colors';

const HomeScreen = ({navigation}) => {
    return (
    <SafeAreaView style={styles.container}>
        <StatusBar translucent={false} backgroundColor={'#04555c'} />
        <View style={styles.header}>
            <Icon name="sort" size={28} color={"#FFF"}/>
            <Icon name="account-outline" size={28} color={"#FFF"}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor: COLORS.primary2, height: 100, paddingHorizontal:20,}}>
                <Text style={styles.headerTitle}> Explore Supper Makan Apa?</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    header: {
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary2
    },
    headerTitle: {
        color: '#FFF',
        fontWeight: "bold",
        fontSize: 23,
    }
});

export default HomeScreen;