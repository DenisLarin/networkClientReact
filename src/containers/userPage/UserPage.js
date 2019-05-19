import React, {Component} from 'react';
import UserProfileHeader from "../../components/user/userProfileHeader/UserProfileHeader";
import {connect} from "react-redux";
import * as actions from './../../store/actions/index'
import UserContent from "./userContent/UserContent";

class UserPage extends Component {
    state = {
        headerTabsMenu: {
            isActiveBackground: false,
            type: 'headerTabsMenu',
            items: {
                history: {
                    name: 'History',
                    isActive: true,
                },
                info: {
                    name: 'Info',
                    isActive: false
                }
            }
        },
        witchTab: 'history',
    };

    componentDidMount() {
        if (this.props.match.params.id)
            this.props.getUserData(this.props.token, this.props.match.params.id);
    }

    headerTabMenuClickHandler = (event, id, type) => {

        const updatedBlock = this.state[type].items;
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
    };

    render() {
        return (
            this.props.userData ?
                <div>

                    <UserProfileHeader isOnline={this.props.isOnline} userData={this.props.userData}
                                       headerTabsMenuClickHandler={this.headerTabMenuClickHandler}
                                       headerTabsMenu={this.state.headerTabsMenu}/>
                    <UserContent page={this.props.match.params.id} tab={this.state.witchTab}/>
                </div>
                : <h2>Модуль 404</h2>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: (token, userID) => dispatch(actions.getUser(token, userID)),
    }
};
const mapStateToProps = (state) => {
    return {
        token: state.authorizationReducer.token,
        isOnline: state.authorizationReducer.isOnline,
        userData: state.userReducer.user
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);