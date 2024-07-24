import { View, FlatList, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import BusinessListCart from "../../components/BusinessList/BusinessListCart";
import { Colors } from "@/constants/Colors";

export default function BusinessListCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBusinessList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });

    setLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: category.toUpperCase(),
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
  });

  useEffect(() => {
    getBusinessList();
  }, []);

  return (
    <View>
      {businessList?.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => <BusinessListCart business={item} />}
        />
      ) : loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{
            marginTop: "50%",
          }}
        />
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-medium",
            textAlign: "center",
            color: Colors.GRAY,
            marginTop: "20%",
          }}
        >
          No business found
        </Text>
      )}
    </View>
  );
}
