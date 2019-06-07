import React, {Component} from 'react';
import InputField from "../../../components/ui/inputFieldWithGoogleEffect/InputField";
import SubmitButton from "../../../components/ui/button/submitButton";
import style from './searchFields.module.scss';
import * as actions from './../../../store/actions/index'
import {connect} from "react-redux";
import {isTSConstructSignatureDeclaration} from "@babel/types";

class SearchFields extends Component {
    state = {
        search: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    required: true,
                },
                LabelConfig: {
                    labelText: "name",
                },
                labelGoogleEffectActive: false,
                googleEffect: true,
                value: ''
            },
            surname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    required: true,
                },
                LabelConfig: {
                    labelText: "surname",
                },
                labelGoogleEffectActive: false,
                googleEffect: true,
                value: ''
            }
        }
    };

    componentDidMount() {
        let isData = false;
        if (this.props.searchParams) {
            for (let key in this.props.searchParams) {
                const update = this.state.search[key];
                update.value = this.props.searchParams[key];
                if (update.value)
                    isData = true;
                update.labelGoogleEffectActive = !update.labelGoogleEffectActive;
                this.setState(state => {
                    return {
                        [state[key]]: update
                    }
                });
            }
            if (isData)
                this.onSearchClick();
        }
    }

    googleEffectHandler = (id) => {
        let update = this.state.search[id];
        if (update.value)
            return;
        update.labelGoogleEffectActive = !update.labelGoogleEffectActive;
        this.setState(state => {
            return {
                [state[id]]: update,
            }
        });
    };
    onChangeHandler = (event, id) => {
        let update = this.state.search[id];
        update.value = event.target.value;
        this.setState(state => {
            return {
                [state[id]]: update,
            }
        });
    };
    onSearchClick = () => {
        const searchParams = {};
        for (let key in this.state.search) {
            if (!this.state.search[key].value) {
                alert('Enter all data');
                return false;
            }
            searchParams[key] = this.state.search[key].value;
        }
        this.props.searchUsers(this.props.token, searchParams);

    }

    render() {
        const inputs = [];
        for (let key in this.state.search) {
            inputs.push({
                id: key,
                config: this.state.search[key]
            });
        }
        ;
        const inp = inputs.map(input => {
            const key = input.id;
            return <InputField
                key={key}
                id={key + "login"}
                elementType={input.config.elementType}
                elementConfig={input.config.elementConfig}
                LabelConfig={input.config.LabelConfig}
                googleEffect={input.config.googleEffect}
                labelGoogleEffectActive={input.config.labelGoogleEffectActive}
                googleEffectHandler={() => this.googleEffectHandler(input.id)}
                value={input.config.value}
                changed={(event) => this.onChangeHandler(event, input.id)}/>
        });
        return (
            <div className={style.searchFields}>
                {inp}
                <SubmitButton onBTNclick={this.onSearchClick}>Search</SubmitButton>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authorizationReducer.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchUsers: (token, searchParams) => dispatch(actions.searchUsers(token, searchParams)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchFields);