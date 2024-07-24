import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import Intro from "@/components/BusinessDetails/Intro";
import ActionButton from "../../components/BusinessDetails/ActionButton";
import About from "../../components/BusinessDetails/About";
import Reviews from "../../components/BusinessDetails/Reviews";

export default function BusinessDetails() {
  const { businessid } = useLocalSearchParams();
  const [businessDetails, setBusinessDetails] = useState();
  const [loading, setLoading] = useState(true);

  const getBusinessDetailsById = async () => {
    setLoading(true);
    const businessRef = doc(db, "BusinessList", businessid);
    const document = await getDoc(businessRef);

    if (document.exists()) {
      setBusinessDetails({ id: document.id, ...document.data() });
    }

    setLoading(false);
  };

  useEffect(() => {
    getBusinessDetailsById();
  }, [businessid]);

  const renderSection = ({ item }) => {
    switch (item) {
      case "Intro":
        return <Intro business={businessDetails} />;
      case "ActionButton":
        return <ActionButton business={businessDetails} />;
      case "About":
        return <About business={businessDetails} />;
      case "Reviews":
        return <Reviews business={businessDetails} />;
      default:
        return null;
    }
  };

  const sections = ["Intro", "ActionButton", "About", "Reviews"];

  return loading ? (
    <ActivityIndicator
      style={{
        marginTop: "70%",
      }}
      size="large"
      color={Colors.PRIMARY}
    />
  ) : (
    <FlatList
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item) => item}
    />
  );
}
