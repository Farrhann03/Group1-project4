import { AsyncStorageStatic } from "react-native";
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import COLORS from '../../consts/colors';
import Input from '../SignInSignUp/components/Input';
import Button from '../SignInSignUp/components/Button';

const SignUpScreen = ({navigation}) => {
    return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20,}}>
            <Text style={styles.textHeader}>Sign Up</Text>
            <Text style={styles.textSubHeader}>Enter Details to Sign Up.</Text>
            <View style={{marginVertical: 20}}>
                <Input placeholder="Enter your email address" iconName="email-outline" label="Email"/>
                <Input placeholder="Enter your password" iconName="lock-outline" label="Password" password/>
                <Button />
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    textHeader: {
        color: COLORS.black,
        fontSize: 40,
        fontWeight: 'bold',
    },
    textSubHeader: {
        color: COLORS.grey,
        fontSize: 18,
        marginVertical: 10,
    }
});

export default SignUpScreen;