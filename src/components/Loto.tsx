import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { loto } from '../provider/lotos/lotos.types';
import { useUserStore } from '../utils/store';
import LotoInfos from './LotoInfos';

interface LotoProps {
    loto: loto;
}

const Loto = ({ loto }: LotoProps) => {
    const navigation = useNavigation();
    const store = useUserStore();
    const onClick = () => navigation.navigate('LotoGridView', { loto, id: loto.id });
    const isLocked = loto.cost > store.coins;

    return (
        <View style={[styles.main]}>
            <TouchableOpacity style={styles.touch} disabled={isLocked} onPress={ () => onClick() } >
                <SharedElement style={styles.imageContainer} id={`loto.${loto?.id}.image`}>
                    <Image resizeMode="cover" style={[styles.imageContainer, styles.image]} source={{ uri: loto.imageUrl }} />
                </SharedElement>
                <LotoInfos loto={loto} style={styles.infos}/>
                {
                    isLocked ? (
                        <View style={styles.locked}>
                            <Text style={styles.locked_text_number}>{loto.cost} </Text>
                            <Text style={styles.locked_text_coins}>coins</Text>
                            <Text style={styles.locked_text}> to unlock</Text>
                        </View>
                    ) : null
                }
            </TouchableOpacity>
        </View>
    );
};

Loto.sharedElements = route => {
    const { loto } = route.params;
    return [`loto.${loto.id}.image`];
}

export default Loto;

const styles = StyleSheet.create({
    main: {
        height: 180,
        width: '100%',        
        marginBottom: 20    ,
        borderRadius: 20,
        overflow: 'hidden',
    },
    touch: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    imageContainer: {
        width: '100%',
        height: 135,
        ...StyleSheet.absoluteFillObject,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        zIndex: 2
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    infos: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingBottom: 6,
        flexDirection: 'row',
        height: 75,
        borderRadius: 17,
        borderColor: 'rgba(232, 232, 232, 0.5)',
        borderWidth: 4
    },
    arrow: {
        width: 20,
        height: 20,
        marginBottom: 2
    },
    locked: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        opacity: 0.5,
        borderRadius: 20,
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locked_text_number: {
        fontSize: 33,
        color: '#f6aa1f',
        fontFamily: 'CocogooseRegular'
    },
    locked_text_coins: {
        fontSize: 23,
        color: '#f6aa1f',
        fontFamily: 'CocogooseRegular'
    },
    locked_text: {
        fontSize: 23,
        color: '#fff',
        fontFamily: 'CocogooseRegular'
    }
});