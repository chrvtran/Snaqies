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

    useEffect(() => {
        if (isFocused) {
            
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text>Testing Page</Text>
            <FlatButton text='Async getAllKeys' onPress={getAllKeys} />
            <FlatButton text='Clear Async Storage' onPress={clearAsync} />
            <FlatButton text='Ratings Screen' onPress={() => navigation.navigate('Ratings')} />
            <FlatButton text='Price Screen' onPress={() => navigation.navigate('Price')} />
            <FlatButton text='SelectPhoto' onPress={() => navigation.navigate('SelectPhoto')} />


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
