import React from 'react';
import classes from './userProfileHeader.module.scss'

import sendMessage from './../../../assets/icons/userProfile/sendMessage.svg'
import more from './../../../assets/icons/userProfile/more.svg'
import Avatar from "../avatar/Avatar";
import CircleActionBTN from "../../ui/circleactionBTN/CircleActionBTN";
import MenuTabs from "../../ui/menuTabs/MenuTabs";

function UserProfileHeader(props) {
    let content = null


    if (props.userData) {
        const user = props.userData;

        content = (
            <>
                <div className={classes.user__header_head}>
                    <div className={classes.user__header_content}>
                        <Avatar avatarURL={user.avatarURL}/>
                        <div className={classes.user__header_content_text}>
                            <h1>{user.name + " " + user.surname }<span>{" isOnline: " + props.isOnline}</span></h1>
                            <p>{user.userDescription}</p>
                        </div>
                    </div>
                    <div className={classes.user__header_controls}>
                        <CircleActionBTN buttonIMG={sendMessage}/>
                        <CircleActionBTN buttonIMG={more}/>
                    </div>
                </div>
                <MenuTabs tabMenuClickHandler={props.headerTabsMenuClickHandler} tabsMenu={props.headerTabsMenu}/>
            </>
        );
    }
    return (
        <div className={classes.user__header}>
            {content}
        </div>
    );
}

export default UserProfileHeader;