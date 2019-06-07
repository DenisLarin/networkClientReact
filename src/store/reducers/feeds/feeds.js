import updateObject from './../../../shared/updateObject'
import * as feedsActionTypes from '../../actions/actionsTypes/feedsActions';

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
const updateCounters = (state, action) => {
    const payload = action.payload;
    payload.type= payload.type+'s';
    let feed = null;
    for (let i in state.feeds) {
        if (state.feeds[i].postID == payload.feedID) {
            feed = state.feeds[i];
            break;
        }
    }
    switch (payload.params) {
        case 'change':
            feed[payload.type] = feed[payload.type] + 1;
            if (payload.type == 'likes') {
                feed.dislikes = feed.dislikes - 1;
            } else {
                feed.likes = feed.likes - 1;
            }
            break;
        case 'remove':
            feed[payload.type] = feed[payload.type] -1;
            break;
        case 'add':
            feed[payload.type] = feed[payload.type] + 1;
            break;
    }
    return state;
};
const reducer = (state = initState, action) => {
    switch (action.type) {
        case feedsActionTypes.GET_FEEDS_START:
            return getFeedsStarted(state, action);
        case feedsActionTypes.GET_FEEDS_FAILED:
            return getFeedsFailed(state, action);
        case feedsActionTypes.GET_FEEDS_SUCCESS:
            return getFeedsSuccess(state, action);
        case feedsActionTypes.UPDATE_COUNTERS:
            return updateCounters(state, action);
        default:
            return state;
    }
};

export default reducer;