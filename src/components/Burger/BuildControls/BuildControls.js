import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label:"Salad", type:"salad"},
    {label:"Bacon", type:"bacon"},
    {label:"Cheese", type:"cheese"},
    {label:"Meat", type:"meat"}
]
const Buildcontrols =(props) => {return (
        <div className = {classes.BuildControls}>
        {controls.map( ctl =>(
            <BuildControl 
            label ={ctl.label} 
            key ={ctl.label}
            added ={()=>props.ingredientsAdd(ctl.type)}
            removed ={() => props.ingredientsRemove(ctl.type)} />))}
        </div>);
}
export default Buildcontrols;