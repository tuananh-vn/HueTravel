import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Badge } from 'react-native-elements';
import * as IconPack from 'react-native-vector-icons';
import { screen } from '../../resources/styles/common';
import { scale } from '../../utils/scaling';
import { IconSAT } from '../../utils';
import * as utils from '../../utils';

export class HeaderIcon extends Component {
  static propTypes = {
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    onPress: PropTypes.func
  };

  static defaultProps = {
    iconName: 'Giohang',
    iconSize: screen.header.iconSize,
    iconPack: 'ICONSAT',
    badgeValue: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    let badgeStringLength = String(this.props.badgeValue).length;
    let Icon = IconPack[this.props.iconPack];
    let badgeSize =
      badgeStringLength >= 3
        ? scale(22)
        : badgeStringLength === 2 ? scale(18) : scale(15);
    let fontSize =
      badgeStringLength >= 3
        ? scale(8)
        : badgeStringLength === 2 ? scale(10) : scale(12);

    return (
      <TouchableOpacity
        accessibilityLabel={'header_icon_' + this.props.iconName}
        style={styles.container}
        onPress={() => this.props.onPress()}>
        <View style={{ padding: 8 }}>
          {this.props.iconPack === 'ICONSAT' ? (
            <IconSAT
              name={this.props.iconName}
              size={
                this.props.iconSize
                  ? this.props.iconSize
                  : screen.header.iconSize
              }
              color="white"
            />
          ) : (
            <Icon
              name={this.props.iconName}
              size={
                this.props.iconSize
                  ? this.props.iconSize
                  : screen.header.iconSize
              }
              color="white"
            />
          )}
          {this.props.badgeValue ? (
            <Badge
              wrapperStyle={{
                position: 'absolute',
                top: scale(0),
                right: scale(0)
              }}
              containerStyle={{
                height: scale(15),
                minWidth: badgeSize,
                backgroundColor: '#FD632B',
                padding: 2
              }}>
              <Text
                accessibilityLabel={
                  'header_icon_' + this.props.iconName + '_badge'
                }
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontSize
                }}>
                {this.props.badgeValue}
              </Text>
            </Badge>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
}

export default HeaderIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
});
