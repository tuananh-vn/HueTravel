import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Keyboard,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { IconSAT } from '../utils';
import { screen } from '../resources/styles/common';

const PANEL_HEIGHT_WEIGHT = 0.65; // To-do: should be calculated base on screen ratio

export default class Panel extends Component {
  static propTypes = {
    caption: PropTypes.string,
    captionIcon: PropTypes.string
    //captionRightText: PropTypes.string,
  };

  static defaultProps = {
    panelStyle: {},
    headerStyle: {},
    contentStyle: {},
    captionTextStyle: {},
    caption: '',
    captionIcon: '',
    captionRightText: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      visibleHeight: Dimensions.get('window').height * PANEL_HEIGHT_WEIGHT,
      keyboardHeight: 0,
      offsetX: 0,
      offsetY: 0,
      height: 0,
      width: 0
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this)
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow(e) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize =
      (Dimensions.get('window').height - e.endCoordinates.height) *
      PANEL_HEIGHT_WEIGHT;
    this.setState({
      visibleHeight: newSize,
      keyboardHeight: e.endCoordinates.height - 60
    });

    this.props.onKeyboardDidShow &&
      this.props.onKeyboardDidShow(this.state.keyboardHeight);
  }

  keyboardDidHide(e) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Dimensions.get('window').height * PANEL_HEIGHT_WEIGHT,
      keyboardHeight: 0
    });

    this.props.onKeyboardDidHide && this.props.onKeyboardDidHide();
  }

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
      panelStyle,
      headerStyle,
      contentStyle,
      captionTextStyle,
      caption,
      captionIcon,
      captionRightText,
      captionRightTextStyle,
      adjustResize,
      onHeaderPress
    } = this.props;

    let containerStyle = adjustResize
      ? [styles.panel, panelStyle, { height: this.state.visibleHeight }]
      : [styles.panel, panelStyle];

    return (
      <View
        style={containerStyle}
        accessibilityLabel={this.props.accessibilityLabel}
        ref={ref => {
          this.mainView = ref
        }}
        onLayout={() => this.measureContentInput()}
      >
        {onHeaderPress ? (
          <TouchableOpacity
            style={[styles.headerPanel, headerStyle]}
            onPress={() => onHeaderPress()}>
            <Text
              accessibilityLabel={this.props.accessibilityLabel + '_text_left'}
              style={[styles.titleText, captionTextStyle]}>
              {caption}
            </Text>
            {captionIcon ? (
              <IconSAT name={captionIcon} size={20} color="white" />
            ) : (
              <Text
                accessibilityLabel={
                  this.props.accessibilityLabel + '_text_right'
                }
                style={
                  captionRightTextStyle
                    ? captionRightTextStyle
                    : styles.titleRightText
                }>
                {captionRightText}
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <View style={[styles.headerPanel, headerStyle]}>
            <Text
              accessibilityLabel={this.props.accessibilityLabel + '_text_left'}
              style={[styles.titleText, captionTextStyle]}>
              {caption}
            </Text>
            {captionIcon ? (
              <IconSAT name={captionIcon} size={20} color="white" />
            ) : (
              <Text
                accessibilityLabel={
                  this.props.accessibilityLabel + '_text_right'
                }
                style={
                  captionRightTextStyle
                    ? captionRightTextStyle
                    : styles.titleRightText
                }>
                {captionRightText}
              </Text>
            )}
          </View>
        )}

        {this.props.children ? (
          <View style={[styles.contentPanel, contentStyle]}>
            {this.props.children}
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'white',
    marginHorizontal: screen.padding,
    marginVertical: screen.padding / 2,
    alignSelf: 'stretch',
    borderColor: 'whitesmoke',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  headerPanel: {
    padding: screen.padding,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    backgroundColor: '#28384b',
    alignItems: 'center'
  },
  contentPanel: {
    padding: screen.padding,
    alignSelf: 'stretch',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  titleText: {
    flex: 1,
    color: 'white',
    fontSize: screen.common.titleFontSize,
    fontFamily: 'sale-text-regular'
  },
  titleIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleRightText: {
    textAlign: 'right',
    color: 'white',
    fontSize: screen.common.fontSize,
    fontFamily: 'sale-text-regular'
  }
});
