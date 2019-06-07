import React, {Component} from 'react';
import InputField from "../../components/ui/inputFieldWithGoogleEffect/InputField";

class SearchFriends extends Component {
    render() {
        console.log(this.props.match.params.params);
        console.log(this.props);
        return (
            <InputField/>
        );
    }
}

export default SearchFriends;