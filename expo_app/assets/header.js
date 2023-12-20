import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import SearchIcon from './icons/search.svg'

function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.innerCont}>
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
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'white',
        paddingTop: 30,
        overflow: 'hidden',

    },
    innerCont: {
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