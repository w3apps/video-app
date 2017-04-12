import fetchJsonp from 'fetch-jsonp';
import 'whatwg-fetch';
import store from './store';

const API_KEY = 'AIzaSyBSbxBuOc7rKjU-mahRSt94B38dsq9NGLQ';

export const actionTypes = {
    GET_AUTO_COMPLETE_SUGGESTIONS: 'GET_AUTO_COMPLETE_SUGGESTIONS',
    GET_SEARCHED_VIDEOS: 'GET_SEARCHED_VIDEOS',
    GET_SEARCHED_VIDEOS_STATISTICS: 'GET_SEARCHED_VIDEOS_STATISTICS',
    GET_SEARCHED_VIDEOS_CATEGORIES: 'GET_SEARCHED_VIDEOS_CATEGORIES',
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
        type: actionTypes.GET_SEARCHED_VIDEOS,
        payload: fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchText}&type=video+&videoDefinition=high&key=${API_KEY}`).then((response) => {
            return response.json();
        }).then((response) => {
            store.dispatch(getVideoStatistics(response));
            return response;
        })
    };
}

export function getVideoStatistics(videos) {

    // get the id's of all the videos
    const videoIdList = videos.items.map((video) => {
        return video.id.videoId;
    });

    const videoIdString = videoIdList.join(',');

    return {
        type: actionTypes.GET_SEARCHED_VIDEOS_STATISTICS,
        payload: fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIdString}&key=${API_KEY}`).then((response) => {
            return response.json();
        }).then((response) => {
            store.dispatch(getVideoCategories(response));
            return response;
        })
    };
}

export function getVideoCategories(videos) {

    // get the id's of all the videos categories
    const categoryIdList = videos.items.map((video) => {
        console.log('cool', video);
        return video.snippet.categoryId;
    });

    const categoryIdString = categoryIdList.join(',');

    return {
        type: actionTypes.GET_SEARCHED_VIDEOS_CATEGORIES,
        payload: fetch(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&id=${categoryIdString}&key=${API_KEY}`).then((response) => {
            return response.json();
        }),
    };
}