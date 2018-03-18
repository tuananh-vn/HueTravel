import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import { IconSAT } from '../../utils';

export default class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeQuantityModalVisible: false
    };
  }
  static propTypes = {
    length: PropTypes.number,
    onSelectQuantity: PropTypes.func,
    style: PropTypes.object,
    dialogContent: PropTypes.object,
    visible: PropTypes.bool,
    onClickOutside: PropTypes.func
  };
  render() {
    const {
      length,
      onSelectQuantity,
      style,
      dialogContent,
      visible,
      onClickOutside
    } = this.props;
    return (
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={() => {}}>
        <View style={[styles.dialog, style]} key="prompt">
          <TouchableWithoutFeedback onPress={() => onClickOutside()}>
            <View style={styles.dialogOverlay} />
          </TouchableWithoutFeedback>
          <View style={[styles.dialogContent, dialogContent]}>
            <FlatList
              contentContainerStyle={{ alignItems: 'center' }}
              data={Array(length).fill(1)}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => onSelectQuantity(index + 1)}
                  style={{
                    alignItems: 'center',
                    width: Dimensions.get('window').width * 0.9
                  }}>
                  <Text style={{ fontSize: 30 }}>{index + 1}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  dialogOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  dialogContent: {
    borderRadius: 5,
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 10
  }
});
