import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "@/constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(0);
  const [userInput, setUserInput] = useState("");
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    ToastAndroid.show("Review submitted successfully !", ToastAndroid.BOTTOM);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
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
          Reviews
        </Text>

        <Rating
          imageSize={20}
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />

        <TextInput
          placeholder="Write your comment..."
          onChangeText={(value) => setUserInput(value)}
          value={userInput}
          numberOfLines={4}
          multiline={true}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: "top",
            marginTop: 10,
          }}
        />
        <TouchableOpacity
          onPress={onSubmit}
          disabled={!userInput}
          style={{
            backgroundColor: userInput ? Colors.PRIMARY : Colors.GRAY,
            padding: 10,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              color: "white",
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
        <View>
          {business?.reviews?.map((item, index) => (
            <View key={index} style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                padding: 10,
                borderWidth: 1,
                borderColor: Colors.GRAY,
                borderRadius: 15,
                marginTop: 10,
            }}>
              <Image
                source={{ uri: item.userImage }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 99,
                }}
              />
              <View style={{
                display: "flex",
                gap: 5,
              }}>
                <Text style={{
                    fontFamily: "outfit-medium",

                }}>{item.userName}</Text>
                <Rating imageSize={20} startingValue={item.rating} style={{alignItems: "flex-start"}} />
                <Text>{item.comment}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
