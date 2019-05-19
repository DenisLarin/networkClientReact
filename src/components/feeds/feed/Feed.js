import React from 'react';
import classes from './feed.module.scss';
import UserInfo from "../../user/userInfo/UserInfo";
import Controls from "./controls/Controls";


function Feed(props) {
    return (
        <div className={classes.feed}>
            <UserInfo userName={props.userName} userSurname={props.userSurname} date={props.date}
                      avatarURL={props.avatarURL} middle/>
            <p>{props.content}</p>
            <Controls likes={props.likes} dislikes={props.dislikes} shows={props.shows}/>
        </div>
    );
}


export default Feed;