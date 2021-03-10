import { Animated } from 'react-native';

export const tickets = [{
    id: '1',
    title: 'Go space',
    pct: 12,
    piece: 1000,
    price: 0.1,
    image: 'https://raw.githubusercontent.com/Aurelienrouchy/izy/master/assets/images/SS13.png',
    translateX: new Animated.Value(100)
}, {
    id: '2',
    title: 'Catch me',
    pct: 12,
    piece: 1000,
    price: 10,
    image: 'https://raw.githubusercontent.com/Aurelienrouchy/izy/master/assets/images/ImitationGame.jpg',
    translateX: new Animated.Value(100)
}, {
    id: '3',
    title: 'Kill the road',
    pct: 12,
    piece: 1000,
    price: 100,
    image: 'https://raw.githubusercontent.com/Aurelienrouchy/izy/master/assets/images/WST_image1.png',
    translateX: new Animated.Value(100)
}, {
    id: '4',
    title: 'Rose line',
    pct: 12,
    piece: 1000,
    price: 1000,
    image: 'https://raw.githubusercontent.com/Aurelienrouchy/izy/master/assets/images/WST_image1.png',
    translateX: new Animated.Value(100)
}];

export const drawerRoutesCfg = [{
    name: 'Home',
    icon: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/casino.png?raw=true',
}, {
    name: 'History',
    icon: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/history.png?raw=true',
}, {
    name: 'Logout',
    icon: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/logout.png?raw=true',
}];

export const ecpm = 0.3;