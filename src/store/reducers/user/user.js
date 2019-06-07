import * as userActionTypes from '../../actions/actionsTypes/userActions';
import updateObject from './../../../shared/updateObject'

const initState = {
    user: null,
    error: null,
    loading: true,
};

const getUserStarted = (state, action)=>{
    return updateObject(state, {user: null, error: null, loading: true});
};
const getUserFailed = (state, action)=>{
    return updateObject(state, {error: action.error, loading: false});
};
const getUserSuccess = (state, action)=>{
    return updateObject(state, {user: action.userData , loading: false});
};


const reducer = (state=initState, action)=>{
    switch (action.type) {
        case userActionTypes.GET_USER_STARTED: return getUserStarted(state,action);
        case userActionTypes.GET_USER_FAILED: return getUserFailed(state,action);
        case userActionTypes.GET_USER_SUCCESS: return getUserSuccess(state,action);
        default: return state;
    }
};

export default reducer;