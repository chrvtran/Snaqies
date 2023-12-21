import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Animated} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import SearchIcon from './icons/search.svg'

function Header() {

    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 70)
    const headerY = diffClamp.interpolate({
        inputRange: [0, 70],
        outputRange: [0, -70]
    })
    
    return (
        <Animated.View style={styles={
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 70,
            backgroundColor: 'gray',
            zIndex: 1000,
            elevation: 1000,
            transform:[{translateY: headerY}]
        }}>
            {/* <View style={styles.innerCont}>
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
            </View> */}
        </Animated.View>
    );
}

export default Header;

const styles = StyleSheet.create({
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