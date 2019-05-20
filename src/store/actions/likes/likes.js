import axios from './../../../axios/axios-likes'
import * as likesActionTypes from '../actionsTypes/Likes'


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
            response.data.likes.map(like => {
                if (likes[like.postID])

                else
                    likes[like.postID] = {userID: like.userID, type: like.type};
            });
            console.log(likes);
            dispatch(getLikesSuccess(likes));
        }).catch(error => {
            console.log(error);
        });
    };
};