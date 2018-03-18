import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import * as IconPack from 'react-native-vector-icons';
import { IconSAT } from '../utils';
import { screen } from '../resources/styles/common';
import { scale } from '../utils/scaling';

export default class LoadingButton extends Component {
  static propTypes = {
    processing: PropTypes.bool,
    buttonText: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    precedeIcon: PropTypes.string,
    precedeIconPack: PropTypes.string
  };

  static defaultProps = {
    processing: false,
    buttonText: 'button',
    buttonStyle: {},
    buttonTextStyle: {},
    precedeIcon: null,
    precedeIconPack: 'ICONSAT'
  };

  _onPress = () => {
    if (!this.props.processing) {
      this.props.onPress();
    }
  };

  render() {
    const { processing, buttonText, buttonStyle, buttonTextStyle } = this.props;
    let Icon = IconPack[this.props.precedeIconPack];

    return (
      <TouchableOpacity
        accessibilityLabel={this.props.buttonAccessibilityLabel}
        onPress={() => this._onPress()}
        style={[
          styles.buttonStyle,
          buttonStyle,
          !processing ? {} : { backgroundColor: 'gray' }
        ]}
        disabled={processing}
        activeOpacity={0.8}>
        {this.props.precedeIcon ? (
          this.props.precedeIconPack === 'ICONSAT' ? (
            <IconSAT
              name={this.props.precedeIcon}
              size={screen.common.iconSize}
              color="white"
            />
          ) : (
            <Icon
              name={this.props.precedeIcon}
              size={screen.common.iconSize}
              color="white"
            />
          )
        ) : null}
        <Text
          accessibilityLabel={this.props.accessibilityLabel}
          style={[
            this.props.precedeIcon
              ? styles.buttonTextStyleWithIcon
              : styles.buttonTextStyle,
            buttonTextStyle
          ]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: scale(44)
  },
  buttonTextStyle: {
    fontSize: screen.common.titleFontSize,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'sale-text-regular'
  },
  buttonTextStyleWithIcon: {
    marginLeft: screen.margin,
    fontSize: screen.common.titleFontSize,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'sale-text-regular'
  }
});
