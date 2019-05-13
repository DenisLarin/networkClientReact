import React, {Component} from 'react';
import Aux from "../aux/Aux";
import LeftToolBar from "../../components/ui/leftToolBar/LeftToolBar";
import UserAccountNavigationPannel from "../../components/userAccountNavigationPannel/UserAccountNavigationPannel";

class Layout extends Component {
    render() {
        return (
            <Aux>
                <LeftToolBar/>
                <UserAccountNavigationPannel/>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;