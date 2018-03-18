/**
 * Created by Hin keu on 4/11/2017.
 */
import * as types from './action-types';

const initialState = {
  network: {
    isConnected: undefined
  },
  app: {
    state: null,
    update: {
      pending: '',
      lastCheck: 0
    }
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        network: {
          isConnected: action.isConnected
        }
      };
    case types.CHANGE_APP_STATE:
      return {
        ...state,
        app: {
          ...state.app,
          state: action.state
        }
      };
    case types.SET_PENDING_UPDATE_NOTICE:
      return {
        ...state,
        app: {
          ...state.app,
          update: {
            pending: action.status,
            lastCheck: new Date().getTime()
          }
        }
      };
    default:
      return state;
  }
}
