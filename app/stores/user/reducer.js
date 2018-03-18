/**
 * Created by Linh on 4/5/2017.
 */
import * as types from './action-types';

const initialState = {
    userInfo: {},
    accessToken: ''
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.SAVE_USER_INFO:
            return {
                userInfo: action.userInfo,
                accessToken: action.accessToken
            };
        case types.LOG_OUT:
            return {
                ...state,
                userInfo: {},
                accessToken: ''

            }
        default:
            return state;
    }
}