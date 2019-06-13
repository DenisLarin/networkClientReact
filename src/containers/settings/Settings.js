import React, {Component} from 'react';
import MenuTabs from "../../components/ui/menuTabs/MenuTabs";
import SettingsContent from "./settingsContent/SettingsContent";

class Settings extends Component {
    state = {
        headerTabsMenu: {
            isActiveBackground: false,
            type: 'headerTabsMenu',
            items: {
                general: {
                    name: 'Общие',
                    isActive: true,
                },
            }
        },
        witchTab: 'general',
    };
    tabMenuHandler = (event, id, type) => {
        const updatedBlock = this.state[type].items;
        if (this.state[type].items[id].isActive)
            return false;
        for (let key in updatedBlock)
            updatedBlock[key].isActive = false;
        const updatedItem = this.state[type].items[id];
        updatedItem.isActive = true;
        this.setState(state => {
            return {
                ...state[type],
                updatedBlock,
                witchTab: id
            }
        });
    };
    render() {
        return (
            <div>
                <MenuTabs tabsMenu={this.state.headerTabsMenu} tabMenuClickHandler={this.tabMenuHandler}/>
                <SettingsContent tab={this.state.witchTab}/>
            </div>
        );
    }
}

export default Settings;