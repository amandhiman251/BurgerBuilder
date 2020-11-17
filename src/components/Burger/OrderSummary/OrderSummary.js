import React, {Component} from 'react';
import Aux from '../../../hoc/AUX/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This should be a fun component changed to class only to check life cycle
    componentDidUpdate(){
        console.log("Order Summary did update")
    }
    render() {
        const ingredients = Object.keys(this.props.ingredients)
        .map(igkey => {
            return (
            <li key ={igkey}>
                <span style={{textTransform:'capitalize'}}>{igkey}</span>
                :{this.props.ingredients[igkey]}
            </li>);
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btntype="Danger" clicked ={this.props.cancel}>Cancel</Button>
                <Button btntype="Success" clicked ={this.props.continue}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;