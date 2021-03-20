import React, {
    useContext, useState, useEffect, useMemo,
} from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, Button
} from 'react-native';
import { AdMobRewarded } from 'expo-ads-admob'
import { SharedElement } from 'react-navigation-shared-element';
// import { useLazyQuery } from '@apollo/react-hooks';
// import { useTimingTransition } from 'react-native-redash';

// import { useRewardContext } from '../hooks/use-reward';
// import { Context } from '../hooks/use-context';
// import { GET_TICKET } from '../graphql/queries'

// import Scratch from '../components/Scratch/index.js';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import CroixScratch from '../components/CroixScratch';
import PlayButton from '../components/PlayButton';
import { useTicketStore } from '../utils/store';
import { isReady, requestAd, showAd } from '../utils/ads';
import Scratch from '../components/Scratch';
import { showError } from '../utils/errors';
import { Tickets } from '../provider/tickets/tickets.types';
import { setScratchVisible } from '../provider/tickets/tickets.action';

const { width, height } = Dimensions.get('screen');

const Play = ({ route }) => {
    const [isScratched, setIsScratched] = useState<boolean>(false);
    const ticket: Tickets = route.params.ticket
    const store = useTicketStore();

    useEffect(() => {
        const getIsReady = async () => {
            try {
                const adsIsReady = await isReady();

                if (!adsIsReady) {
                    await requestAd();
                }
            } catch (error) {
                showError('Ads loading problem')
            }
        }
        getIsReady();
    }, []);

    
    // const [getTicket, { called, loading, data, refetch }] = useLazyQuery(GET_TICKET);
    // const { dispatch: dispatchMain, state: MainState } = useContext(Context); 
    // useEffect(() => {
    //     if (!rewardState.isAdsVisible && rewardState.isReward) {
    //         if (called) refetch();
    //         else getTicket();
    //         setIsScratched(true);
    //     }
    // }, [rewardState.isAdsVisible, rewardState.isReward])

    //
    // const showWinCoinModal = () => {
    //     setIsModalVisible(true);
    //     setTimeout(() => setIsModalVisible(false), 3000);
    // };

    const play = () => {
        if (!store.adsLoading) {
            showAd()
        }
    };

    const onFinishScratch = (coins) => {
        setScratchVisible(false);
        // setCoins(coins);
        // dispatchMain({type: 'UPADATE_COINS', coins})
        // showWinCoinModal();
    };

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                {
                    store.scratchIsVisible ? (
                        <Animated.View style={styles.scratch} >
                            <Scratch ticket={ticket} onFinish={onFinishScratch}/>
                        </Animated.View>
                    ) : null
                }
                <SharedElement id={`item.${ticket.id}.image`}>
                    <Image resizeMode="cover" style={styles.image} source={{uri: ticket.image}} />
                </SharedElement>
                <CroixScratch isScratchable={isScratched} />
                <PlayButton style={styles.buttonPlay} loading={store.adsLoading} onPress={play} isScratchable={isScratched}/>
            </View>
        </View>
    );
};

Play.sharedElements = (route, otherRoute, showing) => {
    const { ticket } = route.params;
    return [`item.${ticket.id}.image`];
}

export default Play;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
    },
    image: {
        width,
        height
    },
    buttonPlay: {
        ...StyleSheet.absoluteFillObject,
        top: height / 3 * 2,
        width: '100%',
        alignItems: 'center'
    },
    textPlay: {
        fontSize: 36,
        fontFamily: 'MontserratM'
    },
    loader: {
        width: 60,
        height: 60
    },
    winCointainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        justifyContent: 'flex-end',
        paddingBottom: 40,
        top: -250,
        left: width / 2 - 125,
        width: 250,
        height: 200,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    coinsText: {
        ...StyleSheet.absoluteFillObject,
        top: -80,
        left: 72.5,
        width: 100,
        height: 67,
        fontSize: 40,
        backgroundColor: '#ffca26',
        textAlign: 'center',
        paddingVertical: 5,
    },
    winText: {
        fontSize: 40
    },
    winImage: {
        ...StyleSheet.absoluteFillObject,
        top: -150,
        left: 100 - 104,
        width: 250,
        height: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.58,
        shadowRadius: 6.00,
    },
    scratch: {
        ...StyleSheet.absoluteFillObject,
        width,
        height,
        zIndex: 1,
    }
});