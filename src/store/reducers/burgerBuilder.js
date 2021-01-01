import * as actionTypes from '../actions/actionTypes';


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

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
           return{
                    ...state,
                        ingredients:{
                            ...state.ingredients,
                            [action.ingredient]: state.ingredients[action.ingredient] + 1
                    },
                    finalPrice: state.finalPrice + INGREDIENTS_PRICE[action.ingredient]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return{
                    ...state,
                        ingredients:{
                             ...state.ingredients,
                             [action.ingredient]: state.ingredients[action.ingredient] - 1
                         },
                         finalPrice: state.finalPrice - INGREDIENTS_PRICE[action.ingredient]
                 }
        case actionTypes.SET_INGREDIENTS:
            return{
                    ...state,
                    ingredients:action.ingredients,
                    error:false
            }
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return{
                    ...state,
                    error: true
                }
        default:
            return state;
    }
}

export default reducer;