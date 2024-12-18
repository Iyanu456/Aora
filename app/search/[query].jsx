import { View, Text, SafeAreaView, FlatList } from 'react-native'
import {useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { searchPost } from '../../lib/appwrite';
import EmptyState from "../../components/EmptyState";
import SearchInput from '../../components/SearchInput';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';

const Search = () => {

    const { query } = useLocalSearchParams()
    const { data: posts, refetch } = useAppwrite(() => searchPost(query));

     

     useEffect(() => {
        refetch()
     }, [query])


    return (
        <SafeAreaView className="bg-primary h-full pt-8">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 mb-0 px-4">
           
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Results
                </Text>

                <Text className="text-gray-100 text-2xl font-pbold">{query}</Text>

                <View className="mt-6 mb-8">
                    <SearchInput initialQuery={query}/>
                </View>
              </View>


            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
        
      />
    </SafeAreaView>
    )
}

export default Search