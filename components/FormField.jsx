import { Image, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { icons } from '../constants';


const FormField = ({title, handleChangeText, otherStyles, keyboardType, value, placeholder, placeholderTextColor, placeholderStyle, ...props}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    

  return (
    <View className={`space-y-2 ${otherStyles} `}>
      <Text className="text-base text-gray-100 font-pmedium mb-2">{title}</Text>
      <View className="relative w-full focus:border-secondary h-16 rounded-2xl  flex-row items-center">
        <TextInput 
        className={`w-full rounded-xl bg-black-100 px-4  h-16 flex-1 border-2 border-black-200 focus:border-secondary text-white justify-center font-psemibold text-base ${title === 'Password' ? 'pr-[46px]' : ''}`}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        placeholderStyle={placeholderStyle}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
        secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && 
        <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
            <Image 
                source={showPassword ? icons.eyeHide : icons.eye} 
                className="absolute right-[14px]  h-8 w-8"
                resizeMode='contain'
                />
        </TouchableWithoutFeedback>}
      </View>
    </View>
  )
}

export default FormField
