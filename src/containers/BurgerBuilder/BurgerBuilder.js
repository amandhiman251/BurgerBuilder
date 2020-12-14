import React, {Component} from 'react';
import Aux from '../../hoc/AUX/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.6,
    bacon: 0.9,
    cheese: 0.8,
    meat: 1.2
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        finalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount(){
        axios.get('https://my-burger-react-3a887.firebaseio.com/orders/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        }).catch(error => {
            this.setState({error: true});
        });
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
        //alert('you can continue')
        const qParam = [];
        for ( let i in this.state.ingredients){
            qParam.push( encodeURIComponent(i) + '=' + encodeURIComponent( this.state.ingredients[i]) );
        }
        qParam.push('price=' + this.state.finalPrice);
        const queryString = qParam.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        });
    }

    render() {
        const disabledbtn = {...this.state.ingredients};
        for(let ingd in disabledbtn){
            disabledbtn[ingd]= disabledbtn[ingd]<=0
        }
        let orderSummary = null;
        let burger = this.state.error? <p>Something Went Wrong!!</p>:<Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
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
            orderSummary = <OrderSummary ingredients= {this.state.ingredients}
                cancel={this.modalclosedHandler} 
                continue={this.continueHandler}
                price={this.state.finalPrice} />
        }
        if(this.state.loading){
            let orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalclosed = {this.modalclosedHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);