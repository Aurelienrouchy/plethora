import React, { useState } from 'react';
import { Provider } from 'react-redux';
import Router from './src/routes';
import { store } from './src/utils/store';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';

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

	const _loadAssetsAsync = async () => {
		const imageAssets: any = cacheImages(images);
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
		<Provider store={store}>
			<Router/>
		</Provider>
	);
}
