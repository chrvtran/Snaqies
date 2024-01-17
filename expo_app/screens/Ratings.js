import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import FlatButton from '../assets/button';

function Ratings({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.ratingText}>Rate Your Snaq</Text>
            <Rating fractions={1} startingValue={0} style={{ paddingVertical: 20 }}
                onFinishRating={rating => console.log(`Finished Rating: ${rating}`)} />
            <FlatButton text='Back to Home' onPress={() => navigation.navigate('Home')}/>
            <StatusBar style="auto" />
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