import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../utils/scaling';
import { screen } from '../resources/styles/common';

export default class Toggler extends Component {
  static propTypes = {
    caption: PropTypes.string,
    onPress: PropTypes.func,
    isExpanding: PropTypes.bool,
    expandIcon: PropTypes.string,
    collapseIcon: PropTypes.string,
    toggleStyle: PropTypes.object,
    iconColor: PropTypes.string,
    rightFunction: PropTypes.func,
    rightText: PropTypes.object,
    disable: PropTypes.bool
  };

  static defaultProps = {
    captionTextStyle: {},
    caption: '',
    isExpanding: true,
    expandIcon: 'expand-more',
    collapseIcon: 'expand-less',
    disable: false
  };

  constructor(props) {
    super(props);

    this.state = {
      offsetX: 0,
      offsetY: 0,
      height: 0,
      width: 0
    }
  }

  componentWillReceiveProps() {}

  measureContentInput() {
    this.mainView.measure(
      (frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
        var offsetY = Platform.OS === 'android' ? pageOffsetY : frameOffsetY
        this.setState({
          offsetX: frameOffsetX > 0 ? frameOffsetX : 0,
          offsetY: offsetY > 0 ? offsetY : 0,
          height: height > 0 ? height : 0,
          width: width > 0 ? width : 0
        })
      }
    )
  }

  render() {
    let {
      captionTextStyle,
      caption,
      expandIcon,
      collapseIcon,
      toggleStyle,
      iconColor,
      disable,
      rightText,
      leftText2
    } = this.props;

    return (
      <View
        style={[styles.nonPanel, toggleStyle]}
        ref={ref => {
          this.mainView = ref
        }}
        onLayout={() => this.measureContentInput()}
      >
        <TouchableOpacity
          style={styles.content}
          activeOpacity={disable ? 1 : 0}
          onPress={() => !disable && this._onPress()}>
          <View>
            {this.props.isExpanding ? (
              <Icon
                accessibilityLabel={'toggler_' + collapseIcon}
                name={collapseIcon}
                size={scale(25)}
                color={iconColor ? iconColor : 'white'}
              />
            ) : (
              <Icon
                accessibilityLabel={'toggler_' + expandIcon}
                name={expandIcon}
                size={scale(25)}
                color={iconColor ? iconColor : 'white'}
              />
            )}
          </View>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text
              style={[styles.captionText, captionTextStyle]}
              numberOfLines={1}
              accessibilityLabel="toggler_caption">
              {caption}
            </Text>
            {leftText2 ? (
              <Text
                accessibilityLabel="toggler_price"
                style={[
                  styles.captionText,
                  {
                    color: '#f48e14',
                    fontSize: screen.common.smallFontSize
                  }
                ]}>
                {leftText2}
              </Text>
            ) : null}
          </View>
          {rightText}
        </TouchableOpacity>
      </View>
    );
  }

  _onPress() {
    this.props.onPress();
  }
}

const styles = StyleSheet.create({
  nonPanel: {
    padding: screen.padding,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#28384b',
    height: scale(44)
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  captionText: {
    fontFamily: 'sale-text-light',
    fontSize: screen.common.fontSize,
    color: 'white',
    marginLeft: 10
  }
});
