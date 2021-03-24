import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View, Animated } from 'react-native';
import { loto } from '../provider/lotos/lotos.types';
import Timer from './Timer';

interface LotoInfosProps {
    loto: loto;
    style?: any;
}

const LotoInfos = ({ loto, style }: LotoInfosProps) => {
    const open: any = new Animated.Value(1);

    return (
        <View style={[styles.main, style]}>
            <View style={styles.cost}>
                <Text style={styles.text}>{ loto?.cost }</Text>
                <Image style={styles.coinsIcon} source={require('../../assets/icons/coin.png')} />
            </View>
            <TouchableWithoutFeedback
                onPress={() => {
                    Animated.timing(
                        open,
                        { 
                            toValue: open._value === 1 ? 0 : 1,
                            duration: 300,
                            useNativeDriver: true
                        }).start(() => {
                            open.setValue(open._value === 1 ? 0 : 1)
                        }
                    )
                }}
            >   
                <View
                    style={styles.ticket}
                    pointerEvents="none"
                >
                        <Text style={styles.text}>{ loto?.tickets.length }</Text>
                        <Image style={styles.ticketIcon} source={require('../../assets/icons/ticket.png')} />

                </View>
            </TouchableWithoutFeedback>
            <Timer step={loto?.timer} />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20
    },
    cost: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    text: {
        fontSize: 22,        
    },
    coinsIcon: {
        width: 26,
        height: 26,
        marginLeft: 2,
        marginRight: 10
    },
    ticket: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    ticketIcon: {
        width: 22,
        height: 22,
        marginLeft: 4,
    },
})

export default LotoInfos