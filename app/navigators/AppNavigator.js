import React, { Component } from 'react'
import PropTypes, { instanceOf } from 'prop-types'
import { Alert, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import {
  addNavigationHelpers,
  TabBarBottom,
  TabNavigator,
    StackNavigator
} from 'react-navigation'
import HomeContainer from '../containers/home/HomeContainer';

export const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeContainer },
  },
  {
      headerMode: 'screen',
      initialRouteName: 'Home'
  }
)

class AppWithNavigationState extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  constructor(props) {
    super(props)
    this.onBackPressed = this.onBackPressed.bind(this)
  }

  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed) // to prevent duplicated events
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed)
  }

  onBackPressed() {
    return false
  }

  render() {
    let { dispatch, navigatorApp } = this.props
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: navigatorApp })}
      />
    )
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigatorApp: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  navigatorApp: state.navigatorApp
})

export default connect(mapStateToProps)(AppWithNavigationState)
