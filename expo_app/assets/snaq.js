import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import review from './review';

function snaq(props) {
    const uuid = props.uuid;
    const photos = props.photos; // list of images
    const foodtags = props.foodtags; // list of food names
    const restaurantname = props.restaurantname;
    const address = props.address; // address
    const reviews = [];

    return  (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress} style={styles.button}>
                <Image source={{uri: photos[0]}} style={styles.photo}/>
            </TouchableOpacity>
        </View>
    );
}

export default snaq;

snaq.defaultProps = {
    uuid: null,
    photos: [],
    foodtags: [],
    restaurantname: '',
    address: ''
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingHorizontal: 0,
        paddingVertical: 0,
        margin: 6,
        backgroundColor: '#33D7FF',
        width: '45%',
        height: 300
    },
    button: {
    },
    photo: {
        borderRadius: 10,
        width: '100%',
        height: 300,
    }
});
