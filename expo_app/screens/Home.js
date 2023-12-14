import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Animated, SafeAreaView } from 'react-native';
import Snaq from '../assets/snaq';
import FlatButton from '../assets/button';
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatedHeader } from '../assets/AnimateHeader';
import { useHeaderHeight, headerBackground } from '@react-navigation/elements';

function Home({navigation }) {
  
    const scrollY = new Animated.Value(0);
    const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1],
    extrapolateLeft: 'clamp',
  });

    const isFocused = useIsFocused();

    const [posts, setPosts] = useState();

    const getData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const values = await AsyncStorage.multiGet(keys);

            if (values !== null) {
                // We retrieved data
                postObjs = values.map((val) => { return [val[0], JSON.parse(val[1])] })
                setPosts(postObjs);
            }
            else {
                throw "ERROR: Cannot retrieve AsyncStorage data in Home.js";
            }
        } catch (e) {
            // error reading value
            console.error(e);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getData();
            console.log(posts)
        }
    }, [isFocused]);

    return (
      <View style={{flex: 1}}>
      {AnimatedHeader(translateY)}
        <ScrollView 
          style={styles.container}
          scrollEventThrottle={16}
          onScroll={(e)=>{
            scrollY.setValue(e.nativeEvent.contentOffset.y)
          }}
        >
            <Text style={styles.headertext}>↓ Recent</Text>
                <View style={styles.snaqcontainer}>
                    {posts && posts.map((post) =>
                    <Snaq key={post[0]} photos={post[1].photos} onPress={() => navigation.navigate('Post', {
                        key: post[0],
                        photos: post[1].photos,
                    })} />
                    )}
                </View>
            <StatusBar style="auto" />
        </ScrollView>
      </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    snaqcontainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 5
    }
});
