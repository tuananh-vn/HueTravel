import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { Filter } from 'redux-filtered-pagination';
import FilterToggler from './FilterToggler';

class FilterComponent extends Component {
  static propTypes = {
    filterData: PropTypes.object,
    handleSelectAll: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: true
    };

    this.isAllSelected = this.isAllSelected.bind(this);
  }

  isAllSelected() {
    if (
      this.props.filterData.options.findIndex(
        item => item.selected === false && item.visible
      ) !== -1
    )
      return false;

    return true;
  }

  render() {
    return (
      <View style={{ paddingTop: 5 }}>
        <FilterToggler
          accessibilityLabel={this.props.accessibilityLabel}
          caption={this.props.filterData.name}
          isExpanding={!this.state.isExpanded}
          onPress={() => {
            this.setState({ isExpanded: !this.state.isExpanded });
          }}
          toggleStyle={{
            marginHorizontal: 5,
            borderRadius: 0,
            elevation: 5,
            shadowColor: 'gray',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4
          }}
          containerStyle={{
            alignSelf: 'stretch',
            borderRadius: 0,
            paddingVertical: 10,
            alignItems: 'center'
          }}
        />
        {this.state.isExpanded ? (
          <View
            style={{
              backgroundColor: '#fff',
              marginLeft: 20,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4
            }}>
            {this.props.filterData.type === Filter.filter_types.MULTI_CHOICE ? (
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 5
                  }}
                  onPress={() =>
                    this.props.handleSelectAll(this.props.filterData.label)
                  }>
                  <Text
                    accessibilityLabel={this.props.accessibilityLabel + '_all'}
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: '#555',
                      marginVertical: 15,
                      fontWeight: 'bold'
                    }}>
                    Chọn tất cả
                  </Text>
                  <Icon
                    containerStyle={{ padding: 15 }}
                    accessibilityLabel={
                      this.props.accessibilityLabel +
                      (this.isAllSelected() ? '_check' : '_uncheck')
                    }
                    name={
                      this.isAllSelected() === true
                        ? 'check-circle'
                        : 'circle-thin'
                    }
                    size={25}
                    type={
                      this.isAllSelected() === true
                        ? 'material'
                        : 'font-awesome'
                    }
                    color={this.isAllSelected() === true ? '#2cb68a' : '#555'}
                  />
                </TouchableOpacity>
                <Divider />
              </View>
            ) : null}
            {this.props.filterData.options.map((item, i) => {
              if (item.visible) {
                return (
                  <View key={item.key}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 20
                      }}
                      onPress={() =>
                        this.props.handleSelectItem(
                          this.props.filterData.label,
                          item.key
                        )
                      }>
                      <Text
                        accessibilityLabel={
                          this.props.accessibilityLabel + '_' + i
                        }
                        style={{
                          flex: 1,
                          fontSize: 14,
                          color: '#555',
                          marginVertical: 15,
                          fontWeight: 'bold'
                        }}>
                        {item.value}
                      </Text>
                      <Icon
                        accessibilityLabel={
                          this.props.accessibilityLabel +
                          '_' +
                          i +
                          '_' +
                          (item.selected ? 'check' : 'uncheck')
                        }
                        containerStyle={{ padding: 15 }}
                        name={item.selected ? 'check-circle' : 'circle-thin'}
                        size={25}
                        type={item.selected ? 'material' : 'font-awesome'}
                        color={item.selected ? '#2cb68a' : '#555'}
                      />
                    </TouchableOpacity>
                    <Divider />
                  </View>
                );
              }
            })}
          </View>
        ) : null}
      </View>
    );
  }
}

export default FilterComponent;
