import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView
} from "react-native";
import API from "../API/api";

export default function SearchForm() {
    const [search, setSearch] = useState("");
    const [search1, setSearch1] = useState("");
    const [search2, setSearch2] = useState("");
    const [record, setRecord] = useState([]);
    
  
    const searchRecords = () => {
      API
        .get(`/public/location/${search}/${search1}/${search2}`)
        .then((res) => {
          setRecord(res.data);
  
        });
    }
  
    const handleChange = (e) => {
      console.log(e.target.value);
      setSearch(e.target.value);
    }
    const handleChange1 = (e) => {
      console.log(e.target.value);
      setSearch1(e.target.value);
    }
    const handleChange2 = (e) => {
      console.log(e.target.value);
      setSearch2(e.target.value);
    }

  return (
    <ScrollView>
    <Text style= {{fontSize: 30}}>Restaurants</Text>
    <Text style= {{fontSize: 12}}>
    <form>
            <h3>Location</h3>
            <select
                onClick={searchRecords}
                onChange={handleChange}> 
              <option value="N/A">Please choose</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
            </select>
          </form>

          <form>
            <h3>Cuisine offered</h3>
            <select
                onClick={searchRecords}
                onChange={handleChange1}> 
              <option value="N/A">Please choose</option>
              <option value="Western">Western</option>
              <option value="Muslim">Muslim</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Thai">Thai</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
            </select>
          </form>

          <form>
            <h3>Price range</h3>
            <select
                onClick={searchRecords}
                onChange={handleChange2}> 
              <option value="N/A">Please choose</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
              <option value="$$$$$">$$$$$</option>
            </select>
          </form>
        <table className="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>located_at</th>
                <th>Cuisine</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {record.map((location) => (
                <tr key={location.id} >
                <td>{location.name}</td>
                <td>{location.address}</td>
                <td>{location.located_at}</td>
                <td>{location.cuisineId}</td>
                <td>{location.priceId}</td>
                </tr>
            ))}
            </tbody>
        </table> 
    </Text>
  </ScrollView>
  )
};

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
