/**
 * Function used for writing to localStorage.
 * The passed data is serialised to be able to use it with localStorage.
 * @param key
 * @param data
 */
export function saveToStorage(key, data) {
    try {
        const serialisedVideos = JSON.stringify(data);
        localStorage.setItem(key, serialisedVideos);
    }
    catch (err) {
        // TODO handle error
    }
}

/**
 * Function used to fetch data from localStorage.
 * It expects that the fetched data is JSON compatible to be able to parse it.
 * @param key
 */
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