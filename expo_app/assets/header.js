import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SearchIcon from './icons/search.svg';

import styles from './styles';

function Header() {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>Snaqies</Text>
            </View>
            <View style={styles.imageIconContainer}>
                <TouchableOpacity>
                    <SearchIcon style={styles.headerIcon}/>
                </TouchableOpacity>
                <Image 
                    source={require('./images/Snaqies_logo.png')}
                    style={styles.headerImage}
                />
            </View>
        </View>
    );
}

export default Header;


