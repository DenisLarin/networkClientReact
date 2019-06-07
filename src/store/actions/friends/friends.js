import axios from './../../../axios/axios-friends'
import * as friendsActions from '../actionsTypes/friendsActions'


const getFriendsSuccess = (data) => {
    return {
        type: friendsActions.GET_FRIENDS_SUCCESS,
        data: data.user
    }

};

function getUserByFriendsIDs(response, config, dispatch) {
    const arr = response.data.usersIDs.map(id => {
        return id.userID;
    });
    axios.post('/getusers', {usersIDs: arr}, config).then(response => {
        dispatch(getFriendsSuccess(response.data));
    }).catch(error => {
        console.log(error);
    });
}

export const getFriends = (token, userID, status) => {
    return dispatch => {
        const data = {
            userID: userID,
            status: status
        };
        const config = {
            headers: {
                Authorization: token
            }
        };
        if (status == 'request')
            axios.post('/takeuserFriendsrequest', data, config).then(response => {
                if (!response.data.usersIDs) {
                    dispatch(getFriendsSuccess([]));
                    return;
                } else
                    getUserByFriendsIDs(response, config, dispatch);
            }).catch(error => {
                console.log(error);
            });
        if (status == 'response')
            axios.post('/takeuserFriendsresponse', data, config).then(response => {
                if (!response.data.usersIDs) {
                    dispatch(getFriendsSuccess([]));
                    return;
                } else
                    getUserByFriendsIDs(response, config, dispatch);
            }).catch(error => {
                console.log(error);
            });
        else if (status == 'accepted' || status == 'allFriend') {
            data.status = 'accepted';
            axios.post('/takeuserFriends', data, config).then(response => {
                getUserByFriendsIDs(response, config, dispatch);
            }).catch(error => {
                console.log(error);
            })
        }
    }

};

export const addToFriend = (token, userID) => {
    return dispatch => {
        const recipientUserID = userID;
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/sendfiendrequest', {recipientUserID}, config).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
};
const acceptsuccess = (userID)=>{
    return{
        type: friendsActions.ACCEPT_FRIEND_SUCCESS,
        userID
    }
};

export const acceptFriend = (token, userID) => {
    return dispath => {
        const requestUserID = userID;
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/acceptrequest',{requestUserID},config).then(response=>{
            dispath(acceptsuccess(userID));
        }).catch(error=>{
            console.log(error);
        })
    };
};
export const canceledFriend = (token, userID) => {
    return dispath => {
        const requestUserID = userID;
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/cancelrequest',{requestUserID},config).then(response=>{
            dispath(acceptsuccess(userID));
        }).catch(error=>{
            console.log(error);
        })
    };
};
export const removeFriend = (token, userID) => {
    return dispath => {
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/removeFriend',{userID},config).then(response=>{
            dispath(acceptsuccess(userID));
        }).catch(error=>{
            console.log(error);
        })
    };
};