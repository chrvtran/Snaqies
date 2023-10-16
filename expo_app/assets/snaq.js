import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import Post from '../screens/Post';

function snaq(props) {
    const image = props.image;
    const caption = props.caption;
    const rating = props.rating;
    const price = props.price;
    const location = props.location;
    return  (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Image source={require('../assets/images/favicon.png')} style={styles.image}/>
            </View>
        </TouchableOpacity>
    );
}

snaq.defaultProps = {
    image: null,
    caption: '',
    rating: 0,
    price: '',
    location: ''
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        paddingVertical: 120,
        paddingHorizontal: 120,
        margin: 5,
        backgroundColor: '#33D7FF'
    },
    image: {
        width: 100,
        height: 100
    }
});

export default snaq;