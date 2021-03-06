import React, {Component} from 'react';
import style from './friendCard.module.scss'
import UserInfo from "../../../components/user/userInfo/UserInfo";
import OptionButton from "../../../components/ui/optionButton/OptionButton";
import remove from "../../../assets/icons/friends/removeFriend.svg";
import add from './../../../assets/icons/friends/addFriend.png.svg'

import * as actions from './../../../store/actions/index'
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class FriendCard extends Component {
    state = {
        showExternalMenu: false,
        menus: {
            active: [
                {logo: remove, type: 'removeFriend'},
            ],
            response: [
                {logo: remove, type: 'removeFriend'}
            ],
            request: [
                {logo: add, type: 'acceptFriend'},
                {logo: remove, type: 'cancelFriend'}
            ],
            searchFriend: [
                {logo: add, type: 'addFriend'}
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
            case 'acceptFriend':
                this.props.accept(this.props.token, this.props.userID);
                break;
            case 'cancelFriend':
                this.props.cancel(this.props.token, this.props.userID);
                break;
            case 'removeFriend':
                this.props.remove(this.props.token, this.props.userID);
                break;
            case 'addFriend':
                this.props.addToFriend(this.props.token, this.props.userID);
                break;
        }
    };

    render() {
        let menu = this.state.menus.active;
        if (this.props.tab == 'response')
            menu = this.state.menus.response;
        if (this.props.tab == 'request')
            menu = this.state.menus.request;
        if (this.props.tab == 'searchFriend')
            menu = this.state.menus.searchFriend;
        let styles = null;
        if (this.state.showExternalMenu)
            styles = {height: 50 + 25 + menu.length * 3 + menu.length * 30};
        return (
            <div className={style.friendCard} style={styles}>
                <Link to={'/userpage/' + this.props.userID}>
                    <UserInfo hunder avatarURL={this.props.avatarURL} userName={this.props.userName}
                              userSurname={this.props.userSurname} email={this.props.email}/>
                </Link>
                <OptionButton middle menus={menu} active={this.state.showExternalMenu}
                              onMenuItemClick={this.onmenuClick}
                              onMenuClickHandler={this.showMenuHandler}/>
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
        accept: (token, userID) => dispatch(actions.acceptFriend(token, userID)),
        cancel: (token, userID) => dispatch(actions.canceledFriend(token, userID)),
        remove: (token, userID) => dispatch(actions.removeFriend(token, userID)),
        addToFriend: (token, userID) => dispatch(actions.addToFriend(token, userID)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendCard);