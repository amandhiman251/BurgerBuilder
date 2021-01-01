import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (ing) => {
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingredient:ing
    }    
}

export const removeIngredient = (ing) => {
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingredient:ing
    }    
}

export const setIngredients = (ing) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients:ing
    }
}

export const fetchIngredientsFail = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAIL,
    }
}

export const initIngredients = () => {
    return dispatch => {
                axios.get('ingredients')
                .then(response => {
                    dispatch(setIngredients(response.data));
                }).catch(error => {
                    dispatch(fetchIngredientsFail())
                    });
        };

    };

