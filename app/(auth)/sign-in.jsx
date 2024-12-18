import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { signIn } from '../../lib/appwrite'
import { router } from 'expo-router'
import { getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider"

const SignIn = () => {
  const [form, setForm] = useState({
    email: '', 
    password: ''})


  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {

    const { email, password } = form

    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(email, password);
      const result = await getCurrentUser();
      //console.log('Result: ', result)
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="min-h-[85vh] justify-center w-full  px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"/>
          <Text className="text-2xl text-white text-semibold font-psemibold mt-10">Log in to Aora</Text>

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(value) => {setForm({...form, email: value})}}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(value) => {setForm({...form, password: value})}}
            otherStyles="mt-7"
          />

          <Link href="/" className="mr-0 ml-auto mt-5 text-base font-pregular text-gray-100">Forgot password
          </Link>

          <CustomButton
            handlePress={submit}
            containerStyles=" mt-5"
            title="Log In"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center mt-5 gap-2 items-center">
            <Text className="text-lg font-pregular text-gray-100">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg text-secondary font-pbold">Sign up</Link>
          </View>
           
         

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn