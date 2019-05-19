import React, {Component} from 'react';
import classes from './userContent.module.scss'
import Content from "../../../hoc/content/content";
import Feeds from "../../feeds/Feeds";
import {connect} from "react-redux";
import userEmptyPhoto from './../../../assets/icons/userProfile/userEmptyPhoto.svg'
import Info from "../info/Info";

class UserContent extends Component {
    render() {
        let content = null;
        switch (this.props.tab) {
            case 'history':
                content = <Feeds page={this.props.page}/>;
                break;
            case 'info':
                content = <Info page={this.props.page}/>;
                break;
        }
        return (
            <div className={classes.userContent}>
                <Content>
                    {content}
                </Content>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        avatarURL: state.userReducer.user ? state.userReducer.user.avatarURL : userEmptyPhoto,
        userName: state.userReducer.user ? state.userReducer.user.name : 'userName',
        userSurname: state.userReducer.user ? state.userReducer.user.surname : 'userSurname',
    }
};
export default connect(mapStateToProps)(UserContent);