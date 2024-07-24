import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import PopularBusinessCard from "./PopularBusinessCard";

export default function BusinessList() {
  const [businessList, setBusinessList] = useState([]);

  const getBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  useEffect(() => {
    getBusinessList();
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          paddingLeft: 20,
          marginBottom: 10,
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Business
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>

      <FlatList
        style={{ marginLeft: 20 }}
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <PopularBusinessCard
            business={item}
          />
        )}
      />
    </View>
  );
}
