import * as likesActionTypes from './../../actions/actionsTypes/Likes';
import updateObject from './../../../shared/updateObject'

const initState = {
    error: null,
    likes: null,
};

const getLikesSuccess = (state, action) => {
    return updateObject(state, {likes: action.likes});
};
const getLikesStarted = (state, action) => {
    if (state.getLikes)
        return state;
    return updateObject(state, {getLikes: true});
};

const likeDislikeSuccess = (state, action) => {
    const like = {userID: action.like.userID, type: action.like.type};
    const postLikes = state.likes[action.like.feedID];
    let isGO = false;
    for (let key in postLikes) {
        if (postLikes[key].userID == like.userID && !action.like.remove) {
            isGO = true;
            postLikes[key] = like;
            break;
        } else {
            isGO = true;
            postLikes.splice(key, 1);
            break;
        }
    }
    if (!isGO) {
        state.likes[action.like.feedID] = [like]
    }
    const updated = {
        ...state.likes
    };
    return updateObject(state, {likes: updated});
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case likesActionTypes.GET_LIKE_SUCCESS:
            return getLikesSuccess(state, action);
        case likesActionTypes.GET_LIKE_STARTED:
            return getLikesStarted(state, action);
        case likesActionTypes.LIKE_DISLIKE_SUCCESS:
            return likeDislikeSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;