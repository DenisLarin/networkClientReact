import React from 'react';
import classes from './feedSendField.module.scss'
import Avatar from "../../user/avatar/Avatar";
import WriteNewFeedInput from "./writeNewFeedInput/WriteNewFeedInput";
import SendIcon from "../../ui/sendIcon/sendIcon";

function FeedSendField(props) {
    return (
        <div className={classes.send}>
            <Avatar avatarURL={props.avatarURL} smaller/>
            <WriteNewFeedInput onChange={props.onChange} value={props.value} placeholder={"Напиши что-то пользователю " + props.userName} onKeyPress={props.onClick}/>
            <SendIcon img={props.sendIcon} onClick={props.onClick}/>
        </div>
    );
}

export default FeedSendField;
