import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { IconSAT } from '../utils';

const { width, height } = Dimensions.get('window');

class SaleCategory extends Component {
  static propTypes = {
    data: PropTypes.object,
    fontSize: PropTypes.number,
    textColor: PropTypes.string,
    onPress: PropTypes.func,
    tileSize: PropTypes.number
  };

  static defaultProps = {
    tileSize: width / 3,
    fontSize: width * 0.03,
    textColor: 'black'
  };

  constructor(props) {
    super(props);
    this.state = {
      iconSize: this.props.tileSize / 2
    };
  }

  render() {
    return (
      <TouchableOpacity
        accessibilityLabel="sale_category_item"
        onPress={() => this.props.onPress(this.props.data.id)}
        style={{
          width: this.props.tileSize,
          height: this.props.tileSize,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: '#b0b0b0',
          padding: 1
        }}>
        <View
          style={{
            width: this.props.tileSize,
            height: this.props.tileSize,
            justifyContent: 'center',
            position: 'absolute',
            alignItems: 'center'
          }}>
          <IconSAT
            name={this.props.data.code}
            size={this.state.iconSize}
            style={{ marginTop: Platform.OS === 'ios' ? 5 : 0 }}
            color="#5A5A5A"
          />
        </View>
        <Text
          accessibilityLabel="sale_category_name"
          numberOfLines={2}
          style={{
            color: '#5A5A5A',
            fontSize: 12,
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
          {this.props.data.name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  homeBannerItem: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  }
});

export default SaleCategory;
