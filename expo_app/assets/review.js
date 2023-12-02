import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styleSheet';
function review(props) {
    const uuid = props.uuid;
    const foodtags = props.foodtags; // list of food names from snaq component to be referenced in the feedback later
    const feedback = props.feedback; // review comments
    const rating = props.rating; // stars
    const price = props.price;
    const receipt = props.receipt; // photo of receipt
    return  (
        <View style={styles.reviewContainer}>
            <Text>{feedback}</Text>
        </View>
    );
}

export default review;

review.defaultProps = {
    uuid: null,
    foodtags: [],
    feedback: '',
    rating: 0,
    price: '',
    receipt: null
}


