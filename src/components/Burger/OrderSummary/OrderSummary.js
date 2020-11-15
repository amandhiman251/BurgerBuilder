import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary =(props) => {
    const ingredients = Object.keys(props.ingredients)
    .map(igkey => {
        return (
        <li key ={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey}</span>
            :{props.ingredients[igkey]}
        </li>);
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious Burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
}

export default orderSummary;