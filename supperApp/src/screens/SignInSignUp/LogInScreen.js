import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, Alert, Keyboard } from "react-native";
import COLORS from '../../consts/colors';
import Input from '../SignInSignUp/components/Input';
import Button from '../SignInSignUp/components/Button';
import Loader from '../SignInSignUp/components/Loader';

const LogInScreen = ({navigation}) => {

    //inputs for fields
    const [inputs, setInputs] = React.useState({
        email: "",
        fullname: "",
        password: "",
    });

    //input errors
    const [errors, setErrors] = React.useState({});

    //handle loading 
    const [loading, setLoading] = React.useState(false);

    //To validate key fields
    const validate = () => {

        let valid = true;
        if(!inputs.email) {
            handleError("Please input email", "email");
            valid = false;
        }
        if(!inputs.password) {
            valid = false;
            handleError("Please input password", "password");
        } 

        if (valid) {
            logIn();
        }
    };

    const logIn = () => {
        setLoading(true);
        setTimeout( async () => {
            setLoading(false);
            let userData = await AsyncStorage.getItem("user");
            if(userData) {
                userData = JSON.parse(userData);
                if(inputs.email == userData.email && inputs.password == userData.password){
                    AsyncStorage.setItem("user", JSON.stringify({...userData, loggedIn: true}),
                    );
                    navigation.navigate("HomeScreen");
                } else {
                    Alert.alert("Error", "Invalid input")
                }
            } else {
                Alert.alert("Error", "User does not exist!")
            }
        }, 1500);
    };

    //to handle change in input fields
    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({...prevState, [input]: text}));
    };

    //to handle errors in input fields
    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMessage}));
    };

    return (
    <SafeAreaView style={styles.container}>
        <Loader  visible={loading}/>
        <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20,}}>
            <Text style={styles.textHeader}>Login</Text>
            <Text style={styles.textSubHeader}>Enter Login Details.</Text>
            <View style={{marginVertical: 20}}>
                <Input placeholder="Enter your email address" iconName="email-outline" label="Email" error={errors.email} onFocus={() => { handleError(null, "email");}} onChangeText={(text) => handleOnChange(text, 'email')}/>
                <Input placeholder="Enter your password" iconName="lock-outline" label="Password" error={errors.password} onFocus={() => { handleError(null, "password");}} onChangeText={(text) => handleOnChange(text, 'password')} password />
                <Button  title="Login" onPress={validate} />
                <Text onPress={() => navigation.navigate('SignUpScreen')} style={styles.loginText}>Yet to create an account? Sign Up</Text>
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
    },
    loginText: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default LogInScreen;