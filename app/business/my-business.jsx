import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import BusinessListCard from "../../components/Explore/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function MyBusiness() {
  const { user } = useUser();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getUserBusinesses = async () => {
    setLoading(true);
    setBusinesses([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setBusinesses((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
        headerShown: true,
        headerTitle: "My Business",
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
    })
  })

  useEffect(() => {
    user && getUserBusinesses();
  }, [user]);

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
        MyBusiness
      </Text>

      <FlatList
        onRefresh={getUserBusinesses}
        refreshing={loading}
        data={businesses}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
