/**
 * Created by Linh on 4/5/2017.
 */
import * as types from './action-types';


export function saveUserInfo(userInfo, accessToken) {
    return ({
        type: types.SAVE_USER_INFO,
        userInfo,
        accessToken
    });
}

export function logout() {
    return ({
        type: types.LOG_OUT
    })
}