import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Animated, Platform} from 'react-native';
import Snaq from '../assets/snaq';
import FlatButton from '../assets/button';
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHeaderHeight, headerBackground } from '@react-navigation/elements';

const HEADER_HEIGHT = Platform.OS == 'ios' ? 110 : 70 + StatusBar.currentHeight;

function PostDisplayScreen({navigation, getData}) {
    const isFocused = useIsFocused();

    const [posts, setPosts] = useState();
    
    // animation of the header
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
    const headerY = diffClamp.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT]
    });

    useEffect(() => {
        if (isFocused) {
            // Call our getData callback
            async function retrievePosts() {
                const sortedPostObjs = await getData();
                setPosts(sortedPostObjs);
            }
            retrievePosts();
        }
    }, [isFocused]);

    return (
        <View style={{flex: 1}}>
          {/* header part itself including styling */}
        <Animated.View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: HEADER_HEIGHT,
          backgroundColor: 'white',
          // borderBottomWidth: 1,
          zIndex: 1000,
          elevation: 1000,
          transform:[{translateY: headerY}],
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.5,
          shadowRadius: 2.22,
          
          elevation: 3,
        }}>
          <View style={{
              height: 40,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
          }}>
              <Text style={{
                  fontSize: 30,
              }}>Snaqies
              </Text>
  
              <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
  
              }}>
                  <View style={{
                      borderWidth: 2,
                      height: 40,
                      width: 40,
                      marginRight: 10,
                  }}>
                  </View>
  
                  <View style={{
                      borderWidth: 2,
                      height: 40,
                      width: 40,
                      marginLeft: 10,
                  }}>
                  </View>
              </View>
  
          </View>
          </Animated.View>
          {/* animates header on scrollEvent (going up or down) */}
          <Animated.ScrollView 
            bounces={false}
            scrollEventThrottle={16}
            style={styles.container}
            onScroll={Animated.event([
              {
                  nativeEvent:{contentOffset:{y: scrollY}}
              }
            ],{
              useNativeDriver: true
            })}
          >
              <View style={styles.snaqcontainer}>
                  {posts && posts.map((post) =>
                  <Snaq key={post[0]} photos={post[1].photos} name={post[1].name}
                  onPress={() => navigation.navigate('Post', {
                      uuid: post[0],
                      date: post[1].date,
                      address: post[1].formatted_address,
                      name: post[1].name,
                      photos: post[1].photos,
                  })} />
                  )}
              </View>
              <StatusBar style="auto" />
          </Animated.ScrollView>
        </View>
    );
}

export default PostDisplayScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    snaqcontainer: {
        paddingTop: 120,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    headertext: {
        paddingTop: 100,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 5
    }
});