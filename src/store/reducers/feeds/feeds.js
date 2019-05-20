import updateObject from './../../../shared/updateObject'
import * as feedsActionTypes from './../../actions/actionsTypes/Feeds';

const initState = {
    error: false,
    loading: false,
    feeds: null,
};


const getFeedsStarted = (state, action) => {
    return updateObject(state, {feeds: null, error: null, loading: true});
};
const getFeedsFailed = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
};
const getFeedsSuccess = (state, action) => {
    return updateObject(state, {feeds: action.feeds, loading: false});
};
const reducer = (state = initState, action) => {
    switch (action.type) {
        case feedsActionTypes.GET_FEEDS_START:
            return getFeedsStarted(state, action);
        case feedsActionTypes.GET_FEEDS_FAILED:
            return getFeedsFailed(state, action);
        case feedsActionTypes.GET_FEEDS_SUCCESS:
            return getFeedsSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;