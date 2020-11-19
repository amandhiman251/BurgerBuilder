import React, {Component} from 'react';
import Aux from '../../hoc/AUX/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-order';

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
        purchasable: false,
        purchasing: false
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

    purchasingHandler =() => {
        this.setState({purchasing: true});
    }
    modalclosedHandler = () => {
        this.setState({purchasing: false})
    }
    continueHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.finalPrice,
            customer: {
                name: 'Aman Dhiman',
                address: {
                    street: 'teststreet',
                    zipcode: '133201',
                    country: 'India'
                },
                email: 'amandhiman251@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('orders.json', order)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
        //alert('you can continue')
    }

    render() {
        const disabledbtn = {...this.state.ingredients};
        for(let ingd in disabledbtn){
            disabledbtn[ingd]= disabledbtn[ingd]<=0
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalclosed = {this.modalclosedHandler}>
                    <OrderSummary ingredients= {this.state.ingredients}
                    cancel={this.modalclosedHandler} 
                    continue={this.continueHandler}
                    price={this.state.finalPrice} />
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls
                price = {this.state.finalPrice} 
                disabledind= {disabledbtn} 
                ingredientsRemove = {this.removeIngredientsHandler} 
                ingredientsAdd = {this.addIngredientsHandler}
                purchasable ={this.state.purchasable}
                purchasing = {this.purchasingHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;