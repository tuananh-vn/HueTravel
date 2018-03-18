import React, { Component } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';

export const PickerItem = ({ item, onPress, currentValue, chooseValue }) => {
  return (
    <TouchableOpacity
      style={styles.pickerStyle}
      onPress={() => {
        chooseValue(item.value);
        onPress();
      }}
      accessibilityLabel={'picker_item_on_choose_item'}>
      <Text accessibilityLabel={'picker_prompt_item_label'}>{item.label}</Text>
      <Icon
        name={currentValue == item.value ? 'check-circle' : 'circle-thin'}
        size={25}
        type={currentValue == item.value ? 'material' : 'font-awesome'}
        color={currentValue == item.value ? '#2cb68a' : '#555'}
      />
    </TouchableOpacity>
  );
};

export default class PickerPromtpt extends Component {
  state = {};

  renderPickerItem = () => {
    return this.props.data.map((item, index) => {
      return (
        <PickerItem
          key={index}
          item={item}
          onPress={this.props.onClose}
          currentValue={this.props.currentValue}
          chooseValue={this.props.chooseValue}
        />
      );
    });
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType={'fade'}
        transparent={true}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.container}
          onPress={this.props.onClose}
          accessibilityLabel={'picker_prompt_go_outside'}>
          <View
            style={styles.innerModal}
            accessibilityLabel={'picker_prompt_inner_modal'}>
            <View
              style={styles.headerStyle}
              accessibilityLabel={'picker_prompt_header'}>
              <Text
                style={styles.headerTextStyle}
                accessibilityLabel={'picker_prompt_header_title'}>
                {this.props.headerTitle}
              </Text>
            </View>
            <ScrollView>{this.renderPickerItem()}</ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    paddingVertical: 50,
    paddingHorizontal: 30,
    justifyContent: 'center'
  },
  innerModal: {
    borderRadius: 5,
    maxHeight: 400,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  headerStyle: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTextStyle: {
    fontSize: 18
  },
  pickerStyle: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
