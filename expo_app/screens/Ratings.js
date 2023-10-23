import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';

function Ratings() {
    return (
        <View style={styles.container}>
            <Text style={styles.ratingText}>Rate Your Snaq</Text>
            <Text> </Text>
            <Rating fractions={1} startingValue={0} onFinishRating={rating => console.log(`Finished Rating: ${rating}`)}/>
        </View>
    );
}

export default Ratings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingText: {
        fontWeight: 'bold',
        fontSize: 32
    }
});