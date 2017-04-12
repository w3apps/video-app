import update from 'react-addons-update';

import { actionTypes } from './action-creators';

const defaultState = {
    videos: [],
    autoCompleteSuggestions: [],
    searchedVideos: [],
    searchedVideosCategories: [],
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

            // add the statistic object to the video object
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
        case (`${actionTypes.GET_SEARCHED_VIDEOS_CATEGORIES}_FULFILLED`): {
            return update(state, {
                searchedVideosCategories: { $set: action.payload.items },
            });
        }
        default: {
            return state;
        }
    }
}