import React, {Component} from 'react';
import SearchFields from "./searchFields/SearchFields";
import {connect} from "react-redux";
import FriendCard from "../friends/friensCard/FriendCard";
import './searchFriends.scss'

class SearchFriends extends Component {
    state = {
        name: '',
        surname: '',
    };

    componentWillMount() {
        if (this.props.match.params.searchParams) {
            const searchArray = this.props.match.params.searchParams.split('&');
            searchArray.map(s => {
                let temp = s.split('=');
                this.setState({[temp[0]]: temp[1]});
            });
        }
    }

    renderSearchData = () => {
        const searchData = this.props.search.map(item => {
            return <FriendCard key={item.userID} userID={item.userID} avatarURL={item.avatarURL} userName={item.name} userSurname={item.surname}
                               email={item.email} tab='searchFriend'/>
        });
        return searchData;
    };

    render() {
        let searchParams = {};
        if (this.props.match.params.searchParams && this.state.name)
            for (let key in this.state) {
                searchParams[key] = this.state[key];
            }
        let searchData = null;
        if (this.props.search)
            searchData = this.renderSearchData();
        return (
            <div>
                <div className="searchField">
                    <SearchFields searchParams={searchParams}/>
                </div>
                <div className="searchContent">
                    {this.props.search.length>0 ? searchData : <h2>Нет данных</h2>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        search: state.searchReducer.searchData ? state.searchReducer.searchData : []
    }
};
export default connect(mapStateToProps)(SearchFriends);