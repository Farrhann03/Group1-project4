import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import COLORS from "../consts/colors";
import { ModalPicker } from "../consts/ModalPicker";
import { ModalPicker1 } from "../consts/ModalPicker1";
import { ModalPicker2 } from "../consts/ModalPicker2";
import Icon from "react-native-vector-icons/MaterialIcons";
import API from "./Api";

const FilterScreen = ({ navigation }) => {
  const [record, setRecord] = useState([]);
  const [chooseLoc, setchooseLoc] = useState("");
  const [chooseCui, setchooseCui] = useState("");
  const [choosePri, setchoosePri] = useState("");
  const [isLocModalVisible, setisLocModalVisible] = useState(false);
  const [isCuiModalVisible, setisCuiModalVisible] = useState(false);
  const [isPriModalVisible, setisPriModalVisible] = useState(false);

  useEffect(() => {
    API.get(
      `/public/location/${chooseLoc}/${chooseCui}/${choosePri}`
    )
      .then((res) => res.data)
      .then((data) => setRecord(data));
  }, []);

  const changeLocModalVisibility = (bool) => {
    setisLocModalVisible(bool);
  };

  const changeCuiModalVisibility = (bool) => {
    setisCuiModalVisible(bool);
  };
  const changePriModalVisibility = (bool) => {
    setisPriModalVisible(bool);
  };

  const setLocation = (option) => {
    setchooseLoc(option);
  };
  const setCuisine = (option) => {
    setchooseCui(option);
  };
  const setPrice = (option) => {
    setchoosePri(option);
  };

  console.log(record)

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        style={{ flex: 1, backgroundColor: COLORS.dark }}
        source={require("../assets/Brine_001.jpeg")}
        imageStyle={{ opacity: 0.7 }}
      >
        <Icon
          name="arrow-back-ios"
          size={28}
          color={COLORS.dark}
          onPress={() => navigation.navigate("HomeScreen")}
          style={{ paddingLeft: 10, top: -210, left: -170 }}
        />
        
        {/* ****************Location************************************** */}
        <TouchableOpacity
          onPress={() => changeLocModalVisibility(true)}
          style={style.touchableOpacity}
        >
          <Text style={style.text}>location : {chooseLoc}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isLocModalVisible}
          nRequestClose={() => changeLocModalVisibility(false)}
        >
          <ModalPicker
            changeLocModalVisibility={changeLocModalVisibility}
            setLocation={setLocation}
          />
        </Modal>

        {/* ****************Cuisine************************************** */}
        <TouchableOpacity
          onPress={() => changeCuiModalVisibility(true)}
          style={style.touchableOpacity}
        >
          <Text style={style.text}>cuisine type : {chooseCui}</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isCuiModalVisible}
          nRequestClose={() => changeCuiModalVisibility(false)}
        >
          <ModalPicker1
            changeCuiModalVisibility={changeCuiModalVisibility}
            setCuisine={setCuisine}
          />
        </Modal>

        {/* ****************Price************************************** */}
        <TouchableOpacity
          onPress={() => changePriModalVisibility(true)}
          style={style.touchableOpacity}
        >
          <Text style={style.text}>price range : {choosePri}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="fade"
          visible={isPriModalVisible}
          nRequestClose={() => changePriModalVisibility(false)}
        >
          <ModalPicker2
            changePriModalVisibility={changePriModalVisibility}
            setPrice={setPrice}
          />
        </Modal>

        {/* **************** Display the List after Filtering ************************************** */}
        <View>
          <Text style={style.text}>
            Name Address Located_at Cuisine Price
          </Text>
          {record.map((item, index) => {
            return (
              <TouchableOpacity style={style.option} key={index}>
                <Text style={style.text}>
                  {item.name}
                  {item.address}
                  {item.located_at}
                  {item.cuisineId}
                  {item.priceId}
                  
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginVertical: 20,
    fontSize: 19,
    color: COLORS.primary2,
    fontWeight: "bold",
  },
  touchableOpacity: {
    backgroundColor: COLORS.white,
    alignSelf: "stretch",
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 15,
    marginHorizontal: 20,
  },
  arrow: {
    fontSize: 23,
  },
});

export default FilterScreen;
