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
    image: 'https://raw.githubusercontent.com/Aurelienrouchy/izy/master/assets/images/telererama2.png',
    translateX: new Animated.Value(100)
}];

export const raffles = [{
    id: 10,
    cost: 1,
    price: 0.1,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/herbe.png?raw=true',
    primaryBg: '#11301f',
    secondaryBg: '#56c289',
    translateY: new Animated.Value(100),
    opacity: new Animated.Value(0),
}, {
    id: 11,
    cost: 100,
    price: 0.5,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/femmepiscine.png?raw=true',
    primaryBg: '#193282',
    secondaryBg: '#1FBECA',
    translateY: new Animated.Value(100),
    opacity: new Animated.Value(0),
}, {
    id: 12,
    cost: 150,
    price: 1,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/piscine.png?raw=true',
    primaryBg: '#A32829',
    secondaryBg: '#FD6B35',
    translateY: new Animated.Value(100),
    opacity: new Animated.Value(0),
}, {
    id: 13,
    cost: 200,
    price: 2,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/piscine.png?raw=true',
    primaryBg: '#0082CC',
    secondaryBg: '#AE1558',
    translateY: new Animated.Value(100),
    opacity: new Animated.Value(0),
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