import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }) => {

  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className="relative mt-5 w-full h-16 rounded-2xl  flex-row items-center">
      
      
        <TextInput 
        className="w-full rounded-xl bg-black-100 px-4  h-16 flex-1 border-2 border-black-200 focus:border-secondary text-white justify-center font-pregular text-base"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"

        onChangeText={(e) => {setQuery(e)}}
        />

        <TouchableOpacity 
        className="absolute right-[14px]"
        onPress={() => {
          if(!query) {
            return Alert.alert('Missing query', 'Plesse input something to search results across database')
          }

          if(pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
        >
        <Image source={icons.search} className=" h-8 w-8 " resizeMode="contain" />
        
        </TouchableOpacity>
      
    </View>
  )
}

export default SearchInput
