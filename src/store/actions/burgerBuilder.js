import * as actionTypes from './actionTypes';

export const addIngredient = (ing) => {
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingredient:ing
    }    
}

export const removeIngredient = (ing) => {
    return{
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredient:ing
    }    
}