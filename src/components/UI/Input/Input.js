import React from 'react';
import classes from './Input.module.css';


const input =(props)=> {

    let inputClasses=[classes.InputElement];
    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
    }


    let inputElement = null;

    switch(props.elementType){
        case ('input'):
            inputElement= <input 
            className={inputClasses.join(' ')}
            onChange={props.changed}
            invalid={props.invalid}
            {...props.elementConfig} 
            defaultValue={props.value} />;
            break;
        case ('select'):
            inputElement= (<select 
            className={inputClasses.join(' ')}
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
            className={inputClasses.join(' ')}
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