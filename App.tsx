import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Router from './src/routes';
import { store } from './src/utils/store';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';

import { ApolloProvider } from '@apollo/client';
import { client } from './src/utils/graphql';
import { removeRewardListener, setupAds } from './src/utils/ads';
import { getTickets } from './src/utils/query';
import { setTickets } from './src/provider/tickets/tickets.action';
import { AdMobRewarded } from 'expo-ads-admob';

function cacheImages(images: any[]) {
	return images.map(image => {
		if (typeof image === 'string') {
			return Image.prefetch(image);
		} else {
			return Asset.fromModule(image).downloadAsync();
		}
	});
}

const images = [
	require('./assets/icons/menu-dots.png'),
	require('./assets/icons/tree.png'),
	require('./assets/icons/coin.png'),
	require('./assets/icons/croix.png'),
]

export default function App() {
	const [isReady, setIsReady] = useState(false);
	// const [loaded] = Font.useFonts(fonts);

	useEffect(() => {
		setupAds();
        AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', () => console.log('Rewarded'));
        AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => console.log('VideoLoaded'));
        AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', () => console.log('FailedToLoad'));
        AdMobRewarded.addEventListener('rewardedVideoDidOpen', () => console.log('Opened'));
        AdMobRewarded.addEventListener('rewardedVideoDidClose', () => console.log('Closed'));
        AdMobRewarded.addEventListener('rewardedVideoWillLeaveApplication', () => console.log('LeaveApp'));
        AdMobRewarded.addEventListener('rewardedVideoDidStart', () => console.log('Started'));
        return () => AdMobRewarded.removeAllListeners()
    }, [])

	const _loadAssetsAsync = async () => {
		
		const imageAssets: any = cacheImages(images);

		const tickets = await getTickets();

		setTickets(tickets)
		// await Font.loadAsync(fonts);
		await Promise.all([...imageAssets]);
	}

	if (!isReady) {
		return (
			<AppLoading
				startAsync={_loadAssetsAsync}
				onFinish={() => setIsReady(true)}
				onError={console.warn}
			/>
		);
	}
	
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Router/>
			</Provider>
		</ApolloProvider>
	);
}
