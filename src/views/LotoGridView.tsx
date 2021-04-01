import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import LotoGrid from '../components/LotoGrid';
import { selectXNumberInArray } from '../utils/math';
import LotoButtons from '../components/LotoButtons';
import LotoInfos from '../components/LotoInfos';
import LotoTicketsHistory from '../components/LotoTicketsHistory';
import { participateLoto } from '../utils/loto';
import { useLotosStore, useTicketStore, useUserStore } from '../utils/store';
import { showMessage } from '../utils/message';
import LotoDisplayNumbers from '../components/LotoDisplayNumbers';
import LotoValidation from '../components/LotoValidation';
import Popup from '../components/Popup';
import { showAd } from '../utils/ads';

const { width, height } = Dimensions.get('screen');

interface ChooseNumbersLotoProps {
    route: any
}

const ChooseNumbersLoto = ({ route }: ChooseNumbersLotoProps) => {
    const { id } = route.params;
    const store = useLotosStore();
    const userStore = useUserStore();
    const ticketStore = useTicketStore();
    const loto = store.lotos.filter(lt => lt.id === id)[0];
    const navigation = useNavigation();
    
    const animation = useRef( new Animated.Value(0)).current;
    const titleStyle = {
        opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 0.7]})
    };

    useEffect(() => {
        Animated.sequence([
            Animated.delay(500),
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => animation.setValue(1))
    }, [])

    const [selectedClassic, setSelectedClassic] = useState([]);
    const [selectedComplementary, setSelectedComplementary] = useState([]);

    const onPress = (array, setter, number, max) => {
        if (array.includes(number)) {
            setter(array.filter(n => n !== number))
        } else {
            if (array.length < max) {
                setter([...array, number])
            }
        }
    }

    const random = () => {
        setSelectedClassic(selectXNumberInArray(loto.lotoNumbers, loto.maxNumbers));
        setSelectedComplementary(selectXNumberInArray(loto.lotoComplementary, loto.maxComplementary));
    }

    const validate = () => {
        if (selectedClassic.length < loto.maxNumbers || selectedComplementary.length < loto.maxComplementary) {
            showMessage(`You need ${loto.maxNumbers - selectedClassic.length} numbers & ${loto.maxComplementary - selectedComplementary.length} complementary numbers`)
            return
        }
        participateLoto({
            userId: userStore.id, 
            lotoId: loto.id,
            classic: selectedClassic,
            complementary: selectedComplementary
        })
    }

    const play = () => {
        if (!ticketStore.adsLoading) {
            showAd()
        }
    };

    return (
        <View style={styles.main}>
            <LotoValidation />
            <Popup style={styles.popup} isOpen={true}>
                <TouchableOpacity onPress={play}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </Popup>
            <Animated.View style={[styles.header]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="cover" style={styles.arrow} source={require('../../assets/icons/arrow.png')} />
                </TouchableOpacity>
                <View style={styles.title}>
                   <SharedElement style={[styles.imageContainer]} id={`loto.${loto.id}.image`}>
                        <Animated.Image resizeMode="cover" style={[styles.image]} source={{ uri: loto.imageUrl }} />
                    </SharedElement>
                    <Animated.View style={[styles.mask, titleStyle]}>
                        <Text style={styles.titleText}>{ loto.title }</Text>
                    </Animated.View>
                </View>
                <LotoInfos loto={loto} />
                <LotoTicketsHistory id={loto.id} />
            </Animated.View>
            <LotoDisplayNumbers classic={selectedClassic} complementary={selectedComplementary} loto={loto} />
            <View>
                <LotoGrid numbers={loto.lotoNumbers} onPress={number => onPress(selectedClassic, setSelectedClassic, number, loto.maxNumbers)} selected={selectedClassic}/>
                <LotoGrid numbers={loto.lotoComplementary} onPress={number => onPress(selectedComplementary, setSelectedComplementary, number, loto.maxComplementary)} selected={selectedComplementary} type="complementary" />
            </View>
            <LotoButtons onPressRandom={random} onPressValidate={validate} />
        </View>
        
    );
};

export default ChooseNumbersLoto;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingBottom: 40
    },
    header: {
        width: '100%',
        paddingHorizontal: 30,
    },
    arrow: {
        width: 30,
        height: 30
    },
    imageContainer: {
        width: '100%',
        height: height / 8,
    },
    mask: {
        ...StyleSheet.absoluteFillObject,
        top: 5,
        left: 5,
        width: width - 70,
        height: 105,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    numbers: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    number: {
        fontSize: 24
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    titleText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 36,
        color: '#000'
    },
    popup: {
        width: width - 60,
        height: 200,
        backgroundColor: '#fff',
        top: height / 2 - 100,
        left: 30,
        zIndex: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 15.46,
        elevation: 10,
    }
});