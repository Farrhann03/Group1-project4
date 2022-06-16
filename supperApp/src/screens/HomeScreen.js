import axios from "axios";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView, Text, ImageBackground, FlatList, TextInput, Dimensions, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import places from '../consts/places';
import recommend from "../consts/recommended";
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width} = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {
    const categoryIcons = [
        <Icon name="fastfood" size={25} color={COLORS.primary2} />,
        <Icon name="local-offer" size={25} color={COLORS.primary2} />,
        <Icon name="help" size={25} color={COLORS.primary2} />,
        <Icon name="favorite" size={25} color={COLORS.primary2} />,
    ];
    const ListCategories = () => {
        return <View style={style.categoryContainer}>
            {categoryIcons.map((icon, index) => (
                <View key={index} style={style.iconContainer}>
                    {icon}
                </View >
            ))}
        </View>
    }

    //for account log drawer status and logout
    const [inputs, setInputs] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const [showMenu, setShowMenu] = React.useState(false);
    //Animated properties
    const offsetValue = React.useRef(new Animated.Value(0)).current;
    const scaleValue = React.useRef(new Animated.Value(1)).current;
    const closeButtonOffset = React.useRef(new Animated.Value(0)).current;

const Card = ({place}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("DetailsScreen", place)}>
        <ImageBackground
            style={style.cardImage}
            source={place.image}
            imageStyle={{opacity: 0.7}}>
                <Text 
                    style={{
                        color: COLORS.white, 
                        fontSize: 20, 
                        fontWeight: 'bold',
                        marginTop: 10,
                    }}>
                    {place.name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                                <Icon name='star' size={20} color={COLORS.white} />
                                <Text style={{marginLeft: 5, color:COLORS.white}}>
                                    {place.rating}
                                </Text>
                            </View>
                <View 
                    style={{
                        flex: 1, 
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name='place' size={20} color={COLORS.white} />
                                <Text style={{marginRight: 20, color:COLORS.white}}>
                                    {place.location}
                                </Text>
                            </View>
                        </View>
        </ImageBackground>
        </TouchableOpacity>
    )
 }

 const RecommendedCard = ({recommend}) => {
     return (
        <ImageBackground 
            style={style.rmCardImage} 
            source={recommend.image}
            imageStyle={{opacity: 0.7}}>
            <Text 
                style={{
                    color: COLORS.white, 
                    fontSize: 22, 
                    fontWeight: 'bold',
                    marginTop: 10,
                    }}>
                {recommend.name}
            </Text>
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    }}>
                <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name='place' size={22} color={COLORS.white} />
                    <Text style={{color: COLORS.white, marginLeft: 5}}>
                        {recommend.location}
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name='star' size={22} color={COLORS.white} />
                    <Text style={{color: COLORS.white, marginLeft: 5}}>{recommend.rating}</Text>
                </View>
                </View> 
                <Text style={{color: COLORS.white, fontSize: 13}}>
                    {recommend.details}
                </Text>                      
            </View>
        </ImageBackground>
     )
 }
//For Login status and account login/signup
//  const [userDetails, setUserDetails] = React.useState();
//  React.useEffect (() => {
//     getUserDetails();
//  }, []);
//  const getUserDetails = async () => {
//     const requestData = {
//         username: inputs.username,
//         email: inputs.email,
//         password: inputs.password
//     }
//     const userData = await axios.post("https://supper-makan-apa.herokuapp.com/login/signin", requestData);
//     if (userData) {
//         setUserDetails(JSON.parse(userData));
//     }
//  };

//  const logOut = () => {
//     const requestData = {
//         username: inputs.username,
//         email: inputs.email,
//         password: inputs.password
//     }
//     axios.post("https://supper-makan-apa.herokuapp.com/login/signup", 
//     requestData,
//     JSON.stringify({...userDetails, loggedIn: false}),);
//     navigation.navigate("LogInScreen");
//  }

