import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import CategoryList from "./CategoryList";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const onCategoryPressHandler = (category) => {
    if(!explore) {
      router.push(`/businesslist/${category.name}`)
    } else {
      onCategorySelect(category);
    }
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <View>
      {!explore && (
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
            Category
          </Text>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
            View All
          </Text>
        </View>
      )}

      <FlatList
        style={{ marginLeft: 20 }}
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryList
            category={item}
            onCategoryPress={(category) => onCategoryPressHandler(category)}
          />
        )}
      />
    </View>
  );
}
