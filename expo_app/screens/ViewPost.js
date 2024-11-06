import {
  TouchableOpacity,
  Button,
  View,
  Image,
  Text,
  PlatformColor,
  ScrollView,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SettingsIcon from '../assets/icons/settings.svg';

import BackArrow from '../assets/icons/back-arrow.svg';
const { width, height } = Dimensions.get('window');
const costRange = [0,10];
const reviewText = "This is a placeholder for the review textThis is a placeholder for the review text\nThis is a placeholder for the review text\nThis is a placeholder for the review text\nThis is a placeholder for the review text\nThis is a placeholder for the review text\nThis is a placeholder for the review text\n"
  
function ViewPost({ navigation }) {
    const [selectedIndex, setSelectedIndex] = useState({ row: -1, col: -1 });
    const imageData = [
        ['lightgray', 'lightcoral', 'lightblue'],
        ['lightgreen', 'lightyellow', 'lightpink'],
        ['lightseagreen', 'lightgoldenrodyellow', 'lightsteelblue'],
        ['lightsalmon', 'lightcyan', 'lightgoldenrodyellow'],
        ['lightgray', 'lightcoral', 'lightblue'],
        ['lightgreen', 'lightyellow', 'lightpink'],
        ['lightseagreen', 'lightgoldenrodyellow', 'lightsteelblue'],
        ['lightsalmon', 'lightcyan', 'lightgoldenrodyellow'],
        ['lightgray', 'lightcoral', 'lightblue'],
      ];
    const costRange = [0,10];
const reviewText = "This is a placeholder for the review textThis is a placeholder for the review text\nThis is a placeholder for the review text\nThis is a placeholder for the review text\nThis is a placeholder for the review text\nThis is a placeholder for the review text\nThis is a placeholder for the review text\n"
const handleImagePress = (rowIndex, colIndex) => {
    setSelectedIndex({ row: rowIndex, col: colIndex });
  };

    return (
        <SafeAreaView style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <BackArrow width={24} height={24} style={styles.backArrow} />
            <View style={styles.headerRightIcons}>
              {/* Placeholder for icons */}
              <View style={styles.iconPlaceholder} />
              <SettingsIcon ></SettingsIcon>
            </View>
          </View>
    
          {/* Title Section */}
            <View style={styles.titleSection}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>Placeholder Cafe</Text>
                    <Text style={styles.addressText}>Placeholder Address</Text>
                </View>
                <Text style={styles.timeText}>37 minutes ago</Text>
            </View>

    
          {/* Image Section */}
          <ScrollView horizontal={false} style={styles.imageGrid}>
            {imageData.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.imageRow}>
                {row.map((color, colIndex) => (
                    <TouchableOpacity
                    key={colIndex}
                    style={[
                        styles.imagePlaceholder,
                        {
                        backgroundColor:
                            selectedIndex.row === rowIndex && selectedIndex.col === colIndex
                            ? 'yellow' 
                            : color,
                        },
                    ]}
                    onPress={() => handleImagePress(rowIndex, colIndex)}
                    />
                ))}
                </View>
            ))}
            </ScrollView>
    
          {/* Reviews Section */}
          <View style={styles.reviewSection}>
            <View style={styles.reviewHeaderContainer}>
                <Text style={styles.reviewHeader}>Reviews</Text>
                <SettingsIcon style={styles.editReview} />
            </View>
            <Text style={styles.reviewTitle}>Placeholder Review Title {costRange[0]} - {costRange[1]}</Text>
            <ScrollView style={styles.reviewTextContainer}>
                <Text style={styles.reviewText}>
                    {reviewText}
                </Text>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
}
export default ViewPost;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    },
    backArrow: {
    flex: 1,
    },
    headerRightIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 50,
    },
    iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: 'gray',
    marginHorizontal: 4,
    borderRadius: 12,
    },
    titleSection: {
        borderColor: 'black',
        borderWidth: 1,
        height: height/8,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      titleWrapper: {
        flex: 1,
      },
      titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#333',
      },
      addressText: {
        fontSize: 14,
        textAlign: 'left',
        color: '#a9a9a9',
        marginTop: 4,
      },
      timeText: {
        fontSize: 12,
        color: '#999',
        position: 'absolute',
        bottom: 16,
        right: 16,
      },
    imageGrid: {
    marginVertical: 20,
    maxHeight:height*.8,
    },
    imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    },
    imagePlaceholder: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 10,
    },
    reviewSection: {
    height: height/5,
    width: width,
    backgroundColor: '#f7f7f7',
    // borderRadius: 10,
    },
    reviewHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginVertical: 10,
        width: width*.95,
        padding:10
      },
      editReview: {
        marginRight: 8,
      },
      reviewHeader: {
        fontSize: 20,
        fontWeight: 'bold', 
      },
    reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding:10
    },
    reviewTextContainer: {
    maxHeight: height/9, 
    width: width,
    marginTop: 8,
    paddingHorizontal: 16,
    },
    reviewText: {
    fontSize: 14,
    width:width-40,
    marginTop: 8,
    color: '#555',
    },
});