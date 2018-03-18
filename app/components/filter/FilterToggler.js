import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { IconSAT } from '../../utils';

export default class FilterToggler extends Component {
  static propTypes = {
    caption: PropTypes.string,
    onPress: PropTypes.func,
    isExpanding: PropTypes.bool,
    expandIcon: PropTypes.string,
    collapseIcon: PropTypes.string,
    toggleStyle: PropTypes.object,
    iconColor: PropTypes.string,
    rightFunction: PropTypes.func,
    rightIcon: PropTypes.string,
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
  }

  componentWillReceiveProps() {}

  render() {
    let {
      captionTextStyle,
      caption,
      expandIcon,
      collapseIcon,
      toggleStyle,
      iconColor,
      rightIcon,
      disable,
      containerStyle,
      accessibilityLabel
    } = this.props;

    return (
      <View
        style={[styles.nonPanel, toggleStyle]}
        ref={ref => {
          this.mainView = ref;
        }}>
        <TouchableOpacity
          style={[styles.content, containerStyle]}
          activeOpacity={disable ? 1 : 0.7}
          onPress={() => !disable && this._onPress()}>
          {this.props.isExpanding ? (
            <Icon
              name={collapseIcon}
              size={25}
              color={iconColor ? iconColor : 'white'}
            />
          ) : (
            <Icon
              name={expandIcon}
              size={25}
              color={iconColor ? iconColor : 'white'}
            />
          )}
          <Text
            style={[styles.captionText, captionTextStyle]}
            accessibilityLabel={accessibilityLabel}>
            {caption}
          </Text>
        </TouchableOpacity>
        {rightIcon ? (
          <TouchableOpacity
            style={{ marginLeft: 10, marginRight: 10 }}
            onPress={() => this.props.rightFunction()}>
            <IconSAT
              name={rightIcon}
              size={20}
              color={iconColor ? iconColor : 'white'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  _onPress() {
    this.props.onPress();
  }
}

const styles = StyleSheet.create({
  nonPanel: {
    marginTop: 10,
    backgroundColor: '#28384b',
    borderRadius: 5
  },
  content: {
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  captionText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  }
});
