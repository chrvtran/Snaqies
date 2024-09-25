import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import SlideItem from './slideItem.js';
import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';

const Slider = React.forwardRef((props, ref) => {

    const photos = props.photos;
    const flatListRef = useRef(null);
    const [index, setIndex] = useState();

    useImperativeHandle(ref, () => ({
        // each key is connected to `ref` as a method name
        // they can execute code directly, or call a local method
        getIndex: () => { return index },
        setIndex(index) {
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
          }
        }
        // can list more methods
    }))

    const _onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
        // setIndex(viewableItems[0].key)
        if (viewableItems[0]) {
            // console.log(viewableItems[0])
            setIndex(viewableItems[0].key)
        }
        // console.log(viewableItems[0])
      }, []);
    
    // Considered viewable if it 90% visible
      const _viewabilityConfig = {
        itemVisiblePercentThreshold: 90
      }

    return (
      <View style={styles.sliderContainer}>
          <FlatList 
          data={photos} 
          renderItem= {({item}) => <SlideItem item={item}/>}
          horizontal={true}
          pagingEnabled
          snapToAlignment='center'
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          />
      </View>
    );
});

export default Slider;

const styles = StyleSheet.create({
  sliderContainer: {
    backgroundColor: 'transparent', 
  },
  flatList: {
    backgroundColor: 'transparent', 
  },
});
