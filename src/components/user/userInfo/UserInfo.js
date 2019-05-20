import React from 'react';
import classes from './userInfo.module.scss';
import Avatar from "../avatar/Avatar";

function UserInfo(props) {
    return (
        <div className={classes.userInfo}>
            <Avatar avatarURL={props.avatarURL} middle={props.middle}/>
            <div className={classes.userInfo__userDT}>
                <h1>{props.userName + " " + props.userSurname}</h1>
                <span>{new Date(props.date).toLocaleString().replace(',','')}</span>
            </div>
        </div>
    );
}

export default UserInfo;