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
                    labelText: "Имя",
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
                    labelText: "Фамилия",
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
    googleEffectHandler = (id, formName) => {
        const updated = this.state[formName];
        if (updated[id].value)
            return;
        updated[id].labelGoogleEffectActive = !updated[id].labelGoogleEffectActive;
        this.setState({[formName]: updated});
    };
    onChangeHandler = (event, id, formName) => {
        let updated = this.state[formName];
        updated[id].value = event.target.value;
        if (updated[id].value && !updated[id].labelGoogleEffectActive) {
            updated[id].labelGoogleEffectActive = true;
        };
        this.setState({[formName]: updated});
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
                googleEffectHandler={() => this.googleEffectHandler(input.id,'search')}
                value={input.config.value}
                changed={(event) => this.onChangeHandler(event, input.id,'search')}/>
        });
        return (
            <div className={style.searchFields}>
                {inp}
                <SubmitButton onBTNclick={this.onSearchClick}>Поиск</SubmitButton>
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