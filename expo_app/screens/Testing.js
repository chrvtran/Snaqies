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
        } catch(e) {
          // read key error
        }
      
        console.log(keys)
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
      }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("@post");

            postObj = JSON.parse(value);
            setPost(postObj);
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            console.error("error");
            // error reading value
        }
    };

    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            {post && post.caption !== undefined && (
                <Snaq photos={post.photo} restaurantname={post.caption}></Snaq>
            )} 
            <Text>This is the Bookmarks Screen!</Text>
            <FlatButton text='Test get all async keys' onPress={getAllKeys}/>
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
