export function saveToStorage(videos) {
    try {
        const serialisedVideos = JSON.stringify(videos);
        localStorage.setItem('favoriteVideos', serialisedVideos);
    }
    catch (err) {
        // TODO handle error
    }
}

export function readFromStorage(key) {
    try {
        const serialisedVideos = localStorage.getItem(key);
        if (serialisedVideos === null) {
            return [];
        }
        return JSON.parse(serialisedVideos);
    }
    catch (err) {
        return [];
    }
}