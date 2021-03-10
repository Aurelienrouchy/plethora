export const lotos = [{
    id: 9,
    cost: 1,
    price: 0.1,
    imageUrl: require('../../../assets/images/car.jpg'),
    timer: 86400,
    lotoNumbers: 20,
    lotoComplementary: 5,
    maxNumber: 5,
    maxComplementary: 2,
    title: 'Tesla',
    tickets: []
}, {
    id: 10,
    cost: 1,
    price: 0.1,
    imageUrl: require('../../../assets/images/car1.png'),
    timer: 86400,
    lotoNumbers: 20,
    lotoComplementary: 5,
    maxNumber: 5,
    maxComplementary: 2,
    title: 'Tesla',
    tickets: []
}, {
    id: 11,
    cost: 100,
    price: 0.5,
    imageUrl: require('../../../assets/images/car2.png'),
    timer: 10800,
    lotoNumbers: 20,
    lotoComplementary: 5,
    maxNumber: 5,
    maxComplementary: 2,
    title: 'Tesla',
    tickets: []
}, {
    id: 12,
    cost: 150,
    price: 1,
    imageUrl: require('../../../assets/images/car3.png'),
    timer: 3600,
    lotoNumbers: 20,
    lotoComplementary: 5,
    maxNumber: 5,
    maxComplementary: 2,
    title: 'Tesla',
    tickets: []
}, {
    id: 13,
    cost: 200,
    price: 2,
    imageUrl: require('../../../assets/images/car4.png'),
    timer: 60 * 5,
    lotoNumbers: 20,
    lotoComplementary: 5,
    maxNumber: 5,
    maxComplementary: 2,
    title: 'Tesla',
    tickets: []
}];

export const state = {
    loading: false,
    lotos
}