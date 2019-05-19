import React from 'react';
import classes from './writeNewFeedInput.module.scss';
function WriteNewFeedInput(props) {
    return (
        <input value={props.value} onChange={props.onChange} className={classes.feedInput} type="text" placeholder={props.placeholder} onKeyPress={props.onKeyPress}/>
    );
}

export default WriteNewFeedInput;