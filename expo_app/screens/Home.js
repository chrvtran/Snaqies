import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Animated, Platform} from 'react-native';
import Snaq from '../assets/snaq';
import FlatButton from '../assets/button';
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHeaderHeight, headerBackground } from '@react-navigation/elements';
import PostDisplayScreen from './PostDisplayScreen';

const HEADER_HEIGHT = Platform.OS == 'ios' ? 110 : 70 + StatusBar.currentHeight;

function Home({navigation }) {
    const getData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const values = await AsyncStorage.multiGet(keys);

            if (values !== null) {
                // We retrieved data
                postObjs = values.map((val) => [val[0], JSON.parse(val[1])]);

                const validPostObjs = postObjs.filter(([key, post]) => post && post.date !== undefined && post.published);
                    const sortedPostObjs = validPostObjs.sort((a, b) => {
                    const dateA = new Date(a[1].date).getTime();
                    const dateB = new Date(b[1].date).getTime();
                    return dateB - dateA; 
                });

            return sortedPostObjs;
            }
            else {
                throw "ERROR: Cannot retrieve AsyncStorage data in Home.js";
            }
        } catch (e) {
            // error reading value
            console.error(e);
        }
    };

    return (
        <PostDisplayScreen navigation={navigation} getData={getData}/>
    );
}

export default Home;
