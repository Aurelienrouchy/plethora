import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { store, useLotosStore } from '../utils/store';

const { width, height } = Dimensions.get('screen');

interface HistoryProps {
    onPressRandom: any;
    onPressValidate: any
}

const History = ({ onPressRandom, onPressValidate}: HistoryProps) => {
    const store = useLotosStore();
    return (
        <View style={styles.main}>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'red'
    },
})

export default History