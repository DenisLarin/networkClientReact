import * as friendActions from '../../actions/actionsTypes/friendsActions';
import updateObject from './../../../shared/updateObject';


const initState = {
    friends: null,
    error: null,
    loading: true,
};

const getFriendsSuccess = (state, action) => {
    return updateObject(state, {friends: action.data, error: null, loading: false});
};
const acceptSuccess = (state, action) => {
    return updateObject(state, {friends: state.friends.filter(fr=>fr.userID!==action.userID)});
};
const reducer = (state = initState, action) => {
    switch (action.type) {
        case friendActions.GET_FRIENDS_SUCCESS:
            return getFriendsSuccess(state, action);
        case friendActions.ACCEPT_FRIEND_SUCCESS:
            return acceptSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;
