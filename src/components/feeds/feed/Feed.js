import React, {Component} from 'react';
import classes from './feed.module.scss';
import UserInfo from "../../user/userInfo/UserInfo";
import Controls from "./controls/Controls";

const Feed = props => {
    console.log(props.likedPost);
    return (
        <div className={classes.feed}>
            <UserInfo userName={props.userName} userSurname={props.userSurname} date={props.date}
                      avatarURL={props.avatarURL} middle/>
            <p>{props.content}</p>
            <Controls isLike={props.isLike} isDL={props.isDL} onDislikeClick={props.onDislikeClick}
                      onLikeClick={props.onLikeClick}
                      likes={props.likes} dislikes={props.dislikes} shows={props.shows}/>
        </div>
    );
};

export default Feed;
