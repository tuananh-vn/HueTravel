/**
 * Created by tuananh on 9/28/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
  Dimensions,
  Keyboard,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { screen } from '../resources/styles/common';

var RCTUIManager = require('NativeModules').UIManager;
const PANEL_HEIGHT_WEIGHT = 0.65; // To-do: should be calculated base on screen ratio

export default class AvoidingKBView extends Component {
  static propTypes = {
    caption: PropTypes.string,
    captionIcon: PropTypes.string,
    paddingChild: PropTypes.number
    //captionRightText: PropTypes.string,
  };

  static defaultProps = {
    scrollStyle: {},
    panelStyle: {},
    contentStyle: {},
    paddingChild: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      visibleHeight: Dimensions.get('window').height * PANEL_HEIGHT_WEIGHT,
      keyboardHeight: 0,
      contentSize: {
        width: 0,
        height: 0
      },
      touchEvent: {
        frameOffsetX: 0,
        frameOffsetY: 0,
        width: 0,
        height: 0,
        pageOffsetX: 0,
        pageOffsetY: 0
      },
      pageOffsetX: 0,
      pageOffsetY: 0,
      frameOffsetX: 0,
      frameOffsetY: 0,
      width: 0,
      height: 0,
      bottomSpace: 0,
      scrollOffsetY: 0,
      needToScroll: false
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
    this.safeScroll = this.safeScroll.bind(this);
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
    let keyboardHeight = e.endCoordinates.height;
    let bottomSpace = this.calculatePaddingBottom(keyboardHeight);
    let scrollOffsetY = this.state.scrollOffsetY;
    let newScrollOffsetY = this.getSafeScroll(scrollOffsetY, bottomSpace);
    this.setState({
      visibleHeight: newSize,
      keyboardHeight: e.endCoordinates.height,
      scrollOffsetY: newScrollOffsetY,
      needToScroll: true,
      bottomSpace
    });
    setTimeout(this.safeScroll, 200);
    this.props.onKeyboardDidShow &&
      this.props.onKeyboardDidShow(this.state.keyboardHeight);
  }

  keyboardDidHide(e) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Dimensions.get('window').height * PANEL_HEIGHT_WEIGHT,
      keyboardHeight: 0,
      needToScroll: false,
      bottomSpace: 0
    });
    this.props.onKeyboardDidHide && this.props.onKeyboardDidHide();
  }

  measureContentInput(e) {
    const { x, y, width, height } = e.nativeEvent.layout;
    this.setState({
      frameOffsetX: 0,
      frameOffsetY: 0,
      width,
      height,
      pageOffsetX: x,
      pageOffsetY: y
    });
    // setTimeout(() => {
    // 	this.mainView.measure((frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
    // 		this.setState({frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY});
    // 	});
    // }, 2000);
  }

  render() {
    let { panelStyle, contentStyle, adjustResize, scrollStyle } = this.props;

    let containerStyle = adjustResize
      ? [styles.panel, panelStyle, { height: this.state.visibleHeight }]
      : [styles.panel, panelStyle];
    return (
      <View
        style={containerStyle}
        ref={ref => {
          this.mainView = ref;
        }}
        onLayout={e => this.measureContentInput(e)}>
        <ScrollView
          style={[styles.scrollList, scrollStyle]}
          scrollEventThrottle={10}
          ref={ref => {
            this.scrollView = ref;
          }}
          onScroll={e => this.handleScroll(e)}
          onTouchStart={evt => {
            RCTUIManager.measure(
              ReactNative.findNodeHandle(evt.target),
              (
                frameOffsetX,
                frameOffsetY,
                width,
                height,
                pageOffsetX,
                pageOffsetY
              ) => {
                this.setState({
                  touchEvent: {
                    frameOffsetX,
                    frameOffsetY,
                    width,
                    height,
                    pageOffsetX,
                    pageOffsetY
                  }
                });
              }
            );
          }}
          onContentSizeChange={(width, height) =>
            this.setState({ contentSize: { width, height } })
          }>
          {this.props.children ? (
            <View style={[styles.contentPanel, contentStyle]}>
              {this.props.children}
            </View>
          ) : null}
          {this.state.bottomSpace > 0 ? (
            <View
              style={{ alignSelf: 'stretch', height: this.state.bottomSpace }}
            />
          ) : null}
        </ScrollView>
      </View>
    );
  }

  handleScroll = function(e) {
    this.setState({ scrollOffsetY: e.nativeEvent.contentOffset.y });
  };

  calculatePaddingBottom(keyboardHeight) {
    let padding =
      this.state.pageOffsetY +
      this.state.height -
      (Dimensions.get('window').height - keyboardHeight);
    return padding > 0 ? padding : 0;
  }

  getDeltaScroll(bottomSpace) {
    let currentInputOffsetY =
      this.state.touchEvent.pageOffsetY +
      this.state.touchEvent.height +
      this.props.paddingChild;
    let keyboardOffsetY =
      this.state.pageOffsetY + this.state.height - bottomSpace;
    if (currentInputOffsetY > keyboardOffsetY) {
      return currentInputOffsetY - keyboardOffsetY;
    } else {
      return 0;
    }
    // if(this.state.touchEvent.height + 2 * this.props.paddingChild < this.state.height - bottomSpace) {
    // 	if (this.state.pageOffsetY < this.state.touchEvent.pageOffsetY - bottomSpace - this.props.paddingChild ) {
    // 		if (this.state.pageOffsetY + this.state.height - this.state.touchEvent.pageOffsetY - this.state.touchEvent.height - this.props.paddingChild > bottomSpace) {
    // 			return this.state.pageOffsetY + this.state.height - this.state.touchEvent.pageOffsetY - this.state.touchEvent.height - this.props.paddingChild;
    // 		} else {
    // 			return bottomSpace
    // 		}
    // 	} else {
    // 		return this.state.touchEvent.pageOffsetY - this.state.pageOffsetY - this.props.paddingChild;
    // 	}
    // }
    // return 0;
  }

  getSafeScroll(scrollOffsetY, bottomSpace) {
    let newScrollOffsetY = scrollOffsetY + this.getDeltaScroll(bottomSpace);
    let maxScrollOffsetY =
      this.state.contentSize.height - this.state.height + bottomSpace;
    if (newScrollOffsetY < maxScrollOffsetY) {
      return newScrollOffsetY > 0 ? newScrollOffsetY : 0;
    } else {
      return maxScrollOffsetY > 0 ? maxScrollOffsetY : 0;
    }
  }

  safeScroll() {
    if (this.scrollView) {
      let newScrollOffsetY = this.state.scrollOffsetY;
      let maxScrollOffsetY =
        this.state.contentSize.height -
        this.state.height +
        this.state.bottomSpace;
      if (newScrollOffsetY < maxScrollOffsetY) {
        this.scrollView.scrollTo({ y: newScrollOffsetY, animated: true });
      } else {
        this.scrollView.scrollToEnd({ animated: true });
      }
    }
  }
}

const styles = StyleSheet.create({
  panel: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor: screen.backgroundColor
  },
  contentPanel: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollList: {
    flex: 1,
    alignSelf: 'stretch'
  }
});
