import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Modal } from 'react-native';
import {
    useFonts,
    Lexend_100Thin,
    Lexend_200ExtraLight,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  } from '@expo-google-fonts/lexend';
import { useState } from 'react';

function Alert({showAlert, onUpdate, discardPost}) {

    let [fontsLoaded] = useFonts({
        Lexend_100Thin,
        Lexend_200ExtraLight,
        Lexend_300Light,
        Lexend_400Regular,
        Lexend_500Medium,
        Lexend_600SemiBold,
        Lexend_700Bold,
        Lexend_800ExtraBold,
        Lexend_900Black,
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return (
        <>
        {/* Alert Modal */}
            <Modal
            visible={showAlert}
            transparent>
            <View style={styles.centered}>
                <View style={styles.alert}>
                    <View style={styles.outerCont}>
                        <View style={styles.innerCont}>
                            <Text style={styles.title}>Discard Snaq?</Text>
                            <Text style={styles.desc}>Going back will lose all the photos you have taken.</Text>
                            <TouchableOpacity style={styles.upperButtons} onPress={() => {
                                discardPost();
                                onUpdate();
                            }}>
                                <Text style={styles.discardText}>Discard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.upperButtons}>
                                <Text style={styles.saveDraftText}>Save Draft</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => onUpdate()}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            </Modal>
        </>
    );
}

export default Alert;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    alert: {
        justifyContent: 'center',
        borderRadius: '10px',
        width: 240,
        height: 240,
        backgroundColor: 'white'
    }, 
    outerCont: {
        alignSelf: 'center',
        width: '80%',
        height: '80%',
    }, 
    innerCont: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    }, 
    title: {
        fontFamily: 'Lexend_700Bold',
        fontSize: '18px'
    }, 
    desc: {
        fontFamily: 'Lexend_400Regular',
        fontSize: '11px',
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
    },
    upperButtons: {
        justifyContent: 'center',
        borderRadius: '10px',
        backgroundColor: '#e8e8e8',
        width: 90,
        height: 28,
        shadowColor: '#171717',
        shadowOffset: {width: -1, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    discardText: {
        fontFamily: 'Lexend_400Regular',
        textAlign: 'center',
        fontSize: '11px',
        color: 'red'
    },
    saveDraftText: {
        fontFamily: 'Lexend_400Regular',
        textAlign: 'center',
        fontSize: '11px',
    },
    cancelButton: {
        justifyContent: 'center',
        width: 90,
        height: 28,
    },  
    cancelText: {
        textAlign: 'center',
        fontFamily: 'Lexend_400Regular',
        fontSize: '11px',
        color: '#a3a3a3'
    }
});
