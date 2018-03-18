import {NavigationActions, addNavigationHelpers} from 'react-navigation';
import React, {Component} from "react";


import icoMoonConfig from "../resources/fonts/selection.json";
import {createIconSetFromIcoMoon} from '@expo/vector-icons';


export const IconSAT = createIconSetFromIcoMoon(icoMoonConfig, 'saletool');

export function _addNavigationHelpers(navigation) {
    const original = addNavigationHelpers(navigation);
    let debounce;
    return {
        ...original,
        navigateWithDebounce: ({routeName, params, action}) => {
            let func = () => {
                // clearTimeout(debounce);
                // debounce = setTimeout(() => {
                //     navigation.dispatch(NavigationActions.navigate({
                //         routeName,
                //         params,
                //         action
                //     }));
                // }, 500)
                navigation.dispatch(NavigationActions.navigate({
                    routeName,
                    params,
                    action
                }));
            };
            return func();
        }
    }
}

