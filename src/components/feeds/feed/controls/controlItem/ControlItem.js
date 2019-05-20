import React from 'react';
import classes from './controlItem.module.scss'
import ReactSVG from 'react-svg'

function ControlItem(props) {
    let reactSVG = <ReactSVG src={props.icon} wrapper={'div'}/>;
    if (props.type == 'like') {
        reactSVG = <ReactSVG src={props.icon} className={[classes.likeItemSVGIcon].join(' ')} wrapper={'div'}/>;
        if (props.isLike)
            reactSVG = <ReactSVG src={props.icon} className={[classes.likeItemSVGIcon, classes.likeActive].join(' ')}
                                 wrapper={'div'}/>;
    }
    if (props.type == 'dislike') {
        reactSVG = <ReactSVG src={props.icon} className={[classes.likeItemSVGIcon].join(' ')}
                             wrapper={'div'}/>;
        if (props.isDL)
            reactSVG = <ReactSVG src={props.icon} className={[classes.likeItemSVGIcon, classes.dislikeActive].join(' ')}
                                 wrapper={'div'}/>;
    }
    return (
        <div className={classes.controlItem} onClick={props.onControlItemClick}>
            {reactSVG}
            <span>{props.counter}</span>
        </div>
    );
}

export default ControlItem;