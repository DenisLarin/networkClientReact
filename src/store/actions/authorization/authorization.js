import axios from './../../../axios/axios-account'

import * as accountActionTypes from '../actionsTypes/Authorization';
import socketIOCLient from 'socket.io-client';


const signINStarted = () => {
    return {
        type: accountActionTypes.SIGN_IN_STARTED,
    };
};

const signINSuccess = (token, userID,loginedUser, isOnline = false, isAuto = false,) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
    return {
        type: accountActionTypes.SIGN_IN_SUCCESS,
        token: token,
        userID: userID,
        isAuto,
        isOnline,
        user: loginedUser
    };
};
const signINSFailed = (error, isAuto = false) => {
    return {
        type: accountActionTypes.SIGN_IN_FAILED,
        loginError: error,
        isAuto
    };
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    return {
        type: accountActionTypes.LOG_OUT
    }
};


export const singIN = (email, password) => {
    return dispatch => {
        dispatch(signINStarted());
        const data = {
            user: {
                email: email,
                password: password,
            }
        };
        axios.post('/signin', data)
            .then(response => {
                const socket = socketIOCLient('localhost:3000');
                socket.emit('SINGIN', response.data.token);
                socket.on('SINGIN', isOnline => {
                    dispatch(signINSuccess(response.data.token, response.data.userID,response.data.user,isOnline));
                });
            }).catch(err => {
            if (err.response)
                dispatch(signINSFailed(err.response.data.error));
            else
                dispatch(signINSFailed(err.response))
        });
    };
};

const signUPStarted = () => {
    return {
        type: accountActionTypes.SIGN_UP_STARTED
    };
}

const signUPSuccess = (status) => {
    return {
        type: accountActionTypes.SIGN_UP_SUCCESS,
        registerSuccess: status
    };
}

const signUPFailed = (error) => {
    console.log(error);
    return {
        type: accountActionTypes.SIGN_UP_FAILED,
        registerError: error
    };
};

export const signUP = (name, surname, email, password, birthday, gender) => {
    return dispatch => {
        dispatch(signUPStarted());
        const data = {
            user: {
                name,
                surname,
                email,
                password,
                gender,
                birthday
            }
        };
        axios.post('/signup', data)
            .then(response => {
                dispatch(signUPSuccess(response.data.status));
            }).catch(err => {
            dispatch(signUPFailed(err.response.data.error))
        })
    };
};
export const authCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token)
            dispatch(logOut());
        const config = {
            headers: {
                'Authorization': token
            }
        };
        axios.post('/checktoken', null, config)
            .then(response => {
                dispatch(signINSuccess(token, response.data.userID,response.data.user, true));
            }).catch(err => {
            if (err.response)
                dispatch(signINSFailed(err.response.data, true));
            else
                dispatch(signINSFailed(err.response, true))
        })
    };
};