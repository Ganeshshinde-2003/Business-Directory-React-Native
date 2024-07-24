import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { storage } from "../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();
  const rounter = useRouter();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useUser();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
    }
  };

  const onAddBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const response = await fetch(image);
    const blob = await response.blob();

    const imageRef = ref(storage, `BusinessList/${fileName}`);

    uploadBytes(imageRef, blob)
      .then((snapshot) => {})
      .then((response) => {
        getDownloadURL(imageRef).then(async (url) => {
          saveBusiness(url);
        });
      });

    setLoading(false);
  };

  const saveBusiness = async (url) => {
    const ratingsList = [3, 3.5, 4, 4.5, 5];
    const randomRating =
      ratingsList[Math.floor(Math.random() * ratingsList.length)];

    await addDoc(collection(db, "BusinessList"), {
      name: name,
      address: address,
      contact: contact,
      website: website,
      about: about,
      category: category,
      imageUrl: url,
      ratings: randomRating.toString(),
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
    });

    router.back();
    ToastAndroid.show("Business Added Successfully", ToastAndroid.LONG);
  };

  const getCategory = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        { label: doc.data().name, value: doc.data().name },
      ]);
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Add New Business",
      headerShown: true,
    });
  });
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 16,
          color: Colors.GRAY,
        }}
      >
        Fill all details in order to add new Business
      </Text>

      <TouchableOpacity
        style={{
          marginTop: 20,
        }}
        onPress={() => onImagePick()}
      >
        {!image ? (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          onChangeText={(text) => setName(text)}
          placeholder="Name"
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            fontFamily: "outfit",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(text) => setAddress(text)}
          placeholder="Address"
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            fontFamily: "outfit",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(text) => setContact(text)}
          placeholder="Contact"
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            fontFamily: "outfit",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(text) => setWebsite(text)}
          placeholder="Website"
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            fontFamily: "outfit",
            marginTop: 10,
          }}
        />
        <TextInput
          onChangeText={(text) => setAbout(text)}
          placeholder="About"
          multiline
          numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            fontFamily: "outfit",
            height: 100,
            textAlign: "left",
            textAlignVertical: "top",
            marginTop: 10,
          }}
        />

        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            fontFamily: "outfit",
            marginTop: 10,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            placeholder={{
              label: "Select Category",
              value: null,
            }}
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={loading}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => onAddBusiness()}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "outfit-bold",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
