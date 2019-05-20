import React from 'react';
import classes from './controls.module.scss'
import ControlItem from "./controlItem/ControlItem";
import like from './../../../../assets/icons/feeds/like.svg';
import dislike from './../../../../assets/icons/feeds/dislike.svg';
import comments from './../../../../assets/icons/feeds/comments.svg';
import shows from './../../../../assets/icons/feeds/shows.svg';


function Controls(props) {
    return (
        <div className={classes.controls}>
            <div className={classes.left}>
                <ControlItem isLike={props.isLike} onControlItemClick={props.onLikeClick} icon={like} type="like"
                             counter={props.likes}/>
                <ControlItem isDL={props.isDL} onControlItemClick={props.onDislikeClick} icon={dislike} type="dislike"
                             counter={props.dislikes}/>
                <ControlItem icon={comments} counter={0}/>
            </div>
            <ControlItem icon={shows} counter={props.shows}/>
        </div>
    );
}

export default Controls;