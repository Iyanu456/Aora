import { View, Text, FlatList, ImageBackground } from 'react-native'
import React from 'react'
import { useState, useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity, Image } from 'react-native';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const video = useRef(null);

  return (
    <Animatable.View
    className="mr-5"
    animation={activeItem === item.$id ? zoomIn : zoomOut}
    duration={500}
    >
      {play === true ?
      <Video
      ref={video}
      source={{ uri: item.video }}
       // Replace with a reliable video link
        //className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg "
      style={{
        width: 208, // Equivalent to 'w-52' in Tailwind
        height: 258, // Equivalent to 'h-72' in Tailwind
        borderRadius: 35,
        marginTop: 'auto',
        marginBottom: 'auto',
      }}
      resizeMode={ResizeMode.COVER}
      useNativeControls
      shouldPlay
      onPlaybackStatusUpdate={(status) => {
        if (status.didJustFinish) {
          setPlay(false);
        }
      }}
    /> :
      <TouchableOpacity 
      className="relative justify-center items-center"
      activeOpacity={0.7}
      onPress={() => {setPlay(true)}}
      > 
        <ImageBackground 
        source={{ uri: item.thumbnail}} 
        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
        resizeMode='cover'
        />
        <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
      </TouchableOpacity> }
    </Animatable.View>
  )
}

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemChange = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }

  }
  



  return (
    <FlatList 
    data={posts}
    keyExtractor={(item) => item.$id}
    renderItem={({item}) => (
        <TrendingItem activeItem={activeItem} item={item}/>
  )}
  onViewableItemsChanged={viewableItemChange} 
  viewabilityConfig={{
    itemVisiblePercentThreshold: 70
  }}
  contentOffset={{ x: 170 }}
    horizontal
    />
  )
}

export default Trending