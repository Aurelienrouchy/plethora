import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { FlatList, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated';

import Ticket from '../components/Ticket';

import { useTicketStore } from '../utils/store';

const { width, height } = Dimensions.get('screen');
const WIDTH_RAFFLE = width / 1.8;

export default function Tickets() {
    const store = useTicketStore();
    const scrollIndex = useSharedValue(0);

    const handlerGesture = useAnimatedGestureHandler(
        {
            onEnd: ({translationX}) => {
                if (translationX > 50) {
                    if (scrollIndex.value === 0) {
                        return;
                    }
                    scrollIndex.value = scrollIndex.value - 1;
                }
                if (translationX < -50) {
                    if (scrollIndex.value === store?.tickets.length - 1) {
                        return;
                    }
                    scrollIndex.value = scrollIndex.value + 1;
                }
            },
        },
    );
    
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.title}>Tickets</Text>
            </View>
            <View >
                <PanGestureHandler  onGestureEvent={handlerGesture} >
                    <Animated.View style={styles.scrollview}>
                    {
                        store.tickets.map((tiket, index) => {
                            return (
                                <View style={[styles.items, {zIndex: store.tickets.length - index }]}>
                                    <Ticket
                                        key={tiket.id}
                                        scrollXIndex={scrollIndex}                                        
                                        index={index}
                                        ticket={tiket}
                                        nextExp={store.tickets[index + 1]?.scratchableBeforeUnlock || 0}
                                    />
                                </View>
                            )
                        })
                    }
                        {/* <FlatList
                            data={store.tickets}
                            keyExtractor={(_, index) => String(index)}
                            scrollEnabled={false}
                            horizontal
                            contentContainerStyle={{ flex: 1 }}
                            removeClippedSubviews={false}
                            CellRendererComponent={({
                                item,
                                index,
                                children,
                                style,
                                ...props
                              }) => {
                                const newStyle = [style, {zIndex: store.tickets.length - index }];
                                return (
                                  <View style={newStyle} index={index} {...props}>
                                    {children}
                                  </View>
                                );
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={[styles.items]}>
                                        <Ticket
                                            key={item.id}
                                            scrollXIndex={scrollIndex}                                        
                                            index={index}
                                            ticket={item}
                                            nextExp={store.tickets[index + 1]?.scratchableBeforeUnlock || 0}
                                        />
                                    </View>
                                )
                            }}
                        /> */}
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        height: width / 1.8,
        marginTop: 30,
        marginBottom: 7,
        width: width - 30,
    },
    scrollview: {
        position: 'relative',
        height: '100%',
    },
    header: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20
    },
    title: {
        // fontFamily: 'MontserratSM',
        fontSize: 24,
        color: '#000'
    },
    more: {
        // fontFamily: 'MontserratM',
        fontSize: 14,
        paddingBottom: 3,
        color: '#000'
    },
    items: {
        position: 'absolute',
        width: WIDTH_RAFFLE,
        height: WIDTH_RAFFLE
    }
});