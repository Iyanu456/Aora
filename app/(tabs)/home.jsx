import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { getLatestAllPost } from "../../lib/appwrite";
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(getAllPost);
  const { data: latestPosts } = useAppwrite(getLatestAllPost);
  

  const [refreshing, setRefreshing] = useState(false);
 
 
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 mb-0 space-y-6 px-4">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-gray-100 text-2xl font-pbold">{user?.username}</Text>
              </View>

              <View className="mt-1.5 mr-0 ml-auto">
                <Image
                  source={images.logoSmall}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            {/* Conditionally render "Trending Videos" */}
            {posts.length > 0 && (
              <View className="flex mt-5 justify-between items-start flex-row ">
                <Text className="text-gray-100 text-lg font-pregular">
                  Trending Videos
                </Text>

                
              </View>
            )}

            <Trending posts={latestPosts ?? []} />
            {/*<CustomButton 
            title='fetch data' 
            containerStyles='w-full'
            handlePress={fetchData}
            />*/}
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video"
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        
      />
    </SafeAreaView>
  );
};

export default Home;
