import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';

function snaq(props) {
    const uuid = props.id;
    const image = props.image;
    const caption = props.caption;
    const rating = props.rating;
    const price = props.price;
    const location = props.location;
    return  (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress} style={styles.button}>
                <Image source={{uri: image}} style={styles.image}/>
                <Text>{caption}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default snaq;

snaq.defaultProps = {
    image: null,
    caption: '',
    rating: 0,
    price: '',
    location: ''
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
    image: {
        borderRadius: 10,
        width: '100%',
        height: 300,
    }
});
