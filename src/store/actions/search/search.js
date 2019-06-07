import axios from './../../../axios/axios-search'
import * as searchActions from '../actionsTypes/searchActions'


const searchUsersSuccess = (users) =>{
    return {
        type: searchActions.SEARCH_USERS_SUCCESS,
        users
    };
};

export const searchUsers = (token, searchParams) => {
    return dispatch=>{
        const config = {
            headers: {
                Authorization: token
            }
        };
        let searchStr = "";
        for (let key in searchParams){

            searchStr = searchStr + key + "='" + searchParams[key] + "' and ";
        }
        searchStr = searchStr.slice(0,searchStr.length-5);
        axios.post('/users',{searchparams:searchStr},config).then(response=>{
            dispatch(searchUsersSuccess(response.data.users));
        }).catch(error=>{
            dispatch(searchUsersSuccess([]));
            console.log(error);
        })
    }

};