import React from 'react';
import {Image, FlatList, StyleSheet, TouchableOpacity, Text, View, Dimensions} from 'react-native';

import styles from './styles'



function SlideItem({item}) {
    return (
        <View style={styles.slideItemsContainer}>
          <Image source={item} 
          resizeMode="cover" 
          style={styles.slideItemsImage}/>
        </View>
    );
}

export default SlideItem;


