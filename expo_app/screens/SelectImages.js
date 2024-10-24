import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    Image,
    Pressable,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Modal,
    Dimensions
} from "react-native";
import FlatButton from "../assets/button";

function SelectImages({route, navigation}) {
    let {photos} = route.params;
    let {locationData} = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                if (photos != undefined) {
                    console.log(photos);
                } else {
                    console.log("No photos.");
                }

                if (locationData != null) {
                    console.log(locationData);
                } else {
                    console.log("No location data provided.");
                }
            }}>
                <Text>Press Me!</Text>
            </TouchableOpacity>

            <FlatButton text="Go Home" onPress={() => {navigation.navigate("Home")}} />
        </View>
    )
}

export default SelectImages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});