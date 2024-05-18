import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as RootNavigation from "../../RootNavigation";

export default function ProfileTab({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo();

    async function getUserInfo() {
      const _user = await AsyncStorage.getItem("userInfo");
      setUserInfo(JSON.parse(_user));
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile Bilgileri</Text>
      <Text>Kullanıcı Email : {userInfo?.email}</Text>
      <Text>Kullanıcı Şifre : {userInfo?.password}</Text>

      <Button
        title="Çıkış Yap"
        onPress={async () => {
          await AsyncStorage.removeItem("userInfo");
          navigation.navigate("Welcome");
        }}
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
      />
    </View>
  );
}
