import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView, Text, ImageBackground, FlatList, TextInput, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import places from '../consts/places';
import SignUpScreen from '../screens/SignInSignUp/SignUpScreen'
import recommend from "../consts/recommended";
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

    const LogIN =({SignUpScreen}) =>{
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("SignUpScreen", SignUpScreen)}>
            <Icon name="person" size={28} color={COLORS.white}/>
        </TouchableOpacity>
        )
    }

const Card = ({place}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("DetailsScreen", place)}>
        <ImageBackground
            style={style.cardImage}
            source={place.image}>
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
            source={recommend.image}>
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

    return <SafeAreaView style={{flex:1, backgroundColor: COLORS.white}}>
        <StatusBar translucent={false} backgroundColor={COLORS.white}/>
        <View style={style.header}>
            <LogIN />
            <Icon name="filter-alt" size={28} color={COLORS.white} />
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
    },
    rmCardImage: {
        width: width - 40,
        height: 200,
        marginRight: 20,
        borderRadius: 10, 
        overflow: 'hidden',
        padding: 10
    }
});
export default HomeScreen