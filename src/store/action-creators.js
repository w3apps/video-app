import fetchJsonp from 'fetch-jsonp';
import 'whatwg-fetch';
import store from './store';

const API_KEY = 'AIzaSyBSbxBuOc7rKjU-mahRSt94B38dsq9NGLQ';
const VIDEOS_COUNT_LIMIT = 20;

export const actionTypes = {
    GET_AUTO_COMPLETE_SUGGESTIONS: 'GET_AUTO_COMPLETE_SUGGESTIONS',
    GET_SEARCHED_VIDEOS: 'GET_SEARCHED_VIDEOS',
    GET_SEARCHED_VIDEOS_STATISTICS: 'GET_SEARCHED_VIDEOS_STATISTICS',
    GET_VIDEO_CATEGORIES: 'GET_VIDEO_CATEGORIES',
    APPLY_CATEGORY_FILTER: 'APPLY_CATEGORY_FILTER',
    APPLY_YEAR_FILTER: 'APPLY_YEAR_FILTER',
    SAVE_VIDEO_TO_FAVORITES: 'SAVE_VIDEO_TO_FAVORITES',
    REMOVE_VIDEO_FROM_FAVORITES: 'REMOVE_VIDEO_FROM_FAVORITES',
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
        payload: fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${VIDEOS_COUNT_LIMIT}&q=${searchText}&type=video+&videoDefinition=high&key=${API_KEY}`).then((response) => {
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
        payload: fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIdString}&key=${API_KEY}`)
            .then((response) => {
                return response.json();
            }),
    };
}

export function getVideoCategories(videos) {

    // get the id's of all the videos categories
    const categoryIdList = videos.map((video) => {
        return video.snippet.categoryId;
    });

    const categoryIdString = categoryIdList.join(',');

    return {
        type: actionTypes.GET_VIDEO_CATEGORIES,
        payload: fetch(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&id=${categoryIdString}&key=${API_KEY}`)
            .then((response) => {
                return response.json();
            }),
    };
}

export function applyCategoryFilter(categoryId) {
    return {
        type: actionTypes.APPLY_CATEGORY_FILTER,
        value: categoryId,
    };
}

export function applyYearFilter(yearRange) {
    return {
        type: actionTypes.APPLY_YEAR_FILTER,
        value: yearRange,
    };
}

export function saveVideoToFavorites(video) {
    return {
        type: actionTypes.SAVE_VIDEO_TO_FAVORITES,
        value: video,
    };
}

export function removeVideoFromFavorites(video) {
    return {
        type: actionTypes.REMOVE_VIDEO_FROM_FAVORITES,
        value: video,
    };
}