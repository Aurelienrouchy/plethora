import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

interface LotoButtonsProps {
    onPressRandom: any;
    onPressValidate: any
}

const LotoButtons = ({ onPressRandom, onPressValidate}: LotoButtonsProps) => {
    return (
        <View style={styles.main}>
            <TouchableOpacity style={[styles.button, styles.buttonRandom]} onPress={onPressRandom}>
                <Image style={styles.icon} source={require('../../assets/icons/shuffle.png')} />
                <Text style={styles.text}>Random</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonValidate]} onPress={onPressValidate}>
                <Text style={styles.text}>Validate</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        marginTop: 30,
        flexDirection: 'row',
        height: 60,
        width: width - 60,
        borderRadius: 20,
        backgroundColor: '#fcd286',
        marginLeft: 30,
        // overflow: 'hidden',
    },
    button: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonRandom: {
        width: '36%',
    },
    buttonValidate: {
        width: '64%',
        backgroundColor: '#ffb632',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 2,
    },
    icon: {
        width: 26,
        height: 26,
        marginLeft: 2,
        marginRight: 10
    },
    text: {
        fontSize: 18
    }
})

export default LotoButtons