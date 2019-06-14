import React, {Component} from 'react';
import MenuTabs from "../../components/ui/menuTabs/MenuTabs";
import * as actions from './../../store/actions/index'
import {connect} from "react-redux";
import FriendCard from "./friensCard/FriendCard";
import style from './friends.module.scss'
import addFriend from "../../assets/icons/friends/addFriend.png.svg";
import settings from "../../assets/icons/userProfile/settings.svg";


class Friends extends Component {
    state = {
        headerTabsMenu: {
            isActiveBackground: false,
            type: 'headerTabsMenu',
            items: {
                allFriend: {
                    name: 'Все друзья',
                    isActive: true,
                },
                response: {

                    name: 'Отправленные заявки',
                    isActive: false,
                },
                request: {
                    name: 'Запросы',
                    isActive: false,
                },
            }
        },
        witchTab: 'allFriend',

    };
    tabMenuHandler = (event, id, type) => {
        const updatedBlock = this.state[type].items;
        if (this.state[type].items[id].isActive)
            return false;
        for (let key in updatedBlock)
            updatedBlock[key].isActive = false;
        const updatedItem = this.state[type].items[id];
        updatedItem.isActive = true;
        this.setState(state => {
            return {
                ...state[type],
                updatedBlock,
                witchTab: id
            }
        });
        this.props.getFriends(this.props.token, this.props.userID, id);
    };

    componentDidMount() {
        this.props.getFriends(this.props.token, this.props.userID, 'accepted');
        this.props.reupdateLikes();
    }

    renderFriends = () => {
        const content = this.props.friends.map(friend => {
            return <FriendCard key={friend.userID} userID={friend.userID} tab={this.state.witchTab}
                               avatarURL={friend.avatarURL} userName={friend.name}
                               userSurname={friend.surname} email={friend.email}/>
        });
        return content;
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        document.title = "Друзья | " + this.state.headerTabsMenu.items[this.state.witchTab].name;
    }

    render() {
        let content = null;
        if (this.props.friends) {
            content = this.renderFriends()
        }
        return (
            <div>
                <MenuTabs tabsMenu={this.state.headerTabsMenu} tabMenuClickHandler={this.tabMenuHandler}/>
                <div className={style.friends}>
                    {content}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        friends: state.friendsReducer.friends ? state.friendsReducer.friends : [],
        token: state.authorizationReducer.token,
        userID: state.authorizationReducer.userID
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getFriends: (token, userID, status) => dispatch(actions.getFriends(token, userID, status)),
        reupdateLikes: () => dispatch(actions.reupdateLikes())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Friends);