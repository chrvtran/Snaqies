import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import review from './review';

function snaq(props) {
    const uuid = props.uuid;
    const photos = props.photos; // list of images
    const name = props.name;
    const reviews = [];

    return  (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress} style={styles.button}>
                <Image source={{uri: photos[0]}} style={styles.photo}/>
            </TouchableOpacity>
            <Text style={styles.name}>{name}</Text>
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
    name: {
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 15,
        color: 'black',
        
    },
    button: {
    },
    photo: {
        position: 'absolute',
        top: 0,
        borderRadius: 10,
        width: '100%',
        height: 300,
    }
});
