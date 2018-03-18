import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AsyncStorage,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Asset, Font, LinearGradient } from 'expo';
import { connect } from 'react-redux';
// import config from '../config';
import * as string from '../resources/string';
import { verifyUserInfo } from '../stores/user/actions';

const cached_images = [
];

export class SplashContainer extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      firstLoad: true
    };
  }

  async reload() {
    if (this.state.firstLoad) {
      await Promise.all([
        Font.loadAsync({
          app_custom: require('../resources/fonts/app_custom.ttf'),
          '.HelveticaNeueInterface-MediumP4': require('../resources/fonts/app_custom.ttf'),
          'sale-text-light': Platform.select({
            ios: require('../resources/fonts/ios/SF-UI-Text-Light.ttf'),
            android: require('../resources/fonts/android/Roboto-Light.ttf')
          }),
          'sale-text-light-italic': Platform.select({
            ios: require('../resources/fonts/ios/SF-UI-Text-LightItalic.ttf'),
            android: require('../resources/fonts/android/Roboto-LightItalic.ttf')
          }),
          'sale-text-regular': Platform.select({
            ios: require('../resources/fonts/ios/SF-UI-Text-Medium.ttf'),
            android: require('../resources/fonts/android/Roboto-Medium.ttf')
          }),
          'sale-text-bold': Platform.select({
            ios: require('../resources/fonts/ios/SF-UI-Text-Bold.ttf'),
            android: require('../resources/fonts/android/Roboto-Bold.ttf')
          })
        }),
        cached_images.map(image => {
          return Asset.fromModule(image).downloadAsync();
        })
      ]);

      this.setState({ firstLoad: false });
    }
    const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'AppNavigator' })]
      });
      this.props.navigation.dispatch(resetAction);
    // if (true) {
    //   if (this.props.isConnected) {
    //     let accessToken = await AsyncStorage.getItem('access_token');
    //     let phone = await AsyncStorage.getItem('phone');
    //     if (accessToken == null) {
    //       this.props.navigation.navigate('AppNavigator');
    //     } else {
    //       this.props.dispatch(
    //         verifyUserInfo(
    //           accessToken,
    //           this.onVerifyUserSuccess,
    //           this.onVerifyUserError
    //         )
    //       );
    //     }
    //   } else {
    //     Alert.alert('', string.no_internet_remind, [
    //       {
    //         text: string.retry,
    //         onPress: () => {
    //           this.reload();
    //         }
    //       }
    //     ]);
    //   }
    // }
  }

  onVerifyUserSuccess() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'AppNavigator' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  onVerifyUserError() {
    this.props.navigation.navigate('Login');
  }

  componentDidUpdate(prevProps, prevState) {
    // initially, isConnect = undefined, after the connection status is set we trigger reload
      this.reload();
  }

  componentWillReceiveProps(nextProps) {
      this.reload();

  }

  render() {
    this.reload()
    return (
      <LinearGradient colors={['#2a9598', '#2ec67b']} style={styles.container}>
        <View style={styles.header}>
          <Image
            style={{ width: Dimensions.get('window').width / 2 }}
            source={require('../../assets/images/splash.png')}
            resizeMode={Image.resizeMode.contain}
          />
          <View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textVersion}>
            Version {this.props.appVersion}
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

SplashContainer.propTypes = {
  isConnected: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isConnected: state.appState.network.isConnected,
    user: state.user,
    appVersion: '2.1'
  };
}

export default connect(mapStateToProps)(SplashContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flex: 7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textVersion: {
    margin: 20,
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 17 : 18,
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'transparent'
  }
});
