import React, {Component} from 'react';
import {connect} from "react-redux";
import InfoItem from "../../../components/user/infoItem/InfoItem";
import classes from './info.module.scss'


class Info extends Component {
    render() {
        let userItems = [];
        for (let key in this.props.user) {
            // eslint-disable-next-line eqeqeq
            if (key === 'name' || key === 'surname' || key === 'avatarURL' || key === 'userDescription' || !this.props.user[key])
                continue;
            userItems.push({key: key, value: this.props.user[key]});
        }
        let infoItems = userItems.map(item => {
            return <InfoItem key={item.key} id={item.key} value={item.value}/>
        });
        return (
            <div className={classes.info}>
                {infoItems}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user ? state.userReducer.user : ''
    }
};

export default connect(mapStateToProps)(Info);