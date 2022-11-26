import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FoodReal from '../components/home/FoodReal';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import BottomTabs, { bottomTabIcons } from '../components/BottomTabs';

import { POSTS } from '../dummydata/posts'

export default function Home({ navigation, route }) {
  const background = '../Images/OCMgradient.png'
  const { data } = route.params
  let dataPosts = data.posts[0];
  return (
    <ImageBackground style={styles.background} source={require(background)}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation}></Header>
        <FoodReal navigation={navigation}></FoodReal>
        <ScrollView>
          {dataPosts.map((post, index) => (
            <Post post={post} key={index}></Post>
          ))}
        </ScrollView>
        <BottomTabs navigation={navigation} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    width: null,
    height: null,
  },
  post: {
    marginTop: 24,
    padding: 50,
    backgroundColor: 'pink',
    fontSize: 30,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
});