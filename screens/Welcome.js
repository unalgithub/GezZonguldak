import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import Signup from "../screens/Signup";
import login from "../screens/Login";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require("../assets/hero1.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: -30,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-5deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 130,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero2.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 110,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 400,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Hadi Başlayalım
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                marginVertical: 4,
                textAlign: "center",
              }}
            >
              Muhteşem doğası ve gizli güzellikleriyle
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              bu şehirde seni bekleyen harika deneyimleri{" "}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              keşfetmek için...
            </Text>
          </View>

          <Button
            title="Şimdi Gezmeye Başla"
            onPress={() => navigation.navigate("Signup")}
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Zaten Hesabım Var{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                Giriş Yap
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={() => navigation.navigate("Main")}>
            <Text
              style={{
                fontSize: 16,
                flex: 1,
                color: COLORS.white,
                fontWeight: "bold",
                marginVertical: 10,
                textAlign: "center",
              }}
            >
              Üyeliksiz devam et
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
