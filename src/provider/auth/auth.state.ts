export const tickets = [{
    id: 0,
    level: 1,
    minCoins: 5,
    maxCoins: 10,
    locked: false,
    scratchBeforeUnlock: 0,
    image: 'https://www.malikafavre.com/uploads/project_thumbnails/SIF_5.png'
}, {
    id: 1,
    level: 2,
    minCoins: 10,
    maxCoins: 20,
    locked: true,
    scratchBeforeUnlock: 30,
    image: 'https://www.malikafavre.com/uploads/project_thumbnails/Margiela_thumb1-mtime1522710444.png'
}, {
    id: 2,
    level: 3,
    minCoins: 15,
    maxCoins: 25,
    locked: true,
    scratchBeforeUnlock: 50,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/SS13.png?raw=true'
}, {
    id: 3,
    level: 4,
    minCoins: 20,
    maxCoins: 30,
    locked: true,
    scratchBeforeUnlock: 70,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/WST_image1.png?raw=true'
}, {
    id: 4,
    level: 5,
    minCoins: 25,
    maxCoins: 35,
    locked: true,
    scratchBeforeUnlock: 100,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/femmepiscine.png?raw=true'
}, {
    id: 5,
    level: 6,
    minCoins: 30,
    maxCoins: 40,
    locked: true,
    scratchBeforeUnlock: 150,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/herbe.png?raw=true'
}, {
    id: 6,
    level: 7,
    minCoins: 35,
    maxCoins: 45,
    locked: true,
    scratchBeforeUnlock: 200,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/piscine.png?raw=true'
}, {
    id: 7,
    level: 8,
    minCoins: 40,
    maxCoins: 50,
    locked: true,
    scratchBeforeUnlock: 300,
    image: 'https://github.com/Aurelienrouchy/izy/blob/master/assets/images/plage.png?raw=true'
}, {
    id: 8,
    level: 9,
    minCoins: 45,
    maxCoins: 55,
    locked: true,
    scratchBeforeUnlock: 500,
    image: 'https://www.malikafavre.com/uploads/project_thumbnails/resist_thumb1-mtime1498553014.png'
}, {
    id: 9,
    level: 10,
    minCoins: 50,
    maxCoins: 60,
    locked: true,
    scratchBeforeUnlock: 1000,
    image: 'https://www.malikafavre.com/uploads/project_thumbnails/pageturner_thumb-mtime1465225529.png'
}]

const user = {
    token: undefined,
	lastname: undefined,
    firstName: undefined,
    photoUrl: undefined,
    email: undefined,
    provider: undefined,
    coins: 0,
    trees: 0,
    tickets
}

export const state = {
    isLogin: false,
    user
};

