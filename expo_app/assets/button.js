import React from 'react';
import {TouchableOpacity, Text, View } from 'react-native';
import styles from './styleSheet';

function FlatButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    );
}

export default FlatButton;

