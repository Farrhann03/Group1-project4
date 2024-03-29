import axios from 'axios';
import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, Alert } from "react-native";
import COLORS from '../consts/colors';
import ReviewInput from './SignInSignUp/components/ReviewInput';
import Button from './SignInSignUp/components/Button';
import Loader from './SignInSignUp/components/Loader';
import Icon from "react-native-vector-icons/MaterialIcons";
import API from './Api';
import { UserContext } from './UserContext';

const SubmitReviewScreen = ({navigation, route}) => {

    //const record = route.params;
    const place = route.params;
    const {inputs} = useContext(UserContext);

    const [submitReview, setSubmitReview] = useState({
        location_id: place.id,
        user_id: inputs,
        review: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        if(!submitReview.review) {
            handleError("Please input a review", "review");
            valid = false;
        } else if (inputs === null) {
            handleError("Please sign up as a user before posting a review", "review");
            valid = false;
        } else if (valid) {
            submission();
        }
    }

    const handleOnChange = (text, input, inputs, location) => {
        setSubmitReview((prevState) => ({...prevState, [input]: text}) );
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMessage}));
    };

    const submission = async () => {
        setLoading(true);

        try {
            const requestReviewData = {

                location_id: place.id,
                user_id: inputs,
                review: submitReview.review,
            }
            await API.post("/user/newreview", requestReviewData);
            navigation.navigate("HomeScreen");
        } catch(error) {
            Alert.alert("Error", "Something went wrong")
        }
        setLoading(false);
    };
    // console.log(inputs)
    // console.log(submitReview);

    return (
        <SafeAreaView style={styles.container}>
            <Icon 
                name="arrow-back-ios" 
                size={28}
                color={COLORS.primary2}
                onPress={navigation.goBack} 
                style={{paddingLeft: 10}}
            />
            <Loader visible={loading}/>
            <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
                <Text style={styles.textHeader}>Submit Your Review</Text>
                <View style={{marginVertical: 20}}>
                    <ReviewInput placeholder="Enter a review" iconName="comment-text" label="Review" error={errors.review} onFocus={() => {handleError(null, "review");}} onChangeText={(text) => handleOnChange(text, 'review')}/>
                    <Button title="Submit Review" onPress={validate} />
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
})

export default SubmitReviewScreen;