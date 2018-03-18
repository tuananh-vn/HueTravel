/**
 * Created by Hin keu on 4/11/2017.
 */

import * as types from './action-types';

export function changeConnectionStatus(status) {
  return {
    type: types.CHANGE_CONNECTION_STATUS,
    isConnected: status
  };
}

export function changeAppState(state) {
  return {
    type: types.CHANGE_APP_STATE,
    state
  };
}

export function checkAppVersionStatus() {
  return {
    type: types.CHECK_APP_VERSION_STATUS
  };
}

export function checkAppPermissionStatus(onFinish) {
  return {
    type: types.CHECK_APP_PERMISSION_STATUS,
    onFinish
  };
}

export function setPendingUpdateNotice(status) {
  return {
    type: types.SET_PENDING_UPDATE_NOTICE,
    status
  };
}
