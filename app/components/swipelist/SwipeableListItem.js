'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, PanResponder, View, StyleSheet } from 'react-native'
import { screen } from '../../resources/styles/common'

const SWIPE = {
  ACTION: {
    CLOSELEFT: -2,
    CLOSERIGHT: 2,
    OPENLEFT: 1,
    OPENRIGHT: -1
  },
  DIRECTION: {
    LEFT: -1,
    RIGHT: 1
  },
  STATE: {
    CLOSED: 0,
    LEFTOPEN: -1,
    RIGHTOPEN: 1
  }
}

export default class SwipeableListItem extends Component {
  static propTypes = {
    item: PropTypes.element.isRequired,
    left: PropTypes.element,
    right: PropTypes.element,
    backgroundColor: PropTypes.string,
    swipeThreshold: PropTypes.number,
    swipeOpenThresholdPercentage: PropTypes.number,
    swipeCloseThresholdPercentage: PropTypes.number,
    friction: PropTypes.number,
    tension: PropTypes.number,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  }

  static defaultProps = {
    backgroundColor: '#fff',
    swipeThreshold: 4,
    swipeOpenThresholdPercentage: 100,
    swipeCloseThresholdPercentage: 100,
    friction: 9,
    tension: 40
  }

  state = {
    swipeValueLeft: new Animated.Value(0),
    swipeValueRight: new Animated.Value(0),
    swipeState: SWIPE.STATE.CLOSED,
    swipeDirection: null,
    swipeInitialValue: null
  }

