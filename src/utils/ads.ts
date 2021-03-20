import React, { useMemo } from 'react'
import {
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
import { setAdsVisible, setAdsLoading, setScratchVisible, setIsReward } from '../provider/tickets/tickets.action';
import { store as ticketsStore } from './store';
import { showError } from './errors';
  
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

export const setupAds = async () => {
    await AdMobRewarded.setAdUnitID('ca-app-pub-1586751755244367/3248128330');
};

export const isReady = async () => await AdMobRewarded.getIsReadyAsync();

export const showAd = async () => {
    try {
        await AdMobRewarded.showAdAsync()
    } catch (err) {
        showError(err.message)
    }
};

export const requestAd = async () => {
    try {
        setAdsLoading(true);
        await AdMobRewarded.requestAdAsync();
        setAdsLoading(false);
    } catch (err) {
        setAdsLoading(false)
        showError(err.message)
    }
};

