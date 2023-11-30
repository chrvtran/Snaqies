import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlatButton from '../assets/button';
import {Picker} from "@react-native-picker/picker";

import styles from './screenStyles';

function Price({ navigation }) {
    const [Enable, setEnable] = useState("prices");
    return (
        <View style={styles.priceContainer}>
            <Text>This is the Price Screen!</Text>
            <FlatButton text='Back to Home' onPress={() => navigation.navigate('Snaqies')}/>
            <View>        
                <Text style={styles.pricePickerText}>Select the Price</Text>
                <Picker
                    selectedValue={Enable}
                    style={{ height: 50, width: 250 }}
                    onValueChange={(itemValue) => setEnable(itemValue)}
                >
                    <Picker.Item label="$0-10" value='1'/>
                    <Picker.Item label="$10-20" value='2'/>
                    <Picker.Item label="$20-30" value='3'/>
                    <Picker.Item label="$30-40" value='4'/>
                    <Picker.Item label="$40-50" value='5'/>
                    <Picker.Item label="$50-60" value='6'/>
                    <Picker.Item label="$60-70" value='7'/>
                    <Picker.Item label="$70-80" value='8'/>
                    <Picker.Item label="$80-90" value='9'/>
                    <Picker.Item label="$90-100" value='10'/>
                </Picker>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default Price;