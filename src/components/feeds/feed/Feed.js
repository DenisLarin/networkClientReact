import React, {Component} from 'react';
import classes from './feed.module.scss';
import UserInfo from "../../user/userInfo/UserInfo";
import Controls from "./controls/Controls";

const Feed = props => {
    let isLike=false;
    let isDisLike=false;
    if (props.likedPost){
        props.likedPost.map(like=>{
            if (props.userID == like.userID){
                if (like.type == 'like')
                    isLike = true;
                else
                    isDisLike = true;
            }
        })
    }
    return (
        <div className={classes.feed}>
            <UserInfo userName={props.userName} userSurname={props.userSurname} date={props.date}
                      avatarURL={props.avatarURL} middle/>
            <p>{props.content}</p>
            <Controls isLike={isLike} isDL={isDisLike} onDislikeClick={props.onDislikeClick}
                      onLikeClick={props.onLikeClick}
                      likes={props.likes} dislikes={props.dislikes} shows={props.shows}/>
        </div>
    );
};

export default Feed;
