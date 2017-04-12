import fetchJsonp from 'fetch-jsonp';
import 'whatwg-fetch';

import store from './store';

const API_KEY = 'AIzaSyBSbxBuOc7rKjU-mahRSt94B38dsq9NGLQ'; //TODO: remove the API key
const VIDEOS_COUNT_LIMIT = 20; // the number of returned videos from the search API

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

/**
 * Fetch the autoComplete suggestions based on the user input. It needs jsonp as CORS hears are not enabled.
 * This is an undocumented google API, it may stop working in the future.
 * This is an ASYNC action.
 * @param searchText
 */
export function getAutoCompleteSuggestions(searchText) {
    return {
        type: actionTypes.GET_AUTO_COMPLETE_SUGGESTIONS,
        payload: fetchJsonp(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchText}`).then((response) => {
            return response.json();
        }),
    };
}

/**
 * Fetch the videos based on a user input string.
 * This is an ASYNC action.
 * @param searchText
 */
export function searchVideos(searchText) {
    return {
        type: actionTypes.GET_SEARCHED_VIDEOS,
        payload: fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${VIDEOS_COUNT_LIMIT}&q=${searchText}&type=video+&videoDefinition=high&key=${API_KEY}`).then((response) => {
            return response.json();
        }).then((response) => {
            // trigger the getVideoStatistics as the search API doesn't provide the statistics for each video
            store.dispatch(getVideoStatistics(response));
            return response;
        })
    };
}

/**
 * Fetch Statistics for a list of videos. This is needed as the Search API doesn't provide the video statistics.
 * It uses a comma separated string of video ids to make the request.
 * This is an ASYNC action.
 * @param videos
 */
export function getVideoStatistics(videos) {

    // get the ids of all the videos
    const videoIdList = videos.items.map((video) => {
        return video.id.videoId;
    });

    // make a comma separated string with the ids
    const videoIdString = videoIdList.join(',');

    return {
        type: actionTypes.GET_SEARCHED_VIDEOS_STATISTICS,
        payload: fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIdString}&key=${API_KEY}`)
            .then((response) => {
                return response.json();
            }),
    };
}

/**
 * Fetch the available categories for a set a videos. This information is not available in the other API's so this has
 * to be a separate call.
 * It uses a comma separated string of video ids to make the request.
 * This is an ASYNC action.
 * @param videos
 */
export function getVideoCategories(videos) {

    // get the ids of all the video categories
    const categoryIdList = videos.map((video) => {
        return video.snippet.categoryId;
    });

    // make a comma separated string with the ids
    const categoryIdString = categoryIdList.join(',');

    return {
        type: actionTypes.GET_VIDEO_CATEGORIES,
        payload: fetch(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&id=${categoryIdString}&key=${API_KEY}`)
            .then((response) => {
                return response.json();
            }),
    };
}

/**
 * Changes the category filter.
 * This is a SYNC action.
 * @param categoryId
 */
export function applyCategoryFilter(categoryId) {
    return {
        type: actionTypes.APPLY_CATEGORY_FILTER,
        value: categoryId,
    };
}

/**
 * Used to change the year range filter.
 * This is a SYNC action.
 * @param yearRange
 */
export function applyYearFilter(yearRange) {
    return {
        type: actionTypes.APPLY_YEAR_FILTER,
        value: yearRange,
    };
}

/**
 * Save the video to favoriteVideos. It stores the whole video object to be able to view it when offline.
 * This is a SYNC action.
 * @param video
 */
export function saveVideoToFavorites(video) {
    return {
        type: actionTypes.SAVE_VIDEO_TO_FAVORITES,
        value: video,
    };
}

/**
 * Remove video from favoriteVideos.
 * This is a SYNC action.
 * @param video
 */
export function removeVideoFromFavorites(video) {
    return {
        type: actionTypes.REMOVE_VIDEO_FROM_FAVORITES,
        value: video,
    };
}