import React, {Component} from 'react';
import classes from './feeds.module.scss'
import Feed from "../../components/feeds/feed/Feed";
import {connect} from "react-redux";
import * as actions from './../../store/actions/index'

class Feeds extends Component {
    componentDidMount() {
        this.props.getFeeds(this.props.token, this.props.page);
    }


    onLikeClickHandler = (event, feedID) => {
        const type = 'like';
        this.actionWithLike(feedID, type);
    };
    onDislikeClickHandler = (event, feedID) => {
        const type = 'dislike';
        this.actionWithLike(feedID, type);
    };
    actionWithLike = (feedID, type) => {
        const userID = this.props.userID;
        if (!this.props.postsLikes[feedID]) { //если на записи нет лайков, то добавляем
            this.props.addLikeDislike(this.props.token, {postID: feedID, type, userID: this.props.userID});
            this.props.updateCounters(feedID, type, 'add');
        } else { //проверяем ставил ли пользователь лайк/дизлайк на этот пост
            let isGo = false;
            this.props.postsLikes[feedID].map(likes => {
                if (likes.userID == userID) { //пользователь ставил лайк на этот пост
                    isGo = true;
                    if (likes.type !== type) {
                        this.props.changeLikeDislike(this.props.token, {
                            postID: feedID,
                            type,
                            userID: this.props.userID
                        });
                        this.props.updateCounters(feedID, type, 'change');
                    } else {
                        this.props.removeLikeDislike(this.props.token, {
                            postID: feedID,
                            type,
                            userID: this.props.userID
                        });
                        this.props.updateCounters(feedID, type, 'remove');
                    }
                }
            });
            if (!isGo) {
                this.props.addLikeDislike(this.props.token, {postID: feedID, type, userID: this.props.userID});
                this.props.updateCounters(feedID, type, 'add');
            }
        }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.feeds !== nextProps.feeds || this.props.postsLikes !== nextProps.postsLikes;
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.feeds.length > 0) {
            if (nextProps.feeds[0].wherePageID != this.props.page) {
                this.props.getFeeds(this.props.token, this.props.page);
            }
        }
        if (nextProps.feeds.length > 0 && !nextProps.postsLikes) {
            this.props.getLDL(this.props.token, nextProps.feeds);
        }
    }

    render() {
        let feeds = null;
        feeds = this.props.feeds.map(feed => {
            if (this.props.postsLikes) {
                return <Feed feedID={feed.postID} userID={this.props.userID} author={feed.userID} key={feed.postID}
                             userSurname={feed.surname} userName={feed.name}
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
                <h2>Публикации</h2>
                {feeds}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFeeds: (token, pageID) => dispatch(actions.getFeeds(token, pageID)),
        getLDL: (token, feeds) => dispatch(actions.getLikes(token, feeds)),

        addLikeDislike: (token, like) => dispatch(actions.addLikeDislike(token, like)),
        removeLikeDislike: (token, like) => dispatch(actions.removeLikeDislike(token, like)),
        changeLikeDislike: (token, like) => dispatch(actions.changeLikeDislike(token, like)),
        updateCounters: (feedID, type, params) => dispatch(actions.updateCounters(feedID, type, params)),
    }
};
const mapStateToProps = state => {
    return {
        token: state.authorizationReducer.token,
        userID: state.authorizationReducer.user.userID,
        feeds: state.feedsReducer.feeds ? state.feedsReducer.feeds : [],
        postsLikes: state.likesReducer.likes ? state.likesReducer.likes : null,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Feeds);