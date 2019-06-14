import * as feedActions from '../actionsTypes/feedsActions'
import axios from './../../../axios/axios-feeds';

const getFeedsStarted = () => {
    return {
        type: feedActions.GET_FEEDS_START
    }
};
const getFeedsFailed = (error) => {
    return {
        type: feedActions.GET_FEEDS_FAILED,
        error
    }
};
const getFeedsSuccess = (feeds) => {
    return {
        type: feedActions.GET_FEEDS_SUCCESS,
        feeds
    }
};
export const updateCounters = (feedID, type, params) => {
    return {
        type: feedActions.UPDATE_COUNTERS,
        payload: {feedID, type, params}
    }
};
export const getFeeds = (token, pageID) => {
    return dispatch => {
        dispatch(getFeedsStarted());
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/getPostsToPage', {"pageID": pageID}, config).then(response => {
            dispatch(getFeedsSuccess(response.data.feeds));
        }).catch(error => {
            console.log(error.response);
            dispatch(getFeedsFailed(error.response.data));
        });
    }
};

const addFeedStart = () => {
    return {
        type: feedActions.ADD_FEED_START
    }
};
const addFeedFailed = () => {
    return {
        type: feedActions.ADD_FEED_FAILED
    }
};
const addFeedSuccess = (newFeed) => {
    return {
        type: feedActions.ADD_FEED_SUCCESS
    }
};

export const addFeed = (token, pageID, feed) => {
    return dispatch => {
        dispatch(addFeedStart());
        /*"INSERT INTO posts SET `postContent`=NULL, `userID`=1,wherePageID='30'"*/
        const payload = {
            post: {
                postContent: feed,
                wherePageID: pageID
            }

        };
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/addpost', payload, config).then(result => {
            dispatch(getFeeds(token, pageID));
        }).catch(error => {
            console.log(error.response);
        })
    }
};

const successRemove = (feedID)=>{
    return {
        type: feedActions.REMOVE_FEED_SUCCESS,
        feedID,
    }
};
export const removeFeed = (token, feedID) => {
    return dispatch => {
        console.log(feedID);
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/removePost', {postID: feedID}, config).then(result => {
            dispatch(successRemove(feedID))
        }).catch(error => {
            console.log(error);
        });
    };
}