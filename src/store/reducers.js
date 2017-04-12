import update from 'react-addons-update';

import { actionTypes } from './action-creators';

const defaultState = {
    videos: [],
    autoCompleteSuggestions: [],
};

export default function products(state = defaultState, action = {}) {
    switch (action.type) {
        case (`${actionTypes.GET_AUTO_COMPLETE_SUGGESTIONS}_FULFILLED`): {
            console.log('niceeee', action.payload);
            return update(state, {
                autoCompleteSuggestions: { $set: action.payload[1] },
            });
        }
        default: {
            return state;
        }
    }
}