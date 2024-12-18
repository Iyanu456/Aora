import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { router, Redirect } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

const App = () => {
  const { loading, isLoggedin } = useGlobalContext();

  if (!loading && isLoggedin) return <Redirect href='/home' />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full justify-center  h-full items-center px-4">
          <Image
            source={images.logo}
            className="w-[150px] h-[90px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text re className="text-3xl max-w-[80%] leading-[35px] font-psemibold text-center text-white">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-11"
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-500 max-w-[80%] text-sm text-center font-pregular mt-4">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
          handlePress={() => router.push('/sign-in')}
            containerStyles="w-[80%] mt-7"
            title="Continue with Email"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
};

export default App;
