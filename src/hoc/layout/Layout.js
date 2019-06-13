import React, {Component} from 'react';
import Wrapper from "../wrapper/Wrapper";
import LeftToolBar from "../../components/ui/leftToolBar/LeftToolBar";
import UserAccountNavigationPannel from "../../components/user/userAccountNavigationPannel/UserAccountNavigationPannel";
import {connect} from "react-redux";
import classes from './layout.module.scss'

class Layout extends Component {
    render() {
        let toolMenu = null;
        if (this.props.isAuth)
            toolMenu = (
                <Wrapper>
                    <LeftToolBar/>
                    {/*<UserAccountNavigationPannel/>*/}
                </Wrapper>
            );
        return (
            <Wrapper>
                {toolMenu}
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authorizationReducer.token !== null,
    }
};
export default connect(mapStateToProps)(Layout);