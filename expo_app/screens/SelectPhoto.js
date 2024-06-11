import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import BackArrow from '../assets/icons/back-arrow.svg';
import DownloadButton from '../assets/icons/download.svg';
import TrashCanButton from '../assets/icons/trashcan.svg';
import UploadButton from '../assets/icons/upload.svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Snaq from '../assets/snaq';

function SelectPhoto({ navigation }) {
    const isFocused = useIsFocused();
    const [posts, setPosts] = useState([]);

    const getData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const values = await AsyncStorage.multiGet(keys);

            if (values !== null) {
                const postObjs = values.map((val) => [val[0], JSON.parse(val[1])]);

                const validPostObjs = postObjs.filter(([key, post]) => post && post.date !== undefined);
                const sortedPostObjs = validPostObjs.sort((a, b) => {
                    const dateA = new Date(a[1].date).getTime();
                    const dateB = new Date(b[1].date).getTime();
                    return dateB - dateA; 
                });

                setPosts(sortedPostObjs);
            } else {
                throw new Error("ERROR: Cannot retrieve AsyncStorage data in Home.js");
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused]);

    const handleUpload = async () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
    
        try {
            const response = await new Promise((resolve, reject) => {
                launchImageLibrary(options, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                        resolve(null);
                    } else if (response.error) {
                        console.error('ImagePicker Error: ', response.error);
                        reject(response.error);
                    } else {
                        resolve(response);
                    }
                });
            });
    
            if (response) {
                const source = { uri: response.uri };
                console.log('Image URI: ', source.uri);
                // Here you can handle the selected image
            }
        } catch (error) {
            console.error('Error picking image: ', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Close Arrow Button */}

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <BackArrow style={{ fill: 'black' }} />
            </TouchableOpacity>



            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Location')}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>


            {/* Title and Subtitle at the top */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>New Post</Text>
                <Text style={[styles.subtitle, { marginTop: 10 }]}>Which photos do you want to Snaq?</Text>
            </View>

            {/* Bar */}
            <View style={styles.bar}>
                <View style={styles.barRight}>
                    <TouchableOpacity style={styles.iconButton} onPress={handleUpload}>
                        <UploadButton width={24} height={24} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.barButton} onPress={() => navigation.navigate('Home')}>
                    <Text>Save Draft</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.barButton}>
                    <Text>Tag Food</Text>
                </TouchableOpacity>
                <View style={styles.barRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <DownloadButton />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <TrashCanButton />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <ScrollView contentContainerStyle={styles.imageRow}>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Snaq
                            key={post[0]}
                            uuid={post[0]}
                            photos={post[1].photos}
                            name={post[1].name}
                            onPress={() => console.log(post[0])}
                        />
                    ))
                ) : (
                    <Text>No posts available</Text>
                )}
            </ScrollView> */}

            <StatusBar style="auto" />
        </View>
    );
}

export default SelectPhoto;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 35,
        left: 5,
        height: 40,
        width: 40,
    },
    nextButton: {
        position: 'absolute',
        top: 35,
        right: 5,
        height: 40,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#00aaff',
        fontSize: 20,
    },
    titleContainer: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: '15%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
    },
    barButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
    },
    barRight: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 10,
    },
    imageRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        padding: 20,
    },
});
