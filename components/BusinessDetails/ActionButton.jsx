import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";

const iconMap = {
  call: require("../../assets/images/call.png"),
  pin: require("../../assets/images/pin.png"),
  web: require("../../assets/images/web.png"),
  share: require("../../assets/images/share.png"),
};

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      title: "Call",
      icon: iconMap.call,
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      title: "Location",
      icon: iconMap.pin,
      url:
        "https://www.google.com/maps/search/?api=1&query=" + business?.address,
    },
    {
      id: 3,
      title: "Web",
      icon: iconMap.web,
      url: business?.website,
    },
    {
      id: 4,
      title: "Share",
      icon: iconMap.share,
      url: business?.website,
    },
  ];

  const handleActionButton = (item) => {
    if (item.title === "Share") {
      Share.share({
        message: `Check out this business: ${business.name} at ${business.address}\n${business.website}\nFind more details on Business Directory App by Ganesh Shinde`,
      });
      return;
    }
    Linking.openURL(item.url);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <FlatList
        data={actionButtonMenu}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleActionButton(item)}>
            <View key={index}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={item.icon}
              />
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  textTransform: "capitalize",
                  textAlign: "center",
                  marginTop: 3,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
