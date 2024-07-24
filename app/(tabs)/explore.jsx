import { Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Category from "@/components/HomeScreen/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function Explore() {
  const [businesslist, setBusinessList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBusinessList, setFilteredBusinessList] = useState([]);

  useEffect(() => {
    const fetchAllBusinesses = async () => {
      const q = query(collection(db, "BusinessList"));
      const querySnapshot = await getDocs(q);
      const businesses = [];
      querySnapshot.forEach((doc) => {
        businesses.push({ id: doc.id, ...doc.data() });
      });
      setBusinessList(businesses);
      setFilteredBusinessList(businesses);
    };

    fetchAllBusinesses();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredBusinessList(businesslist);
    } else if (search === "All") {
      setFilteredBusinessList(businesslist);
    } else {
      const filtered = businesslist.filter((business) =>
        business.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBusinessList(filtered);
    }
  }, [search, businesslist]);

  const getBusinessByCategory = async (category) => {
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(businesses);
    setFilteredBusinessList(businesses);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Explore More
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <Feather name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "outfit", fontSize: 16, width: "100%" }}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategory(category.name)}
      />

      <ExploreBusinessList businesslist={filteredBusinessList} />
    </View>
  );
}
