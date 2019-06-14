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
                    name: 'История',
                    isActive: true,
                },
                info: {
                    name: 'Информация',
                    isActive: false
                }
            }
        },
        witchTab: 'history',
        updated: false,
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getUserData(this.props.token, this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            this.props.getUserData(this.props.token, this.props.match.params.id);
            this.props.reupdateLikes();
        }
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
                witchTab: id,
                updated: !state.updated,
            }
        });
    };


    render() {
        console.log(this.props.userData);
        if (!this.props.userData && !this.props.loading)
            return (<h2>404</h2>);
        return (
            <div>
                <UserProfileHeader isOnline={this.props.isOnline} userData={this.props.userData}
                                   headerTabsMenuClickHandler={this.headerTabMenuClickHandler}
                                   headerTabsMenu={this.state.headerTabsMenu} userID={this.props.match.params.id}
                                   updated={this.state.updated}/>
                <UserContent page={this.props.match.params.id} tab={this.state.witchTab}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: (token, userID) => dispatch(actions.getUser(token, userID)),
        addNewFeed: (token, pageID, feed) => dispatch(actions.addFeed(token, pageID, feed)),
        reupdateLikes: () => dispatch(actions.reupdateLikes()),
    }
};
const mapStateToProps = (state) => {
    return {
        token: state.authorizationReducer.token,
        isOnline: state.authorizationReducer.isOnline,
        userData: state.userReducer.user,
        loading: state.userReducer.loading

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);