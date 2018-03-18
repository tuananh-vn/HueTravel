import {combineReducers} from "redux";
import navigatorRoot from "./rootNavigator/reducer";
import navigatorApp from "./appNavigator/reducer";
import article from "./article/reducer";
import appState from './appState/reducer';
import ui from "./ui/reducer";

// Combines all reducers to a single reducer function
const reducer = combineReducers({
    navigatorRoot,
    navigatorApp,
    article,
    appState,
    ui
});

export default reducer;
