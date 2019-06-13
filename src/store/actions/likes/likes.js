import axios from './../../../axios/axios-likes'
import * as likesActionTypes from '../actionsTypes/likesActions'


const getLikesStated = () => {
    return {
        type: likesActionTypes.GET_LIKE_STARTED,
    }
};
const getLikesFailed = (error) => {
    return {
        type: likesActionTypes.GET_LIKE_FAILED,
        error
    }
};
const getLikesSuccess = (likes) => {
    return {
        type: likesActionTypes.GET_LIKE_SUCCESS,
        likes
    }
};

export const getLikes = (token, feeds) => {
    return dispatch => {
        dispatch(getLikesStated());
        const config = {
            headers: {
                Authorization: token
            }
        };
        const postIDs = [];
        feeds.map(feed => {
            postIDs.push(feed.postID);
        });

        axios.post('/getpostldl', {'postID': postIDs}, config).then(response => {
            let likes = {};
            if (response.data.likes)
                response.data.likes.map(like => {
                    let postID = like.postID;
                    if (likes[postID])
                        likes[postID].push({userID: like.userID, type: like.type});
                    else
                        likes[postID] = [{userID: like.userID, type: like.type}]
                });
            dispatch(getLikesSuccess(likes));
        }).catch(error => {
            console.log(error);
        });
    };
};

const likeDislikeStart = () => {
    return {
        type: likesActionTypes.LIKE_DISLIKE_STARTED
    }
};
const likeDislikeFailed = (error) => {
    return {
        type: likesActionTypes.LIKE_DISLIKE_FAILED,
        error
    }
};
const likeDislikeSuccess = (like) => {
    return {
        type: likesActionTypes.LIKE_DISLIKE_SUCCESS,
        like
    }
};

export const addLikeDislike = (token, like) => {
    return dispatch => {
        dispatch(likeDislikeStart());
        let url = '/addposttlike';
        if (like.type == 'dislike')
            url = '/addpostdislike';
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post(url, {postID: like.postID}, config).then(response => {
            dispatch(likeDislikeSuccess({userID: like.userID, type: like.type, feedID: like.postID}));
        }).catch(error => {
            console.log(error);
        })
    }
};
export const removeLikeDislike = (token, like) => {
    return dispatch => {
        dispatch(likeDislikeStart());
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/deletepostlike', {postID: like.postID}, config).then(response => {
            dispatch(likeDislikeSuccess({userID: like.userID, type: like.type, feedID: like.postID, remove: true}));
        }).catch(error => {
            console.log(error.response);
        });
    }
};
export const changeLikeDislike = (token, like) => {
    return dispatch => {
        dispatch(addLikeDislike(token, like));
    }
};

export const reupdateLikes = ()=>{
    return{
        type: likesActionTypes.REUPDATE_LIKES,
    }
};