import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import FlatButton from "../assets/button";
import { useIsFocused } from "@react-navigation/native";


function DraftsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Drafts page under construction...</Text>
            <FlatButton text='Go back to home' onPress={() => navigation.navigate("Home")}/>
            <StatusBar style='auto'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default DraftsScreen;