import update from 'react-addons-update';

import { readFromStorage } from '../utils/storage';
import { actionTypes } from './action-creators';

const defaultState = {
    videos: [],
    autoCompleteSuggestions: [],
    searchedVideos: [],
    videosCategories: [],
    filters: {
        categoryId: 0, // TODO: make sure there is no category with ID = 0
        startYear: null,
        endYear: null
    },
    favoriteVideos: readFromStorage('favoriteVideos'), // hydrate the store with localStorage data (if any)
};

export default function products(state = defaultState, action = {}) {
    switch (action.type) {
        case (`${actionTypes.GET_AUTO_COMPLETE_SUGGESTIONS}_FULFILLED`): {
            return update(state, {
                autoCompleteSuggestions: { $set: action.payload[1] },
            });
        }
        case (`${actionTypes.GET_SEARCHED_VIDEOS}_FULFILLED`): {
            return update(state, {
                searchedVideos: { $set: action.payload.items },
            });
        }
        case (`${actionTypes.GET_SEARCHED_VIDEOS_STATISTICS}_FULFILLED`): {

            // add the statistic and snippet objects to the video object
            const newSearchedVideos = state.searchedVideos.map((video, i) => {
                return Object.assign(video,
                    {
                        statistics: action.payload.items[i].statistics,
                        snippet: action.payload.items[i].snippet,
                    }
                );
            });

            return update(state, {
                searchedVideos: { $set: newSearchedVideos },
            });
        }
        case (`${actionTypes.GET_VIDEO_CATEGORIES}_FULFILLED`): {
            return update(state, {
                videosCategories: { $set: action.payload.items },
            });
        }
        case (actionTypes.APPLY_CATEGORY_FILTER): {
            return update(state, {
                filters: { categoryId: {$set: action.value } },
            });
        }
        case (actionTypes.APPLY_YEAR_FILTER): {
            return update(state, {
                filters: {
                    startYear: {$set: action.value.startYear },
                    endYear: {$set: action.value.endYear },
                },
            });
        }
        case (actionTypes.SAVE_VIDEO_TO_FAVORITES): {
            return update(state, { favoriteVideos: { $push: [action.value] }});
        }
        case (actionTypes.REMOVE_VIDEO_FROM_FAVORITES): {
            const newFavoriteVideos = [];
            // add all the videos to the new array, except for the one being removed
            state.favoriteVideos.forEach((video) => {
                if (video.id.videoId !== action.value.id.videoId) {
                    newFavoriteVideos.push(video);
                }
            });
            return update(state, { favoriteVideos: { $set: newFavoriteVideos }});
        }
        default: {
            return state;
        }
    }
}
