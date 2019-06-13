import React, {Component} from 'react';
import classes from './userContent.module.scss'
import Content from "../../../hoc/content/content";
import Feeds from "../../feeds/Feeds";
import Info from "../info/Info";
import FeedSendField from "../../../components/feeds/feedsSendField/FeedSendField";
import sendIcon from "../../../assets/icons/send.svg";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";


class UserContent extends Component {
    state = {
        feed: ''
    };
    onChangeInputFeedHandler = (event) => {
        this.setState({feed: event.target.value});
    };
    addNewFeedHandler = (event) => {
        if (event.key == 'Enter' || event.type == 'click') {
            if (this.state.feed) {
                this.props.addNewFeed(this.props.token, this.props.page, this.state.feed);
                this.setState({feed: ''});
            }
        }
    };

    render() {
        let content = null;
        switch (this.props.tab) {
            case 'history':
                content = <>
                    <FeedSendField onChange={this.onChangeInputFeedHandler} value={this.state.feed}
                                   onClick={this.addNewFeedHandler}
                                   userName={this.props.userName} avatarURL={this.props.userLogedAvatarURL}
                                   sendIcon={sendIcon}/>
                    <Feeds page={this.props.page}/>
                </>;
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
const mapDispatchToProps = dispatch=>{
    return{
        addNewFeed: (token, pageID, feed) => dispatch(actions.addFeed(token, pageID, feed)),
    }
}
const mapStateToProps = state=>{
  return{
      userName: state.userReducer.user ? state.userReducer.user.name : "",
      userLogedAvatarURL: state.authorizationReducer.user ? state.authorizationReducer.user.avatarURL : '',
      token: state.authorizationReducer.token,
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(UserContent);