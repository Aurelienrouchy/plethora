import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import LotoNumber from './LotoNumber';

const { width, height } = Dimensions.get('screen');

interface LotoGridProps {
    numbers: number;
    onPress: any;
    selected: any;
    type?: 'complementary'
}

const LotoGrid = ({ numbers, selected, onPress, type }: LotoGridProps) => {
    const loto = Array(numbers).fill(0);

    return (
        <View style={styles.main}>
            {
                loto.map((n, index) => <LotoNumber key={index} isSelected={selected.includes(index + 1)} number={index + 1} onPress={() => onPress(index + 1)} />)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 30,
        justifyContent: 'center',
        marginTop: 20,
    }
})

export default LotoGrid;