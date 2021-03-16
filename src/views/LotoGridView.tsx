import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, withDelay } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import LotoGrid from '../components/LotoGrid';
import { selectXNumberInArray } from '../utils/math';
import LotoButtons from '../components/LotoButtons';
import LotoInfos from '../components/LotoInfos';
import LotoTicketsHistory from '../components/LotoTicketsHistory';
import { participate } from '../utils/loto';
import { useLotosStore } from '../utils/store';
import { showError } from '../utils/errors';

const { width, height } = Dimensions.get('screen');

interface ChooseNumbersLotoProps {
    route: any
}

const ChooseNumbersLoto = ({ route }: ChooseNumbersLotoProps) => {
    const { id } = route.params;
    const store = useLotosStore();
    const loto = store.lotos.filter(lt => lt.id === id)[0];
    const navigation = useNavigation();
    
    const animation = useSharedValue<number>(0);
    const titleStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animation.value,
            [0, 1],
            [0, 0.7]
        )
    }));

    useEffect(() => {
        animation.value = withDelay(500, withTiming(1));
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
        setSelectedClassic(selectXNumberInArray(loto.lotoNumbers, loto.maxNumber));
        setSelectedComplementary(selectXNumberInArray(loto.lotoComplementary, loto.maxComplementary));
    }

    const validate = () => {
        if (selectedClassic.length < loto.maxNumber || selectedComplementary.length < loto.maxComplementary) {
            showError('You need 5 starts')
            return
        }
        participate(selectedClassic, loto.id)
    }

    return (
        <View style={styles.main}>
            <Animated.View style={[styles.header]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image resizeMode="cover" style={styles.arrow} source={require('../../assets/icons/arrow.png')} />
                </TouchableOpacity>
                <View style={styles.title}>
                   <SharedElement style={[styles.imageContainer]} id={`loto.${loto.id}.image`}>
                        <Animated.Image resizeMode="cover" style={[styles.image]} source={loto.imageUrl} />
                    </SharedElement>
                    <Animated.View style={[styles.mask, titleStyle]}>
                        <Text style={styles.titleText}>{ loto.title }</Text>
                    </Animated.View>
                </View>
                <LotoInfos loto={loto} />
                <LotoTicketsHistory id={loto.id} />
            </Animated.View>
            <View>
                <LotoGrid numbers={loto.lotoNumbers} onPress={number => onPress(selectedClassic, setSelectedClassic, number, loto.maxNumber)} selected={selectedClassic}/>
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
});