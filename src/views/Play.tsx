import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Image, Animated, Text } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import LottieView from 'lottie-react-native';
import CroixScratch from '../components/CroixScratch';
import ButtonPlay from '../components/ButtonPlay';
import { useTicketStore } from '../utils/store';
import { showAd } from '../utils/ads';
import Scratch from '../components/Scratch';
import { Tickets } from '../provider/tickets/tickets.types';
import { setIsReward, setRewardVisible } from '../provider/tickets/tickets.action';
import { addCoins, addExperiences } from '../provider/user/user.actions';
import { useTiming } from '../utils/hooks';
import { getScratchNumbers } from '../utils/mutation';
import { GET_SCRATCH_NUMBERS } from '../utils/schemaGraphQl';

const { width, height } = Dimensions.get('screen');

const Play = ({ route }) => {
    const ticket: Tickets = route.params.ticket;
    const store = useTicketStore();
    const isReward = store.isReward;
    
    const [isScratched, setIsScratched] = useState<boolean>(false);
    const [isScratchVisible, setIsScratchVisible] = useState<boolean>(false);
    const [coins, setCoins] = useState<number>(0);
    const [numbers, setNumbers] = useState<number[]>([]);
    const lottie = useRef<any>(null);
    
    const animation = useTiming(isScratched)
    const animationReward = useTiming(store.rewardIsVisible);
    const scratchStyle = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1]}),
        transform: [{
            translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-height, 0]})
        }]
    }
    const animatedRewardStyle = {
        opacity: animationReward.interpolate({ inputRange: [0, 1], outputRange: [0, 1]}),
        transform: [{
            translateY: animationReward.interpolate({ inputRange: [0, 1], outputRange: [-height, 0]})
        }]
    };

    const openTicket = () => {
        setIsScratched(true);
        setTimeout(() => setIsScratchVisible(true), 400)
    }
    const closeTicket = () => {
        setIsScratched(false);
        setTimeout(() => setIsScratchVisible(false), 400)
    }

    useEffect(() => {
        if (!store.adsIsVisible && store.isReward) {
            openTicket()
        }
    }, [store.adsIsVisible, store.isReward]);

    const play = () => {
        if (!store.adsLoading) {
            showAd()
        }
    };

    const [isLoadingTicketNumber, setIsLoadingTicketNumber] = useState(false);
 
    useEffect(() => {
        if (store.isReward) {
            const fetchData = async () => {
                setIsLoadingTicketNumber(true);
            
                const result = await getScratchNumbers(`${ticket.id}`)
                
                if(result) {
                    setCoins(result.coins);
                    setNumbers(result.numbers);
                }   
                
                setIsLoadingTicketNumber(false);
            };
            
            fetchData();
        }
        
    }, [store.isReward]);

    const onFinishScratch = () => {
        closeTicket()

        addCoins(coins);
        addExperiences(10);

        setRewardVisible(true);
        setIsReward(false);

        lottie.current.play();

        setTimeout(() => {
            lottie?.current?.reset();
            setRewardVisible(false);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.main}>
            {
                (isScratchVisible && !isLoadingTicketNumber) && 
                <Animated.View style={[scratchStyle, styles.scratch]} >
                    <Scratch data={numbers} ticket={ticket} onFinish={onFinishScratch}/>
                </Animated.View>
            }
                <Animated.View style={[animatedRewardStyle, styles.rewardIsVisible]} >
                    <LottieView
                        ref={lottie}
                        style={[styles.lottie]}
                        source={require('../../assets/icons/coins.json')}
                    />
                    <View style={styles.containerText}>
                        <Text style={styles.rewardTextCongrat}>Congrats!</Text>
                        <Text style={styles.rewardTextEarn}>you earned: </Text>
                        <View style={styles.containerCoins}>
                            <Text style={styles.rewardText}>{coins}</Text>
                            <Text style={styles.rewardTextEarn}> coins</Text>
                        </View>
                    </View>
                </Animated.View>
                <SharedElement id={`item.${ticket.id}.image`}>
                    <Image resizeMode="cover" style={styles.image} source={{uri: ticket.imageUrl }} />
                </SharedElement>
                <CroixScratch isScratchable={isScratched} />
                <ButtonPlay style={styles.buttonPlay} loading={store.adsLoading} onPress={play} isScratchable={isScratched}/>
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
    },
    rewardIsVisible: {
        ...StyleSheet.absoluteFillObject,
        top: height / 3,
        left: width / 2 / 2 - 35,
        width: width / 2 + 70,
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        zIndex: 1,
    },
    lottie: {
        width: width * 2,
    },
    containerText: {
        ...StyleSheet.absoluteFillObject,
        top: 20
    },
    containerCoins: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    rewardText: {
        textAlign: 'center',
        fontSize: 80,
        fontFamily: 'CocogooseRegular',
        color: '#ffca26',
    },
    rewardTextEarn: {
        textAlign: 'center',
        fontSize: 18,
        opacity: 0.5,
        fontFamily: 'CocogooseRegular',
    },
    rewardTextCongrat: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'CocogooseRegular',
    }
});