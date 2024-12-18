import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import { getUserPosts } from '../../lib/appwrite';
import EmptyState from "../../components/EmptyState";
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import { signOut } from '../../lib/appwrite';
import { router } from 'expo-router';

const Profile = () => {

    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

    const logout = async () => {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in')
    }

    return (
        <SafeAreaView className="bg-primary h-full pt-10">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image source={icons.logout} resizeMode="contain" className="h-6 w-6"/>
              </TouchableOpacity>  

              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center"> 
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
                </View>      

                <InfoBox 
                  title={user?.username}
                  containerStyles="mt-5"
                  titleStyle="text-lg"
                />    

                <View className="mt-5 flex-row">
                <InfoBox 
                  title={posts.length || 0}
                  subtitle="Posts"
                  containerStyles="mr-10"
                  titleStyle="text-xl"
                />    
                <InfoBox 
                  title="1.2k"
                  subtitle="Followers"
                  titleStyle="text-xl"
                />    
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

export default Profile