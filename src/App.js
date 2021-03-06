import React, {Component} from 'react';
import Welcome from "./containers/welcome/Welcome";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import UserPage from "./containers/userPage/UserPage";
import {connect} from "react-redux";
import * as actions from './store/actions/index'
import Layout from "./hoc/layout/Layout";
import Friends from "./containers/friends/Friends";
import SearchFriends from "./containers/search/SearchFriends";
import Settings from "./containers/settings/Settings";


class App extends Component {
    componentWillMount() {
        this.props.checkAuth();
    }

    render() {
        var routes = null;
        if (!this.props.userID){
            return (<></>)
        }
        if (this.props.isAuth) {
            routes = (
                <Layout>
                    <Switch>
                        <Route path='/userpage/:id' exact component={UserPage}/>
                        <Route path='/friends' exact component={Friends}/>
                        <Route path='/search/' exact component={SearchFriends}/>
                        <Route path='/settings/' exact component={Settings}/>
                        <Route path='/search/:searchParams' exact component={SearchFriends}/>
                        <Redirect to={`/userpage/${this.props.userID}`}/>
                    </Switch>
                </Layout>
            );
        } else {
            if (!this.props.isAutoSignIN && !this.props.isAuth && !(!this.props.loginError || !this.props.registerError)) {
                return <div></div>
            } else {
                routes = (
                    <Switch>
                        <Route path='/' exact component={Welcome}/>
                        <Redirect to='/'/>
                    </Switch>
                );
            }
        }

        return (
            <>
                {routes}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authorizationReducer.token != null,
        isAutoSignIN: state.authorizationReducer.isAutoSignIN,
        userID: state.authorizationReducer.userID,
        loginError: state.authorizationReducer.loginError,
        registerError: state.authorizationReducer.registerError
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(actions.authCheck())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));