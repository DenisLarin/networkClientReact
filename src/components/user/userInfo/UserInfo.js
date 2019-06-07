import React from 'react';
import classes from './userInfo.module.scss';
import Avatar from "../avatar/Avatar";

function UserInfo(props) {
    return (
        <div className={classes.userInfo}>
            <Avatar avatarURL={props.avatarURL} hunder={props.hunder} middle={props.middle}/>
            <div className={classes.userInfo__userDT}>
                <h1>{props.userName + " " + props.userSurname}</h1>
                {props.date ? <span>{new Date(props.date).toLocaleString().replace(',','')}</span> : null}
                {props.email ? <span>{props.email}</span>:null}
            </div>
        </div>
    );
}

export default UserInfo;