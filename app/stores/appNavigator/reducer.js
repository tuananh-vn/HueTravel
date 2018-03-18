// import * as types from './action-types';
import {AppNavigator} from '../../navigators/AppNavigator';
import {NavigationActions} from 'react-navigation';
import * as utils from '../../utils';

const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

export default function reduce(state = initialNavState, action = {}) {
    let nextState;
    let currentRoute = '';
    switch (action.type) {
        case NavigationActions.NAVIGATE:
            currentRoute = state.routes[state.index].routeName;
            if (currentRoute !== action.routeName) {
                nextState = AppNavigator.router.getStateForAction(action, state);
                // utils.trackGoToPage(nextState, currentRoute, action);
            }

            break;
        case NavigationActions.BACK:
            return state;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}