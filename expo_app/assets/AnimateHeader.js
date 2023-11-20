import { Animated } from 'react-native';
import Header from './header'

export const AnimatedHeader = (translateY) => {
    return (
        <Animated.View 
        style={{
            height: 64,
            transform: [{translateY: translateY}],
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            elevation: 4,
            zIndex: 1,
        }}>
            <Header/>
        </Animated.View>
    );
};