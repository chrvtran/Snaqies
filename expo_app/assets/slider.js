import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import SlideItem from './slideItem.js';

function Slider(props) {
    const photos = props.photos;
    return (
        <View>
            <FlatList 
            data={photos} 
            renderItem= {({item}) => <SlideItem item={item}/>}
            horizontal={true}
            pagingEnabled
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default Slider;

const styles = StyleSheet.create({
});
