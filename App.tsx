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
import { setupAds } from './src/utils/ads';
import { getTickets } from './src/utils/query';
import { setTickets } from './src/provider/tickets/tickets.action';
import { useFonts } from 'expo-font';

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
];

const fonts = {
	CocogooseRegular: require('./assets/fonts/cocogoose_pro_regular.ttf'),
	CocogooseBold: require('./assets/fonts/cocogoose_pro_bold.ttf'),
	CocogooseDark: require('./assets/fonts/cocogoose_pro_dark.ttf'),
	CocogooseInline: require('./assets/fonts/cocogoose_pro_inline.ttf'),
	CocogooseOutline: require('./assets/fonts/cocogoose_pro_outlined.ttf'),
	CocogooseSemilight: require('./assets/fonts/cocogoose_pro_semilight.ttf'),
	CocogooseThin: require('./assets/fonts/cocogoose_pro_thin.ttf'),
	CocogooseUltraThin: require('./assets/fonts/cocogoose_pro_ultralight.ttf'),
}


export default function App() {
	const [isReady, setIsReady] = useState(false);
	const [loaded] = useFonts(fonts);

	setupAds();
	const _loadAssetsAsync = async () => {
		
		const imageAssets: any = cacheImages(images);
		
		const tickets = await getTickets();

		setTickets(tickets)
		// await Font.loadAsync(fonts);
		await Promise.all([...imageAssets]);
	}

	if (!isReady || !loaded) {
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
