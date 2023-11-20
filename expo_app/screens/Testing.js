import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import FlatButton from "../assets/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Snaq from "../assets/snaq";

function Testing({ navigation }) {

    const isFocused = useIsFocused();

    const [post, setPost] = useState();

    const getAllKeys = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
        } catch (e) {
            // read key error
        }

        console.log(keys)
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("b07d5bf4-82ae-11ee-9ba8-ef578d824ade");

            if (value !== null) {
                // We retrieved data
                postObj = JSON.parse(value);
                setPost(postObj);
            }
            else {
                throw "ERROR: Cannot retrieve AsyncStorage data in Testing.js";
            }
        } catch (e) {
            // error reading value
            console.error(e);
            // This file location just works to give no image in the snaq
            setPost({ "photos": ["expo_app\assets\icons\search.svg"] });
        }
    };

    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            {post !== undefined && (
                <Snaq photos={post.photos}></Snaq>
            )}
            <Text>Testing Page</Text>
            <FlatButton text='Async getAllKeys' onPress={getAllKeys} />
            <FlatButton text='Ratings Screen' onPress={() => navigation.navigate('Ratings')} />
            <FlatButton text='Price Screen' onPress={() => navigation.navigate('Price')} />
            <StatusBar style="auto" />
        </View>
    );
}

export default Testing;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
