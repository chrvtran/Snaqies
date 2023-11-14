import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SearchIcon from './icons/search.svg'

function Header() {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>Snaqies</Text>
            </View>
            <View style={styles.imageIconContainer}>
                <TouchableOpacity>
                    <SearchIcon style={styles.icon}/>
                </TouchableOpacity>
                <Image 
                    source={require('./images/Snaqies_logo.png')}
                    style={styles.image}
                />
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: '98%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#737373',
        letterSpacing: 1,
    },
    imageIconContainer: {
        width: '50%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    }, 
    icon: {
        width: '100%',
        height: '100%'
    }
});