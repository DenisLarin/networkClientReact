import React from 'react';
import {Link} from "react-router-dom";
import classes from './logo.module.scss'
import logo from '../../../assets/logo/logo.svg'

function Logo(props) {
    return (
        <Link to={`/userpage/${props.userID}`}>
            <img src={logo} alt="" className={classes.logo}/>
        </Link>
    );
}

export default Logo;