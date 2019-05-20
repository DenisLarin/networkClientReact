import * as likesActionTypes from './../../actions/actionsTypes/Likes';
import updateObject from './../../../shared/updateObject'

const initState = {
    error: null,
    likes: null,
};

const getLikesSuccess = (state, action) => {
    return updateObject(state, {likes: action.likes});
};
const  getLikesStarted = (state, action)=>{
    if (state.getLikes)
        return state;
    return updateObject(state, {getLikes: true});
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case likesActionTypes.GET_LIKE_SUCCESS:
            return getLikesSuccess(state, action);
        case likesActionTypes.GET_LIKE_STARTED:
            return getLikesStarted(state, action);
        default:
            return state;
    }
};

export default reducer;