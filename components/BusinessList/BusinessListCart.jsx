import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListCart({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/businessdetail/${business.id}`);
      }}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
      />

      <View style={{ flex: 1, gap: 7 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            textTransform: "capitalize",
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 15,
            color: Colors.GRAY,
            textTransform: "capitalize",
          }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/star.png")}
            style={{ width: 15, height: 15 }}
          />
          <Text style={{ fontFamily: "outfit" }}>{business.ratings}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
