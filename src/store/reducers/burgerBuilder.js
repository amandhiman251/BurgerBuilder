import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const INGREDIENTS_PRICE = {
    salad: 0.6,
    bacon: 0.9,
    cheese: 0.8,
    meat: 1.2
};

const initialState = {
    ingredients:null,
    finalPrice: 4,
    error: false
}

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients,{[action.ingredient]: state.ingredients[action.ingredient] + 1} );
    const updatedState ={
        ingredients:updatedIngredients,
        finalPrice: state.finalPrice + INGREDIENTS_PRICE[action.ingredient]
    }
    return updateObject(state,updatedState );
}

const removeIngredient = ( state, action ) => {
    const updatedIngs = updateObject(state.ingredients,{[action.ingredient]: state.ingredients[action.ingredient] - 1} );
    const updatedSt ={
        ingredients:updatedIngs,
        finalPrice: state.finalPrice - INGREDIENTS_PRICE[action.ingredient]
    }
    return updateObject(state,updatedSt );
}

const setIngredients = ( state, action ) => {
    return updateObject( state,{
        ingredients:{
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error:false,
        finalPrice: 4
});
}

const fetchIngredients = ( state ) =>{
    return updateObject( state, {error: true} );
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state,action);

        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return fetchIngredients(state);
        default:
            return state;
    }
}

export default reducer;