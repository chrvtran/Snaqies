import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import review from './review';
import styles from '../screens/styleSheet';

function snaq(props) {
    const key = props.uuid;
    const photos = props.photos; // list of images
    const foodtags = props.foodtags; // list of food names
    const restaurantname = props.restaurantname;
    const address = props.address; // address
    const reviews = [];

    return  (
        <View style={styles.snaqContainer}>
            <TouchableOpacity onPress={props.onPress} style={styles.snaqButton}>
                <Image source={{uri: photos[0]}} style={styles.snaqPhoto}/>
            </TouchableOpacity>
        </View>
    );
}

export default snaq;

snaq.defaultProps = {
    photos: [],
    foodtags: [],
    restaurantname: '',
    address: ''
}


