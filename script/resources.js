class ResourcesLoader {
    loadImgAsset(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject;
            img.src = src;
        })
    };

    loadAudioAsset(src) {
        return new Promise((resolve) => {
            const sound = new Audio(src);
            resolve(sound);
        })
    };
}

export default ResourcesLoader;