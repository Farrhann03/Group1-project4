import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StatusBar, StyleSheet, View, ScrollView, Text, ImageBackground, FlatList, TextInput, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import places from '../consts/places';
import SignUpScreen from '../screens/SignInSignUp/SignUpScreen'
import recommend from "../consts/recommended";
const {width} = Dimensions.get('screen');
import profile from '../assets/profile.png'
import home from '../assets/home.png';
import search from '../assets/search.png';
import notifications from '../assets/bell.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
// Menu
import menu from '../assets/menu.png';
import close from '../assets/close.png';

// Photo
import photo from '../assets/photo.jpg';

const HomeScreen = ({navigation}) => {
    const [currentTab, setCurrentTab] = useState("Home");
    // To get the curretn Status of menu ...
    const [showMenu, setShowMenu] = useState(false);
  
    // Animated Properties...
  
    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
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
                <View style={{backgroundColor: COLORS.white, borderRadius: 10}}>
                <Text 
                    style={{
                        color: COLORS.primary2,
                        fontSize: 20, 
                        fontWeight: 'bold',
                        marginTop: 10,
                    }}>
                    {place.name}
                </Text>
                </View>
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

    return (
    
        <SafeAreaView style={style.container}>

        <View style={{ justifyContent: 'flex-start', padding: 15 }}>
          <Image source={profile} style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            marginTop: 8
          }}></Image>
  
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 20
          }}>Jenna Ezarik</Text>
  
          <TouchableOpacity>
            <Text style={{
              marginTop: 6,
              color: 'white'
            }}>View Profile</Text>
          </TouchableOpacity>
  
          <View style={{ flexGrow: 1, marginTop: 50 }}>
            {
              // Tab Bar Buttons....
            }
  
            {TabButton(currentTab, setCurrentTab, "Home", home)}
            {TabButton(currentTab, setCurrentTab, "Search", search)}
            {TabButton(currentTab, setCurrentTab, "Notifications", notifications)}
            {TabButton(currentTab, setCurrentTab, "Settings", settings)}
  
          </View>
  
          <View>
            {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
          </View>
  
        </View>
  
        {
          // Over lay View...
        }
  
        <Animated.View style={{
          flexGrow: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [
            { scale: scaleValue },
            { translateX: offsetValue }
          ]
        }}>
  
          {
            // Menu Button...
          }
  
          <Animated.View style={{
            transform: [{
              translateY: closeButtonOffset
            }]
          }}>
            <TouchableOpacity onPress={() => {
              // Do Actions Here....
              // Scaling the view...
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true
              })
                .start()
  
              Animated.timing(offsetValue, {
                // YOur Random Value...
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true
              })
                .start()
  
              Animated.timing(closeButtonOffset, {
                // YOur Random Value...
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true
              })
                .start()
  
              setShowMenu(!showMenu);
            }}>
  
              <Image source={showMenu ? close : menu} style={{
                width: 20,
                height: 20,
                tintColor: 'black',
                marginTop: 40,
  
              }}></Image>
  
            </TouchableOpacity>
           
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

            
          </Animated.View>
  
        </Animated.View>
  
      </SafeAreaView>
    );
  }
  
  // For multiple Buttons...
  const TabButton = (currentTab, setCurrentTab, title, image) => {
    return (
  
      <TouchableOpacity onPress={() => {
        if (title == "LogOut") {
          // Do your Stuff...
        } else {
          setCurrentTab(title)
        }
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15
        }}>
  
          <Image source={image} style={{
            width: 25, height: 25,
            tintColor: currentTab == title ? "#D95FAA" : "white"
          }}></Image>
  
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? "#D95FAA" : "white"
          }}>{title}</Text>
  
        </View>
      </TouchableOpacity>
    );
  }

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
        color: "rgba(0,0,0,10)"
    },
    rmCardImage: {
        width: width - 40,
        height: 200,
        marginRight: 20,
        borderRadius: 10, 
        overflow: 'hidden',
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.primary2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
export default HomeScreen