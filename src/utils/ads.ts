import React from 'react'
import {
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { useStore } from 'react-redux';
import { setAdsVisible, setAdsLoading, setRewardVisible, setTicketVisible } from '../provider/tickets/tickets.action';
import { store as ticketsStore } from './store';
  
declare type EventNameType = 'rewardedVideoDidRewardUser' | 'rewardedVideoDidLoad' | 'rewardedVideoDidFailToLoad' | 'rewardedVideoDidOpen' | 'rewardedVideoDidStart' | 'rewardedVideoDidClose' | 'rewardedVideoWillLeaveApplication';

export const removeRewardListener = () => {
    const events: EventNameType[] = [
        'rewardedVideoDidRewardUser',
        'rewardedVideoDidLoad',
        'rewardedVideoDidFailToLoad',
        'rewardedVideoDidOpen',
        'rewardedVideoDidStart',
        'rewardedVideoDidClose',
        'rewardedVideoWillLeaveApplication'
    ]
    
    events.forEach(event => AdMobRewarded.removeEventListener(event, null));
}

export const addRewardListeners = () => {
    const { tickets: store } = ticketsStore.getState();

    AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => {
        setAdsLoading(false);
        setRewardVisible(false);
    });
    AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', err => {
        setAdsLoading(true);
        // throw Error('fgsrdht', err);
    });
    AdMobRewarded.addEventListener('rewardedVideoDidClose', () => {
        if(store.isReward) {
            setTicketVisible(true);
        }
        setAdsLoading(true);
        setAdsVisible(false);
        
        AdMobRewarded.requestAdAsync().catch(error => console.warn(error));
    });
    AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', () => {
        setAdsLoading(true);
        setRewardVisible(true);
    });
    AdMobRewarded.addEventListener('rewardedVideoDidOpen', () => {
        setAdsVisible(true);
        setTicketVisible(true);
    });
};

export const setupAds = async () => {
    await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
    await setTestDeviceIDAsync('EMULATOR');
};

export const isReady = async () => await AdMobRewarded.getIsReadyAsync();

export const showAd = async () => AdMobRewarded.showAdAsync().catch(error => console.warn(error));;

export const requestAd = async () => await AdMobRewarded.requestAdAsync().catch(error => console.warn(error));

