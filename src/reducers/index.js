import { combineReducers } from 'redux';
import * as members from './members';
import * as transactions from './transactions';

const mainReducer = combineReducers({
    ...members,
    ...transactions
});

export default mainReducer;