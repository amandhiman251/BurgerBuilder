import React, {Component} from 'react';
import Aux from '../../hoc/AUX/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
        
    }
    componentDidMount(){
    this.props.onInitIngredients();
     }
    orderButtonHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map( igkey => {
            return ingredients[igkey]
        }).reduce((sum, el) =>{
         return sum+el},0)
        return sum>0;
    
    }

    purchasingHandler =() => {
        this.setState({purchasing: true});
    }
    modalclosedHandler = () => {
        this.setState({purchasing: false})
    }
    continueHandler = () => {
        console.log(this.props);
        this.props.history.push('/checkout');
    }

    render() {
        const disabledbtn = {...this.props.ings};
        for(let ingd in disabledbtn){
            disabledbtn[ingd]= disabledbtn[ingd]<=0
        }
        let orderSummary = null;
        let burger = this.props.error? <p>Something Went Wrong!!</p>:<Spinner />
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings} />
                    <BuildControls
                    price = {this.props.price} 
                    disabledind= {disabledbtn} 
                    ingredientsRemove = {this.props.onRemoveIngredients} 
                    ingredientsAdd = {this.props.onAddIngredients}
                    purchasable ={this.orderButtonHandler(this.props.ings)}
                    purchasing = {this.purchasingHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients= {this.props.ings}
                cancel={this.modalclosedHandler} 
                continue={this.continueHandler}
                price={this.props.price} />
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.finalPrice,
        error:state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onAddIngredients: (ing) => dispatch(burgerBuilderActions.addIngredient(ing)),
        onRemoveIngredients: (ing) => dispatch(burgerBuilderActions.removeIngredient(ing)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));


//https://my-burger-react-3a887.firebaseio.com/ingredients.json'