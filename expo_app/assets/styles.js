import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        margin: 5,
        backgroundColor: '#33D7FF'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    },
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
    headerImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    }, 
    headerIcon: {
        width: '100%',
        height: '100%'
    },
    imageIconContainer: {
        width: '50%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    reviewContainer: {
        backgroundColor: '#33D7FF'
    },
    sliderContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    sliderImage: {
        flex: 0.7,
        width: '100%',
    },
    
    slideItemsContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    slideItemsImage: {
        flex: 0.7,
        width: '100%',
    },
    snaqContainer: {
        borderRadius: 10,
        paddingHorizontal: 0,
        paddingVertical: 0,
        margin: 6,
        backgroundColor: '#33D7FF',
        width: '45%',
        height: 300
    },
    snaqButton: {
    },
    snaqPhoto: {
        borderRadius: 10,
        width: '100%',
        height: 300,
    }
});

export default styles;
