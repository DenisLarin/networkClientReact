import React from 'react';
import classes from './inputField.module.scss';

function InputField(props) {
    let inputElement = null;
    let label = null;
    const inputClass = [classes.input];
    let labelClass = [classes.label];
    let inputFieldClasses = [classes.inputField];
    if (props.googleEffect)
        inputFieldClasses = [classes.inputField, classes.inputField_googleEffect];
    if (props.labelGoogleEffectActive)
        labelClass = [classes.label, classes.active];
    switch (props.elementType) {
        case 'input':
            inputElement = <input
                id={props.id}
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                onBlur={props.googleEffectHandler}
                onFocus={props.googleEffectHandler}
                onClick={null}/>;
            label = <label className={labelClass.join(' ')} htmlFor={props.id} onClick={null}>
                {props.LabelConfig.labelText}
            </label>;
            break;
        case 'select':
            inputElement = <select>
                {props.elementConfig.options.map(elemet=>{
                    return <option key={elemet.value} value={elemet.value}>{elemet.displayValue}</option>
                })};
            </select>;
            break;
        default:
            break;
    }
    return (
        <div className={inputFieldClasses.join(' ')}>
            {inputElement}
            {label}
        </div>
    );
}

export default InputField;
