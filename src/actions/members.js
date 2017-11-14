import axios from 'axios';

import * as types from '../constants/members';

function requestMembersList() {
    return {
        type: types.GET_MEMBERS_LIST
    }
}

function requestMembersListSuccess(members) {
    return {
        type: types.GET_MEMBERS_LIST_SUCCESS,
        members
    }
}

function requestMembersListError(error) {
    return {
        type: types.GET_MEMBERS_LIST_ERROR,
        error
    }
}

function requestMember(id) {
    return {
        type: types.GET_MEMBER,
        id
    }
}

function requestMemberSuccess(member) {
    return {
        type: types.GET_MEMBER_SUCCESS,
        member
    }
}

function requestMemberError(error) {
    return {
        type: types.GET_MEMBER_ERROR,
        error
    }
}

async function membersRequest() {
    const res = await axios.get('http://localhost:4000/api/members/list');
    return res.data;
}

async function memberRequest(id) {
    const res = await axios.get('http://localhost:4000/api/members/' + id);
    return res.data;
}

export const getMembersList = () => {
    return async dispatch => {
        try {
            dispatch(requestMembersList());
            const members = await membersRequest();
            dispatch(requestMembersListSuccess(members))
        } catch (err) {
            dispatch(requestMembersListError(err))
        }

    }
};

export const getMember = id => {
    return async dispatch => {
        try {
            dispatch(requestMember());
            const member = await memberRequest(id);
            dispatch(requestMemberSuccess(member))
        } catch (err) {
            dispatch(requestMemberError(err))
        }
    }
};