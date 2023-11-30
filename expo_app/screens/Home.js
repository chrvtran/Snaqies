import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import Snaq from '../assets/snaq';
import FlatButton from '../assets/button';
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from './screenStyles';

function Home({ navigation }) {

    const isFocused = useIsFocused();

    const [posts, setPosts] = useState();

    const getData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()
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
        }
    }, [isFocused]);

    return (
        <ScrollView style={styles.homeContainer}>
            <Text style={styles.homeHeaderText}>↓ Recent</Text>
                <View style={styles.homeSnaqContainer}>
                    {posts && posts.map((post) =>
                    <Snaq key={post[0]} photos={post[1].photos} onPress={() => navigation.navigate('Post')} />
                    )}
                </View>
            <StatusBar style="auto" />
        </ScrollView>
    );
}

export default Home;

