import React, {Component} from 'react';
import classes from './feed.module.scss';
import UserInfo from "../../user/userInfo/UserInfo";
import Controls from "./controls/Controls";
import OptionButton from "../../ui/optionButton/OptionButton";
import remove from "../../../assets/icons/friends/removeFriend.svg";
import edit from './../../../assets/icons/feeds/iconfinder_notes_edit_103663.svg'

import {Link} from "react-router-dom";

import {connect} from "react-redux";
import * as actions from './../../../store/actions/index';

class Feed extends Component {
    state = {
        showExternalMenu: false,
        menus: {
            author: [
                {logo: remove, type: 'removeFeed'},
                {logo: edit, type: 'editFeed'},
            ]
        }
    };

    showMenuHandler = () => {
        this.setState(state => {
            return {
                showExternalMenu: !state.showExternalMenu,
            }
        })
    };
    onmenuClick = (event, type) => {
        switch (type) {
            case 'removeFeed':
                console.log('remove');
                this.props.removePost(this.props.token, this.props.feedID);
                break;
            case 'editFeed':
                console.log('edit');
                console.log(this.props.feedID);
                break;
        }
    };

    render() {
        let isLike = false;
        let isDisLike = false;
        if (this.props.likedPost) {
            this.props.likedPost.map(like => {
                if (this.props.userID == like.userID) {
                    if (like.type == 'like')
                        isLike = true;
                    else
                        isDisLike = true;
                }
            })
        }
        let menu = null;
        if (this.props.userID == this.props.author) {
            menu = <OptionButton middle absolute menus={this.state.menus.author} active={this.state.showExternalMenu}
                                 onMenuItemClick={this.onmenuClick}
                                 onMenuClickHandler={this.showMenuHandler}/>
        }
        return (
            <div className={classes.feed}>
                <Link to={`/userpage/${this.props.author}`}>
                    <UserInfo userName={this.props.userName} userSurname={this.props.userSurname} date={this.props.date}
                              avatarURL={this.props.avatarURL} middle/>
                    <p>{this.props.content}</p>
                </Link>
                <Controls isLike={isLike} isDL={isDisLike} onDislikeClick={this.props.onDislikeClick}
                          onLikeClick={this.props.onLikeClick}
                          likes={this.props.likes} dislikes={this.props.dislikes} shows={this.props.shows}/>
                {menu}
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        token: state.authorizationReducer.token,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        removePost: (token, postID) => dispatch(actions.removeFeed(token, postID)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Feed);
