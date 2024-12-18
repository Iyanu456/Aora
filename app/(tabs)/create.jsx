import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import FormField
 from '../../components/FormField'
const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: '',
    thumbnail: '',
    prompt: '',
  });

  return (
    <SafeAreaView className="bg-primary h-full flex-1 items-center justify-center">
      <ScrollView className="px-4 my-6 w-full" >
        <Text className="text-white text-2xl font-psemibold ">Upload Video</Text>

        <FormField 
        title="Video title"
        value={form.title}
        placeholder="Give your video a catchy title..."
        placeholderTextColor="gray"
        handleChangeText={(value) => {setForm({...form, title: value})}}
        otherStyles="mt-10 font-pregular "
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create