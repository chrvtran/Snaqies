import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Animated } from 'react-native';
import Snaq from '../assets/snaq';
import FlatButton from '../assets/button';
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatedHeader } from '../assets/AnimateHeader';
import { useHeaderHeight, headerBackground } from '@react-navigation/elements';
import Header from '../assets/header.js';

function Home({navigation }) {

    const isFocused = useIsFocused();

    const [posts, setPosts] = useState();
    
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 70)
    const headerY = diffClamp.interpolate({
        inputRange: [0, 70],
        outputRange: [0, -70]
    })

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
      <Animated.View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 70,
        backgroundColor: 'gray',
        zIndex: 1000,
        elevation: 1000,
        transform:[{translateY: headerY}]
      }}/>
        <Animated.ScrollView 
          bounces={false}
          scrollEventThrottle={16}
          style={styles.container}
          onScroll={Animated.event([
            {
                nativeEvent:{contentOffset:{y: scrollY}}
            }
          ],)}
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
        </Animated.ScrollView>
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
        paddingTop: 70,
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 5
    }
});
