import React, {Component} from 'react';
import Content from "../../../hoc/content/content";
import {connect} from "react-redux";
import InputField from "../../../components/ui/inputFieldWithGoogleEffect/InputField";
import SubmitButton from "../../../components/ui/button/submitButton";
import * as actions from './../../../store/actions/index'

class SettingsContent extends Component {
    state = {
        edit: {
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
            },
            userDescription: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    required: true,
                },
                LabelConfig: {
                    labelText: "Статус (описание)",
                },
                labelGoogleEffectActive: false,
                googleEffect: true,
                value: ''
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    required: true,
                },
                LabelConfig: {
                    labelText: "Телефон",
                },
                labelGoogleEffectActive: false,
                googleEffect: true,
                value: ''
            }
        }
    };


    componentDidMount() {
        if (this.props.userData)
            for (let key in this.state.edit) {
                const update = this.state.edit[key];
                update.value = this.props.userData[key];
                update.labelGoogleEffectActive = !update.labelGoogleEffectActive;
                this.setState(state => {
                    return {
                        [state[key]]: update
                    }
                });
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
        }
        ;
        this.setState({[formName]: updated});
    };

    onChangeClick = () => {
        let updatedValues = {};
        for (let key in this.state.edit) {
            updatedValues[key] = this.state.edit[key].value;
        }
        this.props.editUserData(this.props.token, updatedValues);
    };
    getGeneralContent = () => {
        const inputs = [];
        for (let key in this.state.edit) {
            inputs.push({
                id: key,
                config: this.state.edit[key]
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
                googleEffectHandler={() => this.googleEffectHandler(input.id, 'edit')}
                value={input.config.value}
                changed={(event) => this.onChangeHandler(event, input.id, 'edit')}/>
        });
        return <>
            {inp}
            <label htmlFor="avatar">Фотография для аватарки </label>
            <input id="avatar" type="file" accept="image/*"/>
            <br/>
            <SubmitButton onBTNclick={this.onChangeClick}>Change Data</SubmitButton>
        </>
    }

    render() {
        let content = null;
        switch (this.props.tab) {
            case 'general':
                content = this.getGeneralContent();
                break;
            case 'education':
                content = <h1>Ed</h1>;
                break;
        }
        return (
            <div>
                <Content>
                    {content}
                </Content>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authorizationReducer.token,
        userData: state.authorizationReducer.user
    }
};
const mapDispatchToProps = dispatch => {
    return {
        editUserData: (token, updatedValues) => dispatch(actions.editUser(token, updatedValues)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsContent);