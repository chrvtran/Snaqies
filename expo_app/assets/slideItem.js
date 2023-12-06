import React from 'react';
import {Image, FlatList, StyleSheet, TouchableOpacity, Text, View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

const getData = () => {
    return this.state;
}

function SlideItem({item}) {
    return (
        <View style={styles.container}>
          <Image source={item} 
          resizeMode="cover" 
          style={styles.image}/>
        </View>
    );
}

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width, 
        height,
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    image: {
        flex: 0.7,
        width: '100%',
    }

});
