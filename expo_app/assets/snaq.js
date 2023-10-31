import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';

function snaq(props) {
    const image = props.image;
    const caption = props.caption;
    const rating = props.rating;
    const price = props.price;
    const location = props.location;
    return  (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Image source={{uri: image}} style={styles.image}/>
                <Text>{caption}</Text>
            </View>
        </TouchableOpacity>
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
        borderRadius: 8,
        paddingVertical: 50,
        paddingHorizontal: 50,
        margin: 5,
        backgroundColor: '#33D7FF'
    },
    image: {
        width: 200,
        height: 200
    }
});
