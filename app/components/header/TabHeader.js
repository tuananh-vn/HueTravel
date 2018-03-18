import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo'
import ConnectionStatusBar from '../ConnectionStatusBar'
import header_styles from '../../resources/styles/header_styles'
import { screen } from '../../resources/styles/common'

export class TabHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    imageSource: PropTypes.number
  }

  static defaultProps = {
    title: '',
    imageSource: require('../../resources/images/logo-top.png'),
    titleTextStyle: {}
  }

  constructor(props) {
    super(props)
  }

  renderTitle() {
    if (this.props.title) {
      return (
        <Text
          accessibilityLabel="header_title"
          style={[header_styles.titleText, this.props.titleTextStyle]}
        >
          {this.props.title}
        </Text>
      )
    } else {
      return (
        <Image
          accessibilityLabel="header_image"
          style={header_styles.titleImage}
          source={this.props.imageSource}
        />
      )
    }
  }

  renderLeftIcon() {
    if (this.props.iconLeft) {
      return this.props.iconLeft
    } else {
      return <View style={header_styles.iconPlaceholder} />
    }
  }

  renderRightIcon() {
    if (this.props.iconRight) {
      return this.props.iconRight
    } else {
      return null
    }
  }

  render() {
    return (
      <View style={header_styles.container}>
        <LinearGradient
          colors={['#2CCA71', '#138d75']}
          start={[0, 0]}
          end={[1, 1]}
          style={header_styles.header}
        >
          <View style={header_styles.iconPlaceholder}>
            {this.renderLeftIcon()}
          </View>
          <View style={header_styles.title}>{this.renderTitle()}</View>
          <View style={header_styles.iconPlaceholder}>
            {this.renderRightIcon()}
          </View>
        </LinearGradient>
        <ConnectionStatusBar />
      </View>
    )
  }
}

export default TabHeader
