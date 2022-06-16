import React, { useState, useEffect } from "react";
import Places from "../consts/places";
import {
  StyleSheet,
  Text,
  ScrollView, // Add this
} from "react-native";




const Restaurants = () => {
  const [place, setPlace] = useState([]);
  //const [rest, setrest] = useState([]);

  useEffect(() => {
    getLocationAll();
    // onPressHandler();
  }, []);

  const getLocationAll = async () => {
    const res = await fetch("https://supper-makan-apa.herokuapp.com/public/location");
    const data = await res.json();
      // console.log(res);
      // console.log(data);
      setPlace(data);
    
  };

  
  // const onPressHandler = async (key) => {
  //   const res1 = await fetch(`https://supper-makan-apa.herokuapp.com/public/location/${key}`);
  //   const data1 = await res1.json();
  //   console.log(res1, data1)
  //   console.log(key)
  //   setrest(data1)
  // }

  // const list = () => {
  //   return data.map((l, id) => {
  //        return (
  //          <View style={{ margin: 10, fontSize: 15, flex:2,  padding:20}} key={id} >
  //           <TouchableOpacity 
  //           key={id}
  //           onPress={onPressHandler}>
  //            <Text>{l.name}</Text>
  //            <Text>{l.address}</Text>
  //            <Text>{l.located_at}</Text>
  //            <Text>{l.cuisineId}</Text>
  //            <Text>{l.priceId}</Text>
  //           </TouchableOpacity>
  //          </View>
  //        );
  //      })
    
  //  }


  return (
    <ScrollView>
    <Text style= {{fontSize: 30}}>Restaurants</Text>
    <Text style= {{fontSize: 12}}>
        <Places places = {place} />
        
            {/* {places.map((l) => {
                return (
                    <Text key={l.id}>
                    key:{l.id},
                    name : {l.name},
                    address: {l.address},
                    located_at: {l.located_at},
                    cuisine: {l.cuisineId},
                    Price range: {l.priceId},
                    </Text>
                );
            })} */}
    </Text>
   </ScrollView>
  )
};

export default Restaurants;


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
   
  // },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperStyle: {
    minHeight: 128,
  },
  buttonStyles: {
    padding: 100,
  },
});
