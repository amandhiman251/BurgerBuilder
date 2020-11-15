import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label:"Salad", type:"salad"},
    {label:"Bacon", type:"bacon"},
    {label:"Cheese", type:"cheese"},
    {label:"Meat", type:"meat"}
]
const buildcontrols =(props) => {return (
        <div className = {classes.BuildControls}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( ctl =>(
            <BuildControl 
            label ={ctl.label} 
            key ={ctl.label}
            added ={()=>props.ingredientsAdd(ctl.type)}
            removed ={() => props.ingredientsRemove(ctl.type)} 
            disable= {props.disabledind[ctl.type]}
            />))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}> ORDER NOW</button>
        </div>);
}
export default buildcontrols;