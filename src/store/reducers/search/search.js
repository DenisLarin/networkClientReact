import * as searchActions from '../../actions/actionsTypes/searchActions';
import updateObject from './../../../shared/updateObject';


const initState={
    searchData: null,
    error: null,
    loading: true
};

const searchUsersSuccess = (state,action)=>{
    return updateObject(state, {searchData: action.users, error: null, loading: false});
};

const reducer = (state=initState, action)=>{
    switch (action.type) {
        case searchActions.SEARCH_USERS_SUCCESS:
            return searchUsersSuccess(state, action);
        default:
            return state;
    }
};
export default reducer;