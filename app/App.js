import React from 'react';
import {UIManager} from 'react-native';
import {Provider} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import RootWithNavigationState from './app/navigators/RootNavigator';
import configureStore from './app/stores/configureStore';

export default class App extends React.Component {
    store = configureStore();

    componentWillMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    render() {
        return (
            <Provider store={this.store}>
                <RootWithNavigationState/>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
