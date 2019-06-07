import React, {Component} from 'react';
import classes from './userProfileHeader.module.scss'

import sendMessage from './../../../assets/icons/userProfile/sendMessage.svg'
import Avatar from "../avatar/Avatar";
import CircleActionBTN from "../../ui/circleactionBTN/CircleActionBTN";
import MenuTabs from "../../ui/menuTabs/MenuTabs";
import OptionButton from "../../ui/optionButton/OptionButton";

import addFriend from '../../../assets/icons/friends/addFriend.png.svg'
import settings from './../../../assets/icons/userProfile/settings.svg'

import * as actions from './../../../store/actions/index'
import {connect} from "react-redux";

class UserProfileHeader extends Component {
    state = {
        showExternalMenu: false,
        menus: [
            {logo: addFriend, type: 'addFriend'},
            {logo: settings}
        ]
    };
    showMenuHandler = () => {
        this.setState(state => {
            return {
                showExternalMenu: !state.showExternalMenu,
            }
        })
    };
    onmenuClick = event => {
        // console.log(event.currentTarget.type);
        // console.log(this.props.userID);
        switch (event.currentTarget.type) {
            case 'addFriend':
                this.props.addToFriend(this.props.token, this.props.userID);
                break;
        }
    };

    render() {
        let content = null;
        if (this.props.userData) {
            const user = this.props.userData;
            content = (
                <>
                    <div className={classes.user__header_head}>
                        <div className={classes.user__header_content}>
                            <Avatar avatarURL={user.avatarURL}/>
                            <div className={classes.user__header_content_text}>
                                <h1>{user.name + " " + user.surname}<span>{" isOnline: " + this.props.isOnline}</span>
                                </h1>
                                <p>{user.userDescription}</p>
                            </div>
                        </div>
                        <div className={classes.user__header_controls}>
                            <OptionButton active={this.state.showExternalMenu}
                                          onMenuClickHandler={this.showMenuHandler} menus={this.state.menus}
                                          onMenuItemClick={this.onmenuClick}/>
                            <CircleActionBTN buttonIMG={sendMessage}/>
                        </div>
                    </div>
                    <MenuTabs tabMenuClickHandler={this.props.headerTabsMenuClickHandler}
                              tabsMenu={this.props.headerTabsMenu}/>
                </>
            );
        }
        return (
            <div className={classes.user__header}>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authorizationReducer.token,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        addToFriend: (token, userID) => dispatch(actions.addToFriend(token, userID)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileHeader);