import * as actionType from './actions';


const INGREDIENTS_PRICE = {
    salad: 0.6,
    bacon: 0.9,
    cheese: 0.8,
    meat: 1.2
};

const initialState = {
    ingredients:{
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    finalPrice: 4
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
           return{
                    ...state,
                        ingredients:{
                            ...state.ingredients,
                            [action.ingredient]: state.ingredients[action.ingredient] + 1
                    },
                    finalPrice: state.finalPrice + INGREDIENTS_PRICE[action.ingredient]
            }
        case actionType.REMOVE_INGREDIENTS:
            return{
                    ...state,
                        ingredients:{
                             ...state.ingredients,
                             [action.ingredient]: state.ingredients[action.ingredient] - 1
                         },
                         finalPrice: state.finalPrice - INGREDIENTS_PRICE[action.ingredient]
                 }
        default:
            return state;
    }
    return state
}

export default reducer;