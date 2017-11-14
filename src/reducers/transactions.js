import * as Constants from '../constants/transactions';

const initialState = {
    list: []
};

export function transactions(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_TRANSACTIONS_LIST: return state;
        case Constants.GET_TRANSACTIONS_LIST_SUCCESS:
            return {...state, list: action.transactions};
        case Constants.GET_TRANSACTIONS_LIST_ERROR:
            return {...state, error: action.error};

        default:
            return state;
    }
}