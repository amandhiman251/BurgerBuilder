import * as actionTypes from '../actions/actionTypes';


const initialState = {
    loading: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
           return{
                    loading:false
           }
        default: return state;
    }
}

export default reducer;