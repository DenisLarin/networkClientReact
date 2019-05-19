import React, {Component} from 'react';
import Welcome from "./containers/welcome/Welcome";
import {Route, Switch, Redirect} from 'react-router-dom';
import UserPage from "./containers/userPage/UserPage";
import {connect} from "react-redux";
import * as actions from './store/actions/index'
import Layout from "./hoc/layout/Layout";


class App extends Component {
    componentWillMount() {
        this.props.checkAuth();
    }

    render() {
        if (!this.props.isAutoSignIN && !this.props.isAuth) {
            return <div></div>
        } else {
            var routes = null;
            if (this.props.isAuth) {
                routes = (
                    <Layout>
                        <Switch>
                            <Route path='/userpage/:id' exact component={UserPage}/>
                            <Redirect to={"/userpage/"+this.props.userID}/>
                        </Switch>
                    </Layout>
                );
            } else {
                routes = (
                    <Switch>
                        <Route path='/' exact component={Welcome}/>
                        <Redirect to="/"/>
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
        userID: state.authorizationReducer.userID
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(actions.authCheck())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);