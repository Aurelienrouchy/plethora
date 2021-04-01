import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { loto } from '../provider/lotos/lotos.types';
import { useLotosStore } from '../utils/store';

const { width, height } = Dimensions.get('screen');

interface LotoDisplayNumbersProps {
    complementary: number[];
    classic: number[];
    loto: loto
}

const LotoDisplayNumbers = ({ classic, complementary, loto }: LotoDisplayNumbersProps) => {
    const numberClassic = loto.maxNumbers;
    const numberComplementary = loto.maxComplementary;

    return (
        <View style={styles.main}>
            {
                Array(numberClassic).fill(0).map((_, index) => (
                    <View key={index} style={styles.box}><Text style={styles.text}>{classic[index]}</Text></View>
                ))
            }
            <Text style={styles.text}>|</Text>
            {
                Array(numberComplementary).fill(0).map((_, index) => (
                    <View key={index} style={styles.box}><Text style={styles.text}>{complementary[index]}</Text></View>
                ))
            }
        </View>
        
    );
};

export default LotoDisplayNumbers;

const styles = StyleSheet.create({
    main: {
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 30,
        justifyContent: 'space-between',
    },
    box: {
        width: 40,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#fcd286'
    },
    text: {
        textAlign: 'center',
        paddingTop: 14,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'CocogooseRegular',
        fontSize: 18,
    }
});