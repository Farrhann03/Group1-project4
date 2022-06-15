import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, Alert, Keyboard } from "react-native";
import COLORS from '../../consts/colors';
import Input from '../SignInSignUp/components/Input';
import Button from '../SignInSignUp/components/Button';
import Loader from '../SignInSignUp/components/Loader';
import axios from 'axios';

const LogInScreen = ({navigation}) => {

    //inputs for fields
    const [inputs, setInputs] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    //input errors
    const [errors, setErrors] = React.useState({});

    //handle loading 
    const [loading, setLoading] = React.useState(false);

    //To validate key fields
    const validate = () => {

        let valid = true;
        if(!inputs.username) {
            handleError("Please input username", "username");
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

    // Local storage login testing
    // const logIn = () => {
    //     setLoading(true);
    //     setTimeout( async () => {
    //         setLoading(false);
    //         let userData = await AsyncStorage.getItem("user");
    //         if(userData) {
    //             userData = JSON.parse(userData);
    //             if(inputs.email == userData.email && inputs.password == userData.password){
    //                 AsyncStorage.setItem("user", JSON.stringify({...userData, loggedIn: true}),
    //                 );
    //                 navigation.navigate("HomeScreen");
    //             } else {
    //                 Alert.alert("Error", "Invalid input")
    //             }
    //         } else {
    //             Alert.alert("Error", "User does not exist!")
    //         }
    //     }, 1500);
    // };

    //Original logIn
    const logIn = () => {
        setLoading(true);
        setTimeout( async () => {
            setLoading(false);
            try {
            let userData = await axios.post("user","https://supper-makan-apa.herokuapp.com/login/signin");
            if(userData) {
                userData = JSON.parse(userData);
                if(inputs.username == userData.username && inputs.password == userData.password){
                    axios.post("user","https://supper-makan-apa.herokuapp.com/login/signin", JSON.stringify({...userData, loggedIn: true}),
                    );
                    navigation.navigate("HomeScreen");
                } else {
                    Alert.alert("Error", "Invalid input")
                }
            }  } catch {
                Alert.alert("Error", "User does not exist!")
            }
        }, 1500);
    };

    //logIn fix attempt
    // const logIn = () => {
    //     setLoading(true);
    //     setTimeout( async () => {
    //         setLoading(false);
    //         try {
    //         let userData = await axios.get(`https://supper-makan-apa.herokuapp.com/login/user/${userId}`, {
    //             username: inputs.username,
    //             password: inputs.password,
    //         });
    //         if(userData) {
    //             userData = JSON.parse(userData);
    //             if(inputs.username == userData.username && inputs.password == userData.password){
    //                 axios.post("https://supper-makan-apa.herokuapp.com/login/signin", JSON.stringify({...userData, loggedIn: true}),
    //                 );
    //                 navigation.navigate("HomeScreen");
    //             } else {
    //                 Alert.alert("Error", "Invalid input")
    //             }
    //         }  } catch {
    //             Alert.alert("Error", "User does not exist!")
    //         }
    //     }, 1500);
    // };


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
                <Input placeholder="Enter your username" iconName="account-outline" label="Username" error={errors.username} onFocus={() => { handleError(null, "username");}} onChangeText={(text) => handleOnChange(text, 'username')}/>
                <Input placeholder="Enter your password" iconName="lock-outline" label="Password" error={errors.password} onFocus={() => { handleError(null, "password");}} onChangeText={(text) => handleOnChange(text, 'password')} password />
                <Button  title="Login" onPress={validate} />
                <Text>
                    <Text style={styles.loginsubText}>Yet to create an account?</Text>
                    <Text onPress={() => navigation.navigate('SignUpScreen')} style={styles.loginText}>Sign Up</Text>
                </Text>
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
        fontSize: 14,
        fontWeight: "bold",
    },
    loginsubText: {
        color: COLORS.black,
        fontSize: 12,
    }
});

export default LogInScreen;