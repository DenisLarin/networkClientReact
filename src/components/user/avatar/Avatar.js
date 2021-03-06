import React from 'react';
import classes from "./avatar.module.scss";
import avatarBG from './../../../assets/icons/userProfile/userEmptyPhoto.svg'

function Avatar(props) {
    let url = avatarBG;
    if (props.avatarURL)
        url = props.avatarURL;
    const userAvatarBG = {
        backgroundImage: `url("${url}")`,
    };
    let cl = [classes.user__avatar];
    if (props.smaller)
        cl = [classes.user__avatar, classes.user__avatar_smaller];
    if (props.middle)
        cl = [classes.user__avatar, classes.user__avatar_middle];
    if (props.hunder)
        cl = [classes.user__avatar, classes.user__avatar_hunder];
    return (
        <div className={cl.join(' ')} style={userAvatarBG}></div>
    );
}

export default Avatar;