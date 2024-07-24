import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function PopularBusinessCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
    onPress={() => router.push(`/businessdetail/${business.id}`)}
      style={{
        marginRight: 20,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: "auto", height: 130, borderRadius: 15 }}
      />

      <View style={{ marginTop: 7, gap: 5 }}>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "outfit-bold",
            textTransform: "capitalize",
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "outfit-bold",
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
            justifyContent: "space-between",
            alignItems: "center",
        }}
        >
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

          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: Colors.PRIMARY,
              color: "#fff",
              fontSize: 10,
              padding: 3,
              borderRadius: 5,
              textTransform: "capitalize",
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
