import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Router from './src/routes';
import { store } from './src/utils/store';
import { Image, LogBox, Text, View } from 'react-native';
import { Asset } from 'expo-asset';

import { ApolloProvider } from '@apollo/client';
import client from './src/utils/clientGraphQl';
import { setupAds } from './src/utils/ads';
import { getTickets, getLotos } from './src/utils/query';
import { setTickets } from './src/provider/tickets/tickets.action';
import { useFonts } from 'expo-font';
import { setLotos } from './src/provider/lotos/lotos.actions';
import { showMessage } from './src/utils/message';
import { cacheImagesAndBuild } from './src/utils/images';

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

LogBox.ignoreLogs(['Remote debugger']);

export default function App() {
	const [isReady, setIsReady] = useState(false);
	const [loaded] = useFonts(fonts);
	
	setupAds();

	useEffect(() => {
		const init = async () => {
			
			const ticketsFormServer = await getTickets();
			const lotosFromServer = await getLotos();

			if (!ticketsFormServer || !lotosFromServer) {
				showMessage("Error server")
				return
			}

			setTickets(await cacheImagesAndBuild({ items: ticketsFormServer}))
			setLotos(await cacheImagesAndBuild({ items: lotosFromServer }));

			setIsReady(true)
		}
		init();
	}, [])

	if (!isReady || !loaded) {
		return (
			<View>
				<Text>Prout</Text>
				<Text>Prout</Text>
				<Text>Prout</Text>
				<Text>Prout</Text>
				<Text>Prout</Text>
				<Text>Prout</Text>
				<Text>Prout</Text>
				<Text>Prout</Text>
			</View>
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
