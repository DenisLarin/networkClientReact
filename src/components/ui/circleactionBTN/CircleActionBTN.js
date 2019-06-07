import React from 'react';
import * as style from './circleActionBTN.module.scss'
import addFriend from '../../../assets/icons/friends/addFriend.png.svg'
import settings from './../../../assets/icons/userProfile/settings.svg'

function CircleActionBTN(props) {
    let content = null;
    let classes = [style.circleActionBTN];
    if (props.show) {
        classes = [style.circleActionBTN, style.active];
        content = <div className={style.content}>
            <div className={style.button} onClick={()=>props.onmenuClick('Friend')}><img src={addFriend} alt=""/></div>
            <div className={style.button} onClick={()=>props.onmenuClick('settings')}><img src={settings} alt=""/></div>
        </div>;
    }

    return (
        <div className={classes.join(' ')}>
            <img onClick={props.onClick} className={style.propsBTN} src={props.buttonIMG} alt=""/>
            {content}
        </div>
    );
}

export default CircleActionBTN;