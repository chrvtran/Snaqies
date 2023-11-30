import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import FlatButton from '../assets/button';

import styles from './screenStyles';

function Ratings({ navigation }) {
    return (
        <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsText}>Rate Your Snaq</Text>
            <Rating fractions={1} startingValue={0} style={{ paddingVertical: 20 }}
                onFinishRating={rating => console.log(`Finished Rating: ${rating}`)} />
            <FlatButton text='Back to Home' onPress={() => navigation.navigate('Snaqies')}/>
            <StatusBar style="auto" />
        </View>
    );
}

export default Ratings;

