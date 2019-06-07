import * as accountActionTypes from '../../actions/actionsTypes/authorizationActions';
import updateObject from './../../../shared/updateObject'
import {ninvoke} from "q";

const initialState = {
    token: null,
    userID: null,
    user: null,
    isOnline: false,
    isAutoSignIN:false,
    loading: false,
    loginError: null,
    registerError: null,
    registerSuccess: null,
};

const signINStarted = (state, action)=> {
    return updateObject(state,{loginError: null,loading: true,token:null,userID:null,isOnline:null});
};

function signINSuccess(state, action) {
    return updateObject(state,{isOnline: action.isOnline,token: action.token,userID: action.userID,isAutoSignIN: action.isAuto,loading: false, loginError: null,user: action.user});
}

function signINSFailed(state, action) {
    return updateObject(state, {loginError: action.loginError,isAutoSignIN: action.isAuto, loading: false})
}

const signUPStarted = (state, action)=>{
  return updateObject(state,{registerError: null,registerSuccess: null, loading:true});
};
const signUPFailed = (state, action)=>{
    return updateObject(state,{registerError: action.registerError, loading:false});
};
const signUPSuccess= (state, action)=>{
    return updateObject(state,{registerSuccess: action.registerSuccess, loading:false});
};

function logOut(state, action) {
    return updateObject(state, {token: null,userID:null,isOnline:null});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case accountActionTypes.SIGN_IN_STARTED: return signINStarted(state,action);
      case accountActionTypes.SIGN_IN_SUCCESS: return signINSuccess(state,action);
      case accountActionTypes.SIGN_IN_FAILED: return signINSFailed(state,action);
      case accountActionTypes.SIGN_UP_FAILED: return signUPFailed(state,action);
      case accountActionTypes.SIGN_UP_STARTED: return signUPStarted(state,action);
      case accountActionTypes.SIGN_UP_SUCCESS: return signUPSuccess(state,action);
      case accountActionTypes.LOG_OUT: return logOut(state,action);
      default: return state
  }
};
export default reducer;