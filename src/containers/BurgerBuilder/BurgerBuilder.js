import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    salad: 0.6,
    bacon: 0.9,
    cheese: 0.8,
    meat: 1.2
};

class BurgerBuilder extends Component {
    state = {
        ingredients:{
            salad: 0,
            bacon:0,
            cheese:0,
            meat:0
        },
        finalPrice: 4,
        purchasable :false
    }
    orderButtonHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map( igkey => {
            return ingredients[igkey]
        }).reduce((sum, el) =>{
         return sum+el},0)
        this.setState({
            purchasable : sum>0
        })
    }
    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.finalPrice;
        const ingredPrice = INGREDIENTS_PRICE[type];
        const updatedPrice = oldPrice + ingredPrice;
        this.setState({
            finalPrice: updatedPrice,
            ingredients:updatedIngredients
        }) 
        this.orderButtonHandler(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.finalPrice;
        const ingredPrice = INGREDIENTS_PRICE[type];
        const updatedPrice = oldPrice - ingredPrice;
        this.setState({
            finalPrice: updatedPrice,
            ingredients:updatedIngredients
        })
        this.orderButtonHandler(updatedIngredients); 
    }

    render() {
        const disabledbtn = {...this.state.ingredients};
        for(let ingd in disabledbtn){
            disabledbtn[ingd]= disabledbtn[ingd]<=0
        }
        return(
            <Aux>
                <Modal>
                    <OrderSummary ingredients= {this.state.ingredients} />
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls
                price = {this.state.finalPrice} 
                disabledind= {disabledbtn} 
                ingredientsRemove = {this.removeIngredientsHandler} 
                ingredientsAdd = {this.addIngredientsHandler}
                purchasable ={this.state.purchasable} />
            </Aux>
        );
    }
}

export default BurgerBuilder;