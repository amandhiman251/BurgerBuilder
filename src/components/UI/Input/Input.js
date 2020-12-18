import React from 'react';
import classes from './Input.module.css';


const input =(props)=> {

    let inputElement = null;

    switch(props.elementType){
        case ('input'):
            inputElement= <input 
            className={classes.InputElement}
            onChange={props.changed}
            {...props.elementConfig} 
            defaultValue={props.value} />;
            break;
        case ('select'):
            inputElement= (<select 
            className={classes.InputElement}
            onChange={props.changed} 
            defaultValue={props.value}>
            {props.elementConfig.option.map(
                abc => (
                    <option key ={abc.value} value ={abc.value}>
                        {abc.displayValue}
                    </option>
                ))}
                </select> );
            break;
        default:
            inputElement= <input 
            className={classes.InputElement}
            onChange={props.changed} 
            {...props.elementConfig} 
            defaultValue={props.value} />;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;