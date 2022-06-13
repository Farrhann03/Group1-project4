import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, Alert } from "react-native";
import COLORS from '../../consts/colors';
import Input from '../SignInSignUp/components/Input';
import Button from '../SignInSignUp/components/Button';
import Loader from '../SignInSignUp/components/Loader';

const SignUpScreen = ({navigation}) => {

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
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError("Please input valid email", "email");
            valid = false;
        }
        if(!inputs.fullname) {
            handleError("Please input name", "fullname");
            valid = false;
        }
        if(!inputs.password) {
            handleError("Please input password", "password");
            valid = false;
        } else if (inputs.password.length < 5) {
            handleError("Minimum password length of 5", "password");
            valid = false;
        }

        if (valid) {
            signUp();
        }
    };

    const signUp = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            try {
                AsyncStorage.setItem("user", JSON.stringify(inputs))
                navigation.navigate("LogInScreen");
            } catch (error){
                Alert.alert("Error", "Something went wrong")
            }
        }, 1500);
    }

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
            <Text style={styles.textHeader}>Sign Up</Text>
            <Text style={styles.textSubHeader}>Enter Details to Sign Up.</Text>
            <View style={{marginVertical: 20}}>
                <Input placeholder="Enter your email address" iconName="email-outline" label="Email" error={errors.email} onFocus={() => { handleError(null, "email");}} onChangeText={(text) => handleOnChange(text, 'email')}/>
                <Input placeholder="Enter your name" iconName="account-outline" label="Fullname" error={errors.fullname} onFocus={() => { handleError(null, "fullname");}} onChangeText={(text) => handleOnChange(text, 'fullname')}/>
                <Input placeholder="Enter your password" iconName="lock-outline" label="Password" error={errors.password} onFocus={() => { handleError(null, "password");}} onChangeText={(text) => handleOnChange(text, 'password')} password />
                <Button  title="Sign Up" onPress={validate} />
                <Text onPress={() => navigation.navigate('LogInScreen')} style={styles.loginText}>Already have an account? Login</Text>
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

export default SignUpScreen;


