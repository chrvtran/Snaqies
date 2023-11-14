import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Map({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    )
};

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: '100%',
        height: '70%'
      }
})