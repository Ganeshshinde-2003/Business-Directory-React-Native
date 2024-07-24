import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function CategoryList({ category, onCategoryPress }) {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onPress={() => onCategoryPress(category)}
    >
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.ICON_BG,
          borderRadius: 99,
          marginRight: 15,
        }}
      >
        <Image
          source={{ uri: category.image }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "outfit-medium",
          marginTop: 5,
          textTransform: 'capitalize'
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
