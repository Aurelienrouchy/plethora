import { Asset } from "expo-asset";

export const cacheImagesAndBuild = async ({ items, nameImage = 'imageUrl', newNameImage = 'localUri' }) => {
    const images = items.reduce((acc, cur) => ([...acc, cur[nameImage]]) , []);
    const cachedImages = await Asset.loadAsync(images);

    return items.map((item, idx) => ({...item, [nameImage]: cachedImages[idx][newNameImage]}))
}