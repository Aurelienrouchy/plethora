import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated } from 'react-native';
import { State, PanGestureHandler } from 'react-native-gesture-handler';

import Ticket from '../components/Ticket';

import { useTicketStore } from '../utils/store';

const { width, height } = Dimensions.get('screen');
const WIDTH_RAFFLE = width / 1.8;

const Tickets = () => {
    const store = useTicketStore();
    const scrollIndex: any = new Animated.Value(0);
    const [tickets, setTickets] = useState([])

    const handleStateChange =  ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX > 50) {
                if (scrollIndex._value === 0) {
                    return;
                }
                scrollIndex.setValue(scrollIndex._value - 1);
            }
            if (nativeEvent.translationX < -50) {
                if (scrollIndex._value === store?.tickets.length - 1) {
                    return;
                }
                scrollIndex.setValue(scrollIndex._value + 1);
            }
        }
    };

    useLayoutEffect(() => {
        setTickets(store.tickets)
    }, [])

    return (
        <View style={styles.main}>
            <Text style={styles.title}>Scratch To Win Coins</Text>
            <Text style={styles.subtitle}>Collect coins to enter lottery draws!</Text>
            <PanGestureHandler onHandlerStateChange={handleStateChange}>
                <View style={styles.scrollview}>
                {
                    tickets.map((ticket, index) => {
                        return (
                            <Ticket
                                key={ticket.id}
                                scrollXIndex={scrollIndex}                                        
                                index={index}
                                ticket={ticket}
                                nextExp={store.tickets[index + 1]?.scratchableBeforeUnlock || 0}
                            />
                        )
                    })
                }
                </View>
            </PanGestureHandler>
        </View>
    );
};

export default memo(Tickets)

const styles = StyleSheet.create({
    main: {
        height: width / 1.8 + 110,
        width: width - 30,
    },
    scrollview: {
        position: 'relative',
        height: width / 1.8,
        width: '100%',
    },
    header: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20
    },
    title: {
        fontFamily: 'CocogooseRegular',
        fontSize: 24,
        color: '#303030',
        marginTop: 30,
        marginBottom: 5
    },
    subtitle: {
        fontFamily: 'CocogooseSemilight',
        fontSize: 14,
        color: '#949494',
        marginBottom: 20
    },
});