  constructor(props) {
    super(props)
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        this.handleMoveShouldSetPanResponder(event, gestureState),
      onPanResponderGrant: (event, gestureState) =>
        this.handlePanResponderGrant(event, gestureState),
      onPanResponderMove: (event, gestureState) =>
        this.handlePanResponderMove(event, gestureState),
      onPanResponderRelease: (event, gestureState) =>
        this.handlePanResponderEnd(event, gestureState),
      onPanResponderTerminate: (event, gestureState) =>
        this.handlePanResponderEnd(event, gestureState)
      // onPanResponderEnd: (event, gestureState) =>
      //   this.handlePanResponderEnd(event, gestureState)
    })
  }

  handleMoveShouldSetPanResponder = (event, gestureState) => {
    const { dx, dy } = gestureState
    const { swipeThreshold } = this.props
    if (Math.abs(dy) > Math.abs(dx)) {
      return false
    }
    if (Math.abs(dx) < swipeThreshold) {
      return false
    }
    const swipeDirection = Math.sign(dx)
    this.setState({ swipeDirection })
    return true
  }

  handlePanResponderGrant = (event, gestureState) => {}

  handlePanResponderMove = (event, gestureState) => {
    const { dx } = gestureState
    const { left, right } = this.props
    const {
      swipeValueLeft,
      swipeValueRight,
      swipeDirection,
      swipeState
    } = this.state
    const swipeAction = swipeDirection + swipeState
    let swipeInitialValue
    let swipeValue
    //let maxDx = 0;
    let newDx
    // console.log(
    //   "swipe dicrect : " +
    //     swipeDirection +
    //     "    swipe state :  " +
    //     swipeState +
    //     "  swipeAction : " +
    //     swipeAction
    // );
    switch (swipeAction) {
      case SWIPE.ACTION.CLOSELEFT:
        // swipeInitialValue =
        //   this.state.swipeInitialValue || swipeValueRight._value;
        // swipeValue = swipeValueRight;
        // if (right) {
        //   maxDx = right.props.style.width;
        // }
        // newDx = swipeInitialValue - dx;
        //============================
        //console.log('CLOSELEFT');
        swipeInitialValue =
          this.state.swipeInitialValue || swipeValueLeft._value
        swipeValue = swipeValueLeft
        // if (left) {
        //   maxDx = left.props.style.width;
        // }
        newDx = swipeInitialValue + dx
        break
      case SWIPE.ACTION.CLOSERIGHT:
        //console.log('CLOSERIGHT');
        swipeInitialValue =
          this.state.swipeInitialValue || swipeValueRight._value
        swipeValue = swipeValueRight
        // if (right) {
        //   maxDx = right.props.style.width;
        // }
        newDx = swipeInitialValue - dx
        break
      case SWIPE.ACTION.OPENLEFT:
        //console.log('OPENLEFT');
        swipeInitialValue =
          this.state.swipeInitialValue || swipeValueRight._value
        swipeValue = swipeValueRight
        // if (right) {
        //   maxDx = right.props.style.width;
        // }
        newDx = swipeInitialValue - dx
        //============================
        // swipeInitialValue =
        //   this.state.swipeInitialValue || swipeValueLeft._value;
        // swipeValue = swipeValueLeft;
        // if (left) {
        //   maxDx = left.props.style.width;
        // }
        // newDx = swipeInitialValue + dx;
        break
      case SWIPE.ACTION.OPENRIGHT:
        //console.log('OPENRIGHT ');
        swipeInitialValue =
          this.state.swipeInitialValue || swipeValueRight._value
        swipeValue = swipeValueRight
        // if (right) {
        //   maxDx = right.props.style.width;
        // }
        newDx = swipeInitialValue - dx
        break
      default:
        return
    }
    if (newDx < 0) {
      newDx = 0
    }
    // if (newDx > maxDx) {
    //   newDx = maxDx;
    // }
    swipeValue.setValue(newDx)
    this.setState({ swipeInitialValue })
    return true
  }

  handlePanResponderEnd = (event, gestureState) => {
    const { dx } = gestureState
    const absDx = Math.abs(dx)
    const {
      left,
      right,
      swipeOpenThresholdPercentage,
      swipeCloseThresholdPercentage
    } = this.props
    const leftWidth = left && left.props.style.width
    const rightWidth = right && right.props.style.width
    const {
      swipeValueLeft,
      swipeValueRight,
      swipeDirection,
      swipeState
    } = this.state
    const swipeAction = swipeDirection + swipeState
    let swipeOpenThreshold
    let swipeCloseThreshold
    switch (swipeAction) {
      // case SWIPE.ACTION.CLOSELEFT:
      //   swipeCloseThreshold = swipeCloseThresholdPercentage / 100 * leftWidth;
      //   if (swipeCloseThreshold && absDx > swipeCloseThreshold) {
      //     this.closeLeft();
      //   } else {
      //     this.openLeft();
      //   }
      //   break;
      case SWIPE.ACTION.CLOSERIGHT:
        swipeCloseThreshold = swipeCloseThresholdPercentage / 100 * rightWidth
        if (swipeCloseThreshold && absDx > swipeCloseThreshold) {
          this.closeRight()
        } else {
          this.openRight()
        }
        break
      // case SWIPE.ACTION.OPENLEFT:
      //   swipeOpenThreshold = swipeOpenThresholdPercentage / 100 * leftWidth;
      //   if (swipeOpenThreshold && absDx > swipeOpenThreshold) {
      //     this.openLeft();
      //   } else {
      //     this.closeLeft();
      //   }
      //   break;
      case SWIPE.ACTION.OPENRIGHT:
        swipeOpenThreshold = swipeOpenThresholdPercentage / 100 * rightWidth
        if (swipeOpenThreshold && absDx > swipeOpenThreshold) {
          this.openRight()
        } else {
          this.closeRight()
        }
        break
    }
    return true
  }

  open = (swipeValue, toValue, swipeState) => {
    const { friction, tension, onOpen } = this.props
    Animated.spring(swipeValue, {
      toValue,
      friction, // default: 7
      tension // default: 40
    }).start(() => onOpen && onOpen(this))
    this.setState({
      swipeState,
      swipeInitialValue: null
    })
  }

  openLeft = () => {
    let toValue = 0
    const { left } = this.props
    const { swipeValueLeft } = this.state
    // if (left) {
    //   toValue = left.props.style.width;
    // }
    toValue = screen.width
    this.open(swipeValueLeft, toValue, SWIPE.STATE.LEFTOPEN)
  }

  openRight = () => {
    let toValue = 0
    const { right } = this.props
    const { swipeValueRight } = this.state
    // if (right) {
    //   toValue = right.props.style.width;
    // }
    toValue = screen.width
    this.open(swipeValueRight, toValue, SWIPE.STATE.RIGHTOPEN)
  }

  close = swipeValue => {
    const { friction, tension, onClose } = this.props
    const { swipeValueLeft, swipeValueRight, swipeState } = this.state
    if (!swipeValue) {
      if (swipeState === SWIPE.STATE.LEFTOPEN) {
        swipeValue = swipeValueLeft
      } else if (swipeState === SWIPE.STATE.RIGHTOPEN) {
        swipeValue = swipeValueRight
      }
    }
    Animated.spring(swipeValue, {
      toValue: 0,
      friction, // default: 7
      tension // default: 40
    }).start(() => onClose && onClose(swipeValue))
    this.setState({
      swipeState: SWIPE.STATE.CLOSED,
      swipeInitialValue: null
    })
  }

  closeLeft = () => {
    const { swipeValueLeft } = this.state
    this.close(swipeValueLeft)
  }

  closeRight = () => {
    const { swipeValueRight } = this.state
    this.close(swipeValueRight)
  }

  render = () => {
    const { item, left, right, backgroundColor } = this.props
    const {
      swipeValueLeft,
      swipeValueRight,
      swipeDirection,
      swipeState
    } = this.state
    const swipeAction = swipeDirection + swipeState
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          marginHorizontal: screen.margin,
          height: screen.height * 0.13
        }}
      >
        <View style={{ alignSelf: 'stretch', marginLeft: 2, backgroundColor }}>
          {left}
        </View>
        <View style={{ alignSelf: 'stretch', flex: 1, backgroundColor }} />
        <View style={{ alignSelf: 'stretch', marginRight: 2, backgroundColor }}>
          {right}
        </View>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={{
            position: 'absolute',
            // left: swipeValueLeft,
            left: Animated.multiply(swipeValueRight, -1),
            right: swipeValueRight,
            height: screen.height * 0.13
          }}
        >
          {item}
        </Animated.View>
      </View>
    )
  }
}
