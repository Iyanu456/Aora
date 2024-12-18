import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider"

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    username: '', 
    email: '',
    password: ''
  })
  
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    const { email, username, password } = form;

    /*if (!email || !password || !username) {
      Alert.alert('Please fill in all the fields');
      return;
    }*/
  
    setIsSubmitting(true);
  
    try {
       const result = await createUser(email, password, username);
       console.log("Create user result:", result);

      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed up successfully");
       router.replace('/home');

    } catch (error) {
      console.log("Error message:", error.message || "An unexpected error occurred.");
      Alert.alert('Failed to create user', error.message || "Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="min-h-[85vh] justify-center w-full px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white font-semibold font-psemibold mt-10">
            Sign up for Aora
          </Text>

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(value) => {setForm({ ...form, username: value })}}
            otherStyles="mt-7"
          />

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(value) => {setForm({ ...form, email: value })}}
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(value) => {setForm({ ...form, password: value })}}
            otherStyles="mt-7"
          />

          <CustomButton
            handlePress={submit}
            containerStyles="mt-7"
            title="Sign up"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center mt-5 gap-2 items-center">
            <Text className="text-lg font-pregular text-gray-100">
              Already have an account?
            </Text>
            <Link href="/sign-in" className="text-lg text-secondary font-pbold">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