//Mock up user status and logout
const [userDetails, setUserDetails] = React.useState();
React.useEffect(() => {
    getUserDetails();
}, []);
const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
        setUserDetails(JSON.parse(userData));
    }
};
const logOut = () => {
    AsyncStorage.setItem(
        'user',
        JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate("LogInScreen");
};

    return  <SafeAreaView style={{flex:1, backgroundColor: COLORS.primary2}}>
                <StatusBar translucent={false} backgroundColor={COLORS.white}/>
            <View style={style.accountContainer}>
                <View>
                    <Text style={{fontSize: 12, paddingTop: 10, paddingLeft: 15,color: COLORS.white}}>Welcome,</Text>
                    <Text style={style.accountContainerText}>{userDetails?.username}</Text>
                </View>
                <View>
                    <TouchableOpacity style={{flexDirection: "row", marginTop: 50}} onPress={logOut}>
                        <Icon style={{marginLeft: 10, marginTop: 9.8}}name="logout" size={28} color={COLORS.white}/>
                        <Text style={style.accountContainerText}>Log out</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        
    <Animated.View  style={{
        flexGrow: 1,
        backgroundColor: COLORS.white,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: showMenu ? 15 : 0,
        transform: [
            {scale: scaleValue},
            {translateX: offsetValue}
        ]
    }}>

    <View style={style.header}>
        <TouchableOpacity style={{marginTop: 20, marginLeft: 5 }} activeOpacity={0.8} onPress={()=>{
            Animated.timing(scaleValue,{ 
            toValue: showMenu ? 1 : 0.93,
            duration:300,
            useNativeDriver: true})
                .start()

            Animated.timing(offsetValue,{ 
            toValue: showMenu ? 0 : 130,
            duration:300,
            useNativeDriver: true})
                    .start()

            setShowMenu(!showMenu);
        }}>
                
    
            <Icon name="person" size={28} color={COLORS.white}/>
        </TouchableOpacity>
        <Icon style={{marginTop: 20, marginRight: 5 }} name="filter-alt" size={28} color={COLORS.white} />
    </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View 
                style={{
                    backgroundColor:COLORS.primary2, 
                    height: 120, 
                    paddingHorizontal: 20
                }}>
                <View style={{flex: 1}}>
                    <Text style={style.headerTitle}>Fulfil your</Text>
                    <Text style={style.headerTitle}>midnight cravings</Text>
                    <View style={style.inputContainer}>
                    <Icon name='search' size={28} />
                    <TextInput 
                        placeholder="Search Restaurants"
                        style={{color: COLORS.grey}}
                        />
                    </View>
                </View>
            </View>
        <ListCategories />
            <Text style={style.sectionTitle}>Restaurants</Text>
            <View>
                <FlatList 
                    contentContainerStyle={{paddingLeft: 20}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={places} 
                    renderItem={({item}) => <Card place={item} />} 
                />
                <Text style={style.sectionTitle}>Recommended</Text>
                <FlatList 
                    snapToInterval={width - 20}
                    contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={recommend} 
                    renderItem={({item}) => <RecommendedCard recommend={item}/>} />
            </View>
            </ScrollView>
        </Animated.View>
    </SafeAreaView>;

};

const style = StyleSheet.create({
    header:{
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary2,
    },
    headerTitle: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 23,
    },
    accountContainer: {
        flex: 1,
        backgroundColor: COLORS.primary2,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    accountContainerText: {
        fontSize: 15,
        fontWeight: "bold",
        paddingTop: 15,
        paddingLeft: 15,
        color: COLORS.white,
    },
    inputContainer:{
        height: 60,
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        position: 'absolute',
        top: 90,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 12,
    },
    categoryContainer: {
        marginTop: 60,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContainer: {
        height: 60,
        width: 60, 
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    cardImage: {
        height: 220,
        width: width / 2,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: COLORS.dark
    },
    rmCardImage: {
        width: width - 40,
        height: 200,
        marginRight: 20,
        borderRadius: 10, 
        overflow: 'hidden',
        padding: 10,
        backgroundColor: COLORS.dark
    }
});
export default HomeScreen