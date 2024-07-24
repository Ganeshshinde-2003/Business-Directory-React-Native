import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from "@/constants/Colors";
import { useRouter } from 'expo-router';

export default function BusinessListCard({business}) {
    const router = useRouter();
  return (
    <TouchableOpacity
        onPress={() => router.push(`/businessdetail/${business.id}`)}
    style={{
        backgroundColor: "white",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: 15,
    }}>
      <Image source={{uri: business.imageUrl}} style={{
        width: "100%",
        height: 150,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
      }} />

      <View style={{
        padding: 10,
      }}>
        <Text style={{
            fontFamily: "outfit-bold",
            fontSize: 20
        }}>{business?.name}</Text>
        <Text style={{
            fontFamily: "outfit",
            color: Colors.GRAY
        }}>{business?.address}</Text>
      </View>
    </TouchableOpacity>
  )
}