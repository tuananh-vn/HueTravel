import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

class FilterItem extends Component {
  static propTypes = {
    onPressClear: PropTypes.func,
    textStyle: PropTypes.object,
    accessibilityLabel: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
        accessibilityLabel="filter_item">
        <Text
          style={[{ flex: 1, fontSize: 20 }, this.props.textStyle]}
          accessibilityLabel={this.props.accessibilityLabel + '_value'}>
          {this.props.children}
        </Text>
        <TouchableOpacity
          onPress={() => this.props.onPressClear()}
          accessibilityLabel={this.props.accessibilityLabel + '_clear'}>
          <Icon name="highlight-off" color="#626262" size={35} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FilterItem;
