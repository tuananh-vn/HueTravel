import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import LoadingButton from '../LoadingButton';
import { screen } from '../../resources/styles/common';
import * as string from '../../resources/string';
import { IconSAT } from '../../utils';

export default class InputPrompt extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    promptTitle: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    visible: false,
    placeholder: 'Nhập ghi chú...',
    keyboardHeight: 0
  };

  state = {
    text: ''
  };

  componentWillMount() {
    this.setState({ text: this.props.value });
  }

  _onChangeText = text => {
    this.setState({ text });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ text: nextProps.value });
    }
  }

  _onSubmitPress = () => {
    Keyboard.dismiss();
    this.setState({ text: '' });
    this.props.onSubmit && this.props.onSubmit(this.state.text);
  };

  _onCancelPress = () => {
    Keyboard.dismiss();
    if (!this.props.placeholder)
      //prevent remove text if in cartcontainer
      this.setState({ text: '' });
    this.props.onCancel && this.props.onCancel();
  };

  _renderDialog = () => {
    return (
      <View
        style={[
          styles.dialog,
          { height: screen.height - this.props.keyboardHeight }
        ]}
        key="prompt">
        <TouchableWithoutFeedback onPress={() => this._onCancelPress()}>
          <View style={styles.dialogOverlay} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.dialogContent}>
            <View style={styles.dialogHeader}>
              <TouchableOpacity
                style={styles.dialogCaptionIcon}
                onPress={() => this._onCancelPress()}
                accessibilityLabel={this.props.accessibilityLabel + '_close'}>
                <IconSAT
                  name={'CLOSE'}
                  size={25}
                  color="#555"
                  style={{ padding: 5 }}
                />
              </TouchableOpacity>
              <Text
                style={styles.dialogCaptionText}
                accessibilityLabel={this.props.accessibilityLabel + '_title'}>
                {this.props.promptTitle}
              </Text>
            </View>
            <View style={styles.dialogInput}>
              <TextInput
                accessibilityLabel={this.props.accessibilityLabel + '_input'}
                style={styles.inputText}
                onChangeText={text => this._onChangeText(text)}
                value={this.state.text}
                underlineColorAndroid="transparent"
                maxLength={255}
                multiline={true}
                autoFocus={true}
                placeholder={this.props.placeholder}
                onSubmitEditing={() => this._onSubmitPress()}
              />
            </View>
            <View style={styles.dialogFooter}>
              <LoadingButton
                accessibilityLabel={this.props.accessibilityLabel + '_confirm'}
                processing={false}
                buttonText={string.agree}
                buttonTextStyle={{ fontSize: screen.common.fontSize }}
                buttonStyle={styles.buttonConfirm}
                onPress={() => this._onSubmitPress()}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    return (
      <Modal
        onRequestClose={() => this._onCancelPress()}
        transparent={true}
        visible={this.props.visible}>
        {this._renderDialog()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  dialog: {
    marginTop: 0,
    width: screen.width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dialogOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  dialogHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 0.06 * screen.height
  },
  dialogCaptionText: {
    flex: 1,
    textAlign: 'center',
    paddingRight: 25,
    fontSize: 15,
    color: '#5a5a5a'
  },
  dialogCaptionIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContent: {
    margin: 10,
    padding: 10,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  dialogInput: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  dialogFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 5
  },
  buttonConfirm: {
    //height: 0.06 * screen.height,
    backgroundColor: '#1fb08a',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  inputText: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    width: 0.8 * screen.width,
    height: 0.1 * screen.height,
    fontSize: 16,
    backgroundColor: 'whitesmoke'
  }
});
