import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { screen } from '../resources/styles/common';

export default class InfoRow extends Component {
  static propTypes = {
    caption: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    rowStyle: {},
    captionStyle: {},
    captionTextStyle: {},
    informationTextStyle: {},
    caption: '',
    information: '',
    captionFlex: 5,
    infoFlex: 6
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {
      rowStyle,
      captionStyle,
      captionTextStyle,
      informationTextStyle,
      caption,
      information,
      clickable,
      onClick,
      captionFlex,
      infoFlex,
      accessibilityLabel
    } = this.props;

    return (
      <View style={[styles.contentRow, rowStyle]}>
        <View
          style={[
            styles.rowCaption,
            captionStyle,
            captionFlex ? { flex: captionFlex } : {}
          ]}>
          <Text style={[styles.captionTextStyle, captionTextStyle]}>
            {caption}
          </Text>
        </View>
        <View
          style={[styles.rowInformation, infoFlex ? { flex: infoFlex } : {}]}>
          <View style={{ flex: 1 }}>
            <Text
              accessibilityLabel={accessibilityLabel}
              style={[styles.informationTextStyle, informationTextStyle]}>
              {information}
            </Text>
          </View>
          {clickable && onClick ? (
            <TouchableOpacity
              style={styles.rowClickable}
              onPress={() => onClick()}>
              {clickable}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: 'row',
    padding: screen.padding
  },
  rowCaption: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  rowInformation: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  rowClickable: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  captionTextStyle: {
    textAlign: 'left',
    fontFamily: 'sale-text-regular',
    color: '#555'
  },
  informationTextStyle: {
    textAlign: 'left',
    color: '#555',
    fontFamily: 'sale-text-light'
  }
});
