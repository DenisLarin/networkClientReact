import axios from './../../../axios/axios-user'

import * as userActionTypes from '../actionsTypes/userActions'
import socketIOClient from 'socket.io-client';

const getUserStated = () => {
    return {
        type: userActionTypes.GET_USER_STARTED,
    }
};
const getUserFailed = (error) => {
    return {
        type: userActionTypes.GET_USER_FAILED,
        error
    }
};
const getUserSuccess = (userData) => {
    return {
        type: userActionTypes.GET_USER_SUCCESS,
        userData
    }
};
export const getUser = (token, userID) => {
    return dispatch => {
        dispatch(getUserStated());
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/getuser', {"userID": userID}, config)
            .then(response => {
                dispatch(getUserSuccess(response.data.user));
            }).catch(error => {
            dispatch(getUserFailed(error.response));
        });
    }
};
export const editUser = (token, updatedValues) => {
    return dispatch => {
        const config = {
            headers: {
                Authorization: token
            }
        };
        axios.post('/changeUser', {updatedValues},config).then(response=>{
           console.log(response.data);
        }).catch(error=>{
            console.log(error);
        });
    };
}