import { View, Text } from "react-native";
import React from "react";

export default function About({ business }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-bold",
        }}
      >
        About
      </Text>
      <Text style={{
        fontFamily: "outfit",
        lineHeight: 20,
      }}>{business.about}</Text>
    </View>
  );
}
