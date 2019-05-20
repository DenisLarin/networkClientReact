import React, {Component} from 'react';
import classes from './feeds.module.scss'
import Feed from "../../components/feeds/feed/Feed";
import {connect} from "react-redux";
import * as actions from './../../store/actions/index'

class Feeds extends Component {
    componentDidMount() {
        if (this.props.feeds.length <= 0)
            this.props.getFeeds(this.props.token, this.props.page);
    }

    onDislikeClickHandler = (event, feedID) => {
        console.log(feedID);
    };
    onLikeClickHandler = (event, feedID) => {
        console.log(feedID);
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.feeds !== nextProps.feeds || this.props.postsLikes !== nextProps.postsLikes;
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.feeds.length > 0 && !nextProps.postsLikes) {
            this.props.getLDL(this.props.token, nextProps.feeds);
        }
    }

    render() {
        let feeds = null;
        feeds = this.props.feeds.map(feed => {
            if (this.props.postsLikes) {
                return <Feed id={feed.postID} key={feed.postID} userSurname={feed.surname} userName={feed.name}
                             date={feed.postTime}
                             likedPost={this.props.postsLikes[feed.postID]}
                             avatarURL={feed.avatarURL} content={feed.postContent} likes={feed.likes}
                             dislikes={feed.dislikes} shows={feed.postShowCounter}
                             onDislikeClick={(event) => this.onDislikeClickHandler(event, feed.postID)}
                             onLikeClick={(event) => this.onLikeClickHandler(event, feed.postID)}/>
            }
        });
        return (
            <div className={classes.feeds}>
                <h2>Publications</h2>
                {feeds}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFeeds: (token, pageID) => dispatch(actions.getFeeds(token, pageID)),
        getLDL: (token, feeds) => dispatch(actions.getLikes(token, feeds)),
    }
};
const mapStateToProps = state => {
    return {
        token: state.authorizationReducer.token,
        feeds: state.feedsReducer.feeds ? state.feedsReducer.feeds : [],
        postsLikes: state.likesReducer.likes,

        username: state.userReducer.user ? state.userReducer.user.name : '',

        userLogedAvatarURL: state.authorizationReducer.user ? state.authorizationReducer.user.avatarURL : '',
        userLogedPageID: state.authorizationReducer.user ? state.authorizationReducer.user.userID : '',

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Feeds);