import React, { Component } from 'react';
import { Animated, Text, View, Easing } from 'react-native';

export default class AnimatedView extends Component {
  animation = null;

  constructor() {
    super();
    this.animVal = new Animated.Value(0);
  }

  doAnimation() {
    this.animVal.setValue(0);
    this.animation = Animated.timing(this.animVal, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    });
    this.animation.start(() => {
      if (this.props.play) {
        this.doAnimation();
      } else {
        this.animVal.setValue(0);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.play && nextProps.play) {
      this.doAnimation();
    }
  }

  render() {
    return (
      <Animated.View
        style={[
          this.props.style,
          {
            transform: [
              {
                rotate: this.animVal.interpolate({
                  inputRange: [0.0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.85, 1.0],
                  outputRange: [
                    '0deg',
                    '5deg',
                    '-5deg',
                    '10deg',
                    '-10deg',
                    '5deg',
                    '-5deg',
                    '0deg'
                  ]
                })
              }
            ]
          }
        ]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
