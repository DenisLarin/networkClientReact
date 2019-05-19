import React, {Component} from 'react';
import classes from './feeds.module.scss'
import sendIcon from './../../assets/icons/send.svg';
import FeedSendField from "../../components/feeds/feedsSendField/FeedSendField";
import Feed from "../../components/feeds/feed/Feed";
import {connect} from "react-redux";
import * as actions from './../../store/actions/index'

class Feeds extends Component {
    componentDidMount() {
        this.props.getFeeds(this.props.token, this.props.page);
    }

    state = {
        feed: '',
    };
    onChangeInputFeedHandler = (event) => {
        this.setState({feed: event.target.value});
    };
    addNewFeedHandler = (event) => {
        if (event.key == 'Enter' || event.type == 'click') {
            if (this.state.feed) {
                this.props.addNewFeed(this.props.token, this.props.page, this.state.feed);
                this.setState({feed: ''});
                this.props.getFeeds(this.props.token, this.props.page);
            }
        }
    };

    render() {
        const feeds = this.props.feeds.map(feed => {
            return <Feed key={feed.postID} userSurname={feed.surname} userName={feed.name}
                         date={feed.postTime}
                         avatarURL={feed.avatarURL} content={feed.postContent} likes={feed.likes}
                         dislikes={feed.dislikes} shows={feed.postShowCounter}/>
        });
        return (
            <div className={classes.feeds}>
                {this.props.userLogedPageID == this.props.page ? null :
                    <FeedSendField onChange={this.onChangeInputFeedHandler} value={this.state.feed}
                                   onClick={this.addNewFeedHandler}
                                   userName={this.props.username} avatarURL={this.props.userLogedAvatarURL}
                                   sendIcon={sendIcon}/>}
                <h2>Publications</h2>
                {feeds}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFeeds: (token, pageID) => dispatch(actions.getFeeds(token, pageID)),
        addNewFeed: (token, pageID, feed) => dispatch(actions.addFeed(token, pageID, feed))
    }
};
const mapStateToProps = state => {
    return {
        token: state.authorizationReducer.token,
        feeds: state.feedsReducer.feeds ? state.feedsReducer.feeds : [],

        username: state.userReducer.user ? state.userReducer.user.name : '',

        userLogedAvatarURL: state.authorizationReducer.user ? state.authorizationReducer.user.avatarURL : '',
        userLogedPageID: state.authorizationReducer.user ? state.authorizationReducer.user.userID : '',
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Feeds);