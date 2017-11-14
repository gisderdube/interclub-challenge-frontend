import * as Constants from '../constants/members';

const initialState = {
    list: [],
    activeMember: {}
};

export function members(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_MEMBERS_LIST: return state;
        case Constants.GET_MEMBERS_LIST_SUCCESS:
            return {...state, list: action.members};
        case Constants.GET_MEMBERS_LIST_ERROR:
            return {...state, error: action.error};

        case Constants.GET_MEMBER: return state;
        case Constants.GET_MEMBER_SUCCESS:
            return {...state, activeMember: action.member};
        case Constants.GET_MEMBER_ERROR:
            return {...state, error: action.error};

        default:
            return state;
    }
}