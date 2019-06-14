import React, {Component} from 'react';
import * as classes from './welcome.module.scss'
import InputField from "../../components/ui/inputFieldWithGoogleEffect/InputField";
import SubmitButton from "../../components/ui/button/submitButton";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from './../../store/actions/index'

class Welcome extends Component {

    constructor() {
        super();
        var today = new Date(),
            date = today.toISOString().slice(0, 10);
        this.state = {
            loginForm: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        required: true,
                    },
                    LabelConfig: {
                        labelText: "email",
                    },
                    labelGoogleEffectActive: false,
                    googleEffect: true,
                    value: ''
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        required: true,
                    },
                    LabelConfig: {
                        labelText: "пароль",
                    },
                    labelGoogleEffectActive: false,
                    googleEffect: true,
                    value: ''
                },
            },
            registerForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        required: true,
                    },
                    LabelConfig: {
                        labelText: "имя",
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
                        labelText: "фамилия",
                    },
                    labelGoogleEffectActive: false,
                    googleEffect: true,
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        required: true,
                    },
                    LabelConfig: {
                        labelText: "email",
                    },
                    labelGoogleEffectActive: false,
                    googleEffect: true,
                    value: ''
                },
                phone: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'tel',
                        pattern: '+7-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}'
                    },
                    LabelConfig: {
                        labelText: "телефон",
                    },
                    labelGoogleEffectActive: false,
                    googleEffect: true,
                    value: ''
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        required: true,
                    },
                    LabelConfig: {
                        labelText: "пароль",
                    },
                    labelGoogleEffectActive: false,
                    googleEffect: true,
                    value: ''
                },
                repassword: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        required: true,
                    },
                    LabelConfig: {
                        labelText: "повторный пароль",
                    },
                    labelGoogleEffectActive: false,
                    googleEffect: true,
                    value: ''
                },
                birthday: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'date',
                        min: "1910-01-01",
                        max: date,
                        required: true
                    },
                    LabelConfig: {
                        labelText: "дата рождения",
                    },
                    labelGoogleEffectActive: false,
                    googleEffect: false,
                    value: ''
                },
                gender: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'M', displayValue: 'Мужской'},
                            {value: 'F', displayValue: 'Женский'},
                        ],
                    },
                    labelGoogleEffectActive: false,
                    googleEffect: false,
                    value: 'M'
                },
            },

            loginError: '',
            registerError: '',
        };
    }


    componentDidMount() {

        if (this.props.isAuth)
            return <Redirect to="/userpage"/>
    }
    componentWillMount() {
        document.title = "Добро пожаловать в deepnet";
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
    login = (event) => {
        event.preventDefault();
        this.props.onSignIN(this.state.loginForm.email.value, this.state.loginForm.password.value);
    };
    singup = (event) => {
        event.preventDefault();
        if (this.state.registerForm.password.value !== this.state.registerForm.repassword.value) {
            alert("Пароли не совпадают");
            return;
        }
        ;
        this.props.onSignUP(this.state.registerForm.name.value, this.state.registerForm.surname.value, this.state.registerForm.email.value, this.state.registerForm.password.value, this.state.registerForm.birthday.value, this.state.registerForm.gender.value, this.state.registerForm.phone.value);
    };

    render() {
        let loginElements = [];
        let registerElements = [];
        for (let key in this.state.loginForm) {
            loginElements.push({
                id: key,
                config: this.state.loginForm[key],
            });
        }
        ;
        for (let key in this.state.registerForm) {
            registerElements.push({
                id: key,
                config: this.state.registerForm[key]
            });
        }
        let form = (
            <form autoComplete="on" onSubmit={this.login}>
                {loginElements.map(loginElement => {
                    const key = loginElement.id;
                    return <InputField
                        key={key}
                        id={key + "login"}
                        elementType={loginElement.config.elementType}
                        elementConfig={loginElement.config.elementConfig}
                        LabelConfig={loginElement.config.LabelConfig}
                        googleEffect={loginElement.config.googleEffect}
                        labelGoogleEffectActive={loginElement.config.labelGoogleEffectActive}
                        googleEffectHandler={() => this.googleEffectHandler(loginElement.id, 'loginForm')}
                        value={loginElement.config.value}
                        changed={(event) => this.onChangeHandler(event, loginElement.id, 'loginForm')}/>
                })}
                {this.props.loginError ? <p style={{'color': 'red'}}>{this.props.loginError.errorCodeStatus}</p> : null}
                <SubmitButton disable={this.state.loginForm.disable}>Войти</SubmitButton>
                <a href="#" className={classes.forgotPassword}>забыли пароль?</a>
            </form>
        );
        let registerForm = (
            <form autoComplete="on" onSubmit={this.singup}>
                {registerElements.map(registerElement => {
                    const key = registerElement.id;
                    return <InputField
                        key={key}
                        id={key + "register"}
                        elementType={registerElement.config.elementType}
                        elementConfig={registerElement.config.elementConfig}
                        LabelConfig={registerElement.config.LabelConfig}
                        googleEffect={registerElement.config.googleEffect}
                        labelGoogleEffectActive={registerElement.config.labelGoogleEffectActive}
                        googleEffectHandler={() => this.googleEffectHandler(registerElement.id, 'registerForm')}
                        value={registerElement.config.value}
                        changed={(event) => this.onChangeHandler(event, registerElement.id, 'registerForm')}/>
                })}
                {this.props.registerError ?
                    <p style={{'color': 'red'}}>{this.props.registerError.errorCodeStatus}</p> : null}
                {this.props.registerSuccess ? <p style={{'color': 'red'}}>{this.props.registerSuccess}</p> : null}
                <SubmitButton disable={this.state.registerForm.disable}>Зарегистрироваться</SubmitButton>
            </form>
        );

        return (
            <div className={classes.authPage}>
                <div className={classes.deepnetINFO}>
                    <h1>deepnet</h1>
                    <h3>Данная социальная сеть находится в разработке для связи с автором писать на <a
                        href="mailto:mr.larindenis@gmail.com">mr.larindenis@gmail.com</a></h3>
                    <p>На текущий момент реализован следующий функционал:</p>
                    <ul>
                        <li>Серверная часть</li>
                        <li>регистрация пользователя</li>
                        <li>авторизация пользователя</li>
                        <li>лайки</li>
                        <li>информация пользователя</li>
                        <li>Записи пользователей</li>
                        <li>возможность перехода на страницы другого пользователя</li>
                        <li>поиск пользователя</li>
                        <li>Добавление в друзья</li>
                        <li>Базовые настройки пользователя</li>
                    </ul>
                </div>
                <div className={classes.form}>
                    <div className={classes.loginBlock}>
                        {form}
                    </div>
                    <div className={classes.registrationBlock}>
                        <h2>Регистрация</h2>
                        {registerForm}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIN: (email, password) => dispatch(actions.singIN(email, password)),
        onSignUP: (name, surname, email, password, birthday, gender, phone) => dispatch(actions.signUP(name, surname, email, password, birthday, gender, phone))
    }
};
const mapStateToProps = (state) => {
    return {
        loginError: state.authorizationReducer.loginError,
        registerError: state.authorizationReducer.registerError,
        registerSuccess: state.authorizationReducer.registerSuccess,
        isAuth: state.authorizationReducer.token != null,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);