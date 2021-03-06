import React, { useMemo } from 'react'
import { AdMobRewarded } from 'expo-ads-admob';
import { setAdsVisible, setAdsLoading, setScratchVisible, setIsReward } from '../provider/tickets/tickets.action';
import { store as ticketsStore } from './store';
import Toast from 'react-native-toast-message';
  
export const useReward = () => 
    useMemo(() => {
        const { tickets: store } = ticketsStore.getState();

        return {
            addRewardListeners: () => {
                AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => {
                    setAdsLoading(false);
                });
                AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', err => {
                    // dispatch({type: 'TOGGLE_ADS_LOADING', isLoading: true});
                    // throw Error('fgsrdht', err);
                });
                AdMobRewarded.addEventListener('rewardedVideoDidClose', () => {
                    if(store.isReward) {
                        setScratchVisible(true);
                    }
                    setAdsLoading(true);
                    setAdsVisible(false);
                    requestAd();
                });
                AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', () => {
                    setIsReward(true);
                });
                AdMobRewarded.addEventListener('rewardedVideoDidOpen', () => {
                    setAdsVisible(true);
                });
            },
            
            requestAd: async () => await AdMobRewarded.requestAdAsync().catch(error => console.warn(error)),
            isReady: async () => await AdMobRewarded.getIsReadyAsync()
        }
    },
    []
)

export const setupAds = async () => {
    // AdMobRewarded.setTestDeviceID('EMULATOR');
    await AdMobRewarded.setAdUnitID('ca-app-pub-1586751755244367/4792106533');
};

export const isReady = async () => await AdMobRewarded.getIsReadyAsync();

export const showAd = async () => {
    try {
        await AdMobRewarded.showAdAsync()
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: err.message
        })
    }
};

export const requestAd = async () => {
    try {
        setAdsLoading(true);
        await AdMobRewarded.requestAdAsync();
        setAdsLoading(false);
    } catch (err) {
        setAdsLoading(false)
        Toast.show({
            type: 'error',
            text1: 'Error server',
            text2: err.message
        })
    }
};

