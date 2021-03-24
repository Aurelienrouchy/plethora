import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image, Animated } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import CroixScratch from '../components/CroixScratch';
import PlayButton from '../components/PlayButton';
import { useTicketStore } from '../utils/store';
import { showAd } from '../utils/ads';
import Scratch from '../components/Scratch';
import { Tickets } from '../provider/tickets/tickets.types';
import { addCoins, addExperiences, setIsReward } from '../provider/tickets/tickets.action';
import { useTiming } from '../utils/hooks';

const { width, height } = Dimensions.get('screen');

const Play = ({ route }) => {
    const [isScratched, setIsScratched] = useState<boolean>(false);
    const [isScratchVisible, setIsScratchVisible] = useState<boolean>(false);
    const [data, setData] = useState<number[]>([12, 45, 29, 90, 0]);
    const ticket: Tickets = route.params.ticket
    const store = useTicketStore();
    const animation = useTiming(isScratched)
    const scratchStyle = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1]}),
        transform: [{
            translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-height, 0]})
        }]
    }

    useEffect(() => {
        if (!store.adsIsVisible && store.isReward) {
            // if (called) refetch();
            // else getTicket();
            setIsScratchVisible(true);
            setTimeout(() => setIsScratched(true), 400)
        }
    }, [store.adsIsVisible, store.isReward]);

    
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
        setIsScratched(false);
        setTimeout(() => setIsScratchVisible(false), 400)
        setIsReward(false);
        addCoins(10);
        addExperiences(10)

        // dispatchMain({type: 'UPADATE_COINS', coins})
        // showWinCoinModal();
    };

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                {
                    isScratchVisible && 
                    <Animated.View style={[scratchStyle, styles.scratch]} >
                        <Scratch data={data} ticket={ticket} onFinish={onFinishScratch}/>
                    </Animated.View>
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