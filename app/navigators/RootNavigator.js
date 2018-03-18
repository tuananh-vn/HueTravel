import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  AppState,
  BackHandler,
  NetInfo,
  Platform,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import {
  addNavigationHelpers,
  NavigationActions,
  StackNavigator
} from 'react-navigation'
import {
  Constants,
  Location,
  Permissions,
  ScreenOrientation,
  Util,
  Notifications
} from 'expo'
import SplashContainer from '../containers/SplashContainer'
import HomeContainer from '../containers/home/HomeContainer';
import QRCodeScanContainer from '../containers/home/QRCodeScanContainer';
import DetailContainer from '../containers/home/DetailContainer';
import AppNavigator from './AppNavigator'
import * as string from '../resources/string'

const LOCATION_UPDATE_TIME_INTERVAL = 60000
const LOCATION_UPDATE_DISTANCE_INTERVAL = 2000

export const RootNavigator = StackNavigator(
  {
    Splash: { screen: SplashContainer },
    AppNavigator: { screen: HomeContainer },
      QRCode: {screen: QRCodeScanContainer},
      Detail: {screen: DetailContainer}
  },
  {
    headerMode: 'screen',
    initialRouteName: 'AppNavigator'
  }
)

class RootWithNavigationState extends Component {
  constructor(props) {
    super(props)

    // ...for the annoying warning not show up everytime :<
    console.ignoredYellowBox = ['Setting a timer']
    console.disableYellowBox = true

    if (Constants.deviceName.indexOf('iPad') != -1) {
      ScreenOrientation.allow(ScreenOrientation.Orientation.ALL)
    } else {
      ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP)
    }

    this.onBackPressed = this.onBackPressed.bind(this)
    this.onConnectionChange = this.onConnectionChange.bind(this)
    this.onAppStateChange = this.onAppStateChange.bind(this)
    this.onDimensionChange = this.onDimensionChange.bind(this)
  }

  componentWillMount() {
    // remove first to prevent duplicated events
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.onConnectionChange
    )
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed)
    AppState.removeEventListener('change', this.onAppStateChange)

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.onConnectionChange
    )
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
    AppState.addEventListener('change', this.onAppStateChange)
    Dimensions.addEventListener('change', this.onDimensionChange)
    Util.addNewVersionListenerExperimental(() => {
      Alert.alert(
        string.new_version,
        string.version_downloaded,
        [{ text: string.restart, onPress: () => Util.reload() }],
        { cancelable: false }
      )
    })
  }

  componentWillReceiveProps(nextProps) {
      // if (
      //     (Platform.OS !== 'android' || Constants.isDevice) &&
      //     Constants.manifest.sdkVersion >= '19.0.0'
      // ) {
      //     this._watchPositionAsync()
      // }
  }

  onBackPressed() {
    this.props.dispatch(
      NavigationActions.back({
        key: this.props.navigatorRoot.routes[this.props.navigatorRoot.index].key
      })
    )
    return false
  }

  onAppStateChange(nextAppState) {
    if (this.props.appState.app.state) {
      if (
        this.props.appState.app.state.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // app resume
      } else if (
        this.props.appState.app.state === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        // app pause
        firebase.database.trackEvent(TRACK_EVENT.APP_STATE_CHANGE, 'pause')
      }
    }
    this.props.dispatch(changeAppState(nextAppState))
  }

  onConnectionChange(isConnected) {
    // this.props.dispatch(changeConnectionStatus(isConnected))
  }

  onDimensionChange(newDimensions) {}


  // _watchPositionAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION)
  //   if (status !== 'granted') {
  //     this.props.dispatch(onLocationPermissionDenied())
  //   } else {
  //     Location.watchPositionAsync(
  //       {
  //         timeInterval: LOCATION_UPDATE_TIME_INTERVAL,
  //         distanceInterval: LOCATION_UPDATE_DISTANCE_INTERVAL
  //       },
  //       async function(location) {
  //         let geocode_array = await Location.reverseGeocodeAsync({
  //           latitude: location.coords.latitude,
  //           longitude: location.coords.longitude
  //         })
  //         let geocode = geocode_array.length > 0 ? { ...geocode_array[0] } : {}
  //         let address =
  //           (geocode.name ? geocode.name + ' ' : '') +
  //           (geocode.street ? geocode.street + ', ' : ', ') +
  //           (geocode.region ? geocode.region : '')
  //         firebase.database.updateUserLocation(
  //           address,
  //           location.coords.latitude,
  //           location.coords.longitude
  //         )
  //         this.props.dispatch(
  //           onLocationRetrieved(
  //             address,
  //             location.coords.latitude,
  //             location.coords.longitude
  //           )
  //         )
  //       }.bind(this)
  //     )
  //   }
  // }

  render() {
    let { dispatch, navigatorRoot } = this.props
    return (
      <RootNavigator
        navigation={addNavigationHelpers({ dispatch, state: navigatorRoot })}
      />
    )
  }
}

RootWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigatorRoot: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  navigatorRoot: state.navigatorRoot,
  navigatorApp: state.navigatorApp,
})

export default connect(mapStateToProps)(RootWithNavigationState)
