import React from 'react';
import classes from './Order.module.css';


const order = (props) => {

    const ingredients = [];
    for(let ing in props.ingredients){
        ingredients.push(
            {
            Name: ing,
            quantity: props.ingredients[ing]
            }
        );
    }
    //console.log(ingredients);
    const ingOutput = ingredients.map(ig => {
        return <span key={ig.Name}> {ig.Name} ({ig.quantity}) </span>;
    })
    //console.log(ingredients);

    return(
        <div className ={classes.Order}>
            <p>Ingredients: {ingOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;