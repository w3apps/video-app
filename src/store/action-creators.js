import fetchJsonp from 'fetch-jsonp';
import 'whatwg-fetch';

const API_KEY = 'AIzaSyBSbxBuOc7rKjU-mahRSt94B38dsq9NGLQ';

export const actionTypes = {
    GET_AUTO_COMPLETE_SUGGESTIONS: 'GET_AUTO_COMPLETE_SUGGESTIONS',
};

export function getAutoCompleteSuggestions(searchText) {
    return {
        type: actionTypes.GET_AUTO_COMPLETE_SUGGESTIONS,
        payload: fetchJsonp(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchText}`).then((response) => {
            return response.json();
        }),
    };
}

export function searchVideos(searchText) {
    return {
        type: actionTypes.GET_AUTO_COMPLETE_SUGGESTIONS,
        payload: fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${searchText}&type=video+&videoDefinition=high&key=${API_KEY}`).then((response) => {
            return response.json();
        }),
    };
}
