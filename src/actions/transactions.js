import axios from 'axios';

import * as types from '../constants/transactions';

function requestTransactionsList(id) {
    return {
        type: types.GET_TRANSACTIONS_LIST,
        id
    }
}

function requestTransactionsListSuccess(transactions) {
    return {
        type: types.GET_TRANSACTIONS_LIST_SUCCESS,
        transactions
    }
}

function requestTransactionsListError(error) {
    return {
        type: types.GET_TRANSACTIONS_LIST_ERROR,
        error
    }
}

async function transactionsRequest(id) {
    const res = await axios.get('http://localhost:4000/api/transactions/' + id);
    return res.data;
}

export const getTransactions = (id) => {
    return async dispatch => {
        try {
            dispatch(requestTransactionsList(id));
            const members = await transactionsRequest(id);
            dispatch(requestTransactionsListSuccess(members))
        } catch (err) {
            dispatch(requestTransactionsListError(err))
        }

    }
};