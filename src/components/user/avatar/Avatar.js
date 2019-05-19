import React from 'react';
import classes from "./avatar.module.scss";
import avatarBG from './../../../assets/icons/userProfile/userEmptyPhoto.svg'

function Avatar(props) {
    console.log(props);
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
    return (
        <div className={cl.join(' ')} style={userAvatarBG}></div>
    );
}

export default Avatar;