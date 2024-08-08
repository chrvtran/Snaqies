import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

function review(props) {
    const {
        uuid, 
        foodtags, // list of food names from snaq component to be referenced in the feedback later
        feedback, // review comments
        rating, // stars
        price, 
        receipt // photo of receipt
    } = { ...defaultProps, ...props};
    return  (
        <View style={styles.container}>
            <Text>{feedback}</Text>
        </View>
    );
}

export default review;

const defaultProps = {
    uuid: null,
    foodtags: [],
    feedback: '',
    rating: 0,
    price: '',
    receipt: null
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#33D7FF'
    },
});
