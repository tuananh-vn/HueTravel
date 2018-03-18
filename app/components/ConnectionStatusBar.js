import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  LayoutAnimation,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { screen } from '../resources/styles/common'

export class ConnectionStatusBar extends Component {
  static propTypes = {
    isConnected: PropTypes.bool
  }

  static defaultProps = {
    isConnected: true
  }

  constructor(props) {
    super(props)
    this.state = {
      height: props.isConnected ? 0 : screen.header.statusBarHeight
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isConnected !== this.props.isConnected) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      this.setState({
        height: nextProps.isConnected ? 0 : screen.header.statusBarHeight
      })
    }
  }

  render() {
    if (this.props.isConnected) {
      return null
    } else {
      return (
        <View style={[styles.header, { height: this.state.height }]}>
          <Text
            style={styles.statusText}
            accessibilityLabel="connection_status_bar_no_connection"
          >
            Không có kết nối mạng
          </Text>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    isConnected: state.appState.network.isConnected
  }
}

export default connect(mapStateToProps)(ConnectionStatusBar)

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#de342f'
  },
  statusText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14
  }
})
