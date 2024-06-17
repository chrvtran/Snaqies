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

    const clearAsync = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
            await AsyncStorage.multiRemove(keys);
        } catch (e) {
            // read key error
        }
        console.log("cleared")
    }

    let getDraftKeys = async () => {
        let keys = []
        try {
            // Get all posts in async
            keys = await AsyncStorage.getAllKeys();
            allPostsData = await AsyncStorage.multiGet(keys);
            allPostsObjs = allPostsData.map((val) => [val[0], JSON.parse(val[1])]);

            // Filter out on drafts
            drafts = allPostsObjs.filter(([key, postData]) => postData.published === false);

            // Print keys associated with drafts
            if (drafts.length == 0) {
                console.log("No drafts to display");
            } else {
                for (let i = 0; i < drafts.length; i++) {
                    console.log("Draft #" + i + " Key: " + drafts[i][0]);
                    console.log("Is published: " + drafts[i][1].published);
                    console.log("\n");
                }
            }
        } catch (e) {

        }
    }

    let publishAllDrafts = async () => {
        let keys = []
        try {
            // Get all posts in async
            keys = await AsyncStorage.getAllKeys();
            allPostsData = await AsyncStorage.multiGet(keys);
            allPostsObjs = allPostsData.map((val) => [val[0], JSON.parse(val[1])]);

            // Filter out on drafts
            drafts = allPostsObjs.filter(([key, postData]) => postData.published === false);

            // Publish all drafts
            if (drafts.length == 0) {
                console.log("No drafts to publish");
            } else {
                for (let i = 0; i < drafts.length; i++) {
                    curKey = drafts[i][0];
                    curDraft = drafts[i][1];
                    curDraft.published = true;

                    await AsyncStorage.setItem(curKey, JSON.stringify(curDraft));
                    
                    let updatedVal = await AsyncStorage.getItem(curKey);
                    console.log(updatedVal);
                }
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        if (isFocused) {
            
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text>Testing Page</Text>
            <FlatButton text='Async getAllKeys' onPress={getAllKeys} />
            <FlatButton text='Clear Async Storage' onPress={clearAsync} />
            <FlatButton text='Get Draft Keys' onPress={getDraftKeys}/>
            <FlatButton text='Publish All Drafts' onPress={publishAllDrafts} />
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
