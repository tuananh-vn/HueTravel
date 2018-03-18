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
  TouchableWithoutFeedback,
  View
} from 'react-native';
import LoadingButton from '../LoadingButton';
import { screen } from '../../resources/styles/common';

export default class OtpPrompt extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    defaultValue: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onRequestCode: PropTypes.func,
    borderColor: PropTypes.string,
    promptStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    buttonTextStyle: PropTypes.object,
    submitButtonStyle: PropTypes.object,
    submitButtonTextStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    textInputProps: PropTypes.object,
    useExternalModal: PropTypes.bool,
    keyboardPadding: PropTypes.number
  };

  static defaultProps = {
    visible: false,
    defaultValue: '',
    borderColor: '#ccc',
    promptStyle: {},
    buttonStyle: {},
    buttonTextStyle: {},
    submitButtonStyle: {},
    submitButtonTextStyle: {},
    inputStyle: {},
    useExternalModal: false,
    keyboardPadding: 0,
    keyboardHeight: 0
  };

  state = {
    value: ''
  };

  componentDidMount() {
    this.setState({
      value: this.props.defaultValue
    });
  }

  componentWillReceiveProps(nextProps) {
    const { visible, defaultValue } = nextProps;
  }

  _onChangeText(value) {
    this.setState({ value });
  }

  _onSubmitPress() {
    const { value } = this.state;
    this.props.onSubmit(value);
  }

  _onRequestCodePress() {
    this.props.onRequestCode & this.props.onRequestCode();
  }

  _renderDialog() {
    const {
      defaultValue,
      description,
      borderColor,
      promptStyle,
      placeholderText,
      buttonStyle,
      buttonTextStyle,
      submitButtonStyle,
      submitButtonTextStyle,
      inputStyle,
      keyboardPadding
    } = this.props;

    //let padding = keyboardPadding ? ((Platform.OS === 'ios') ? keyboardPadding + 20 : 20) : 0.3 * Dimensions.get('window').height;

    return (
      <View
        style={[
          styles.dialog,
          { height: screen.height - this.props.keyboardHeight }
        ]}
        key="prompt">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            if (this.props.onRequestClose) {
              this.props.onRequestClose();
            }
          }}>
          <View style={styles.dialogOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.dialogContent, { borderColor }, promptStyle]}>
          <View style={styles.dialogInput}>
            <TextInput
              accessibilityLabel="otp_prompt_input_code"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              style={[inputStyle, styles.inputText]}
              onChangeText={text => this._onChangeText(text)}
              placeholder={placeholderText}
              autoFocus={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                this.props.onSubmit(this.state.value);
              }}
              {...this.props.textInputProps}
            />
          </View>
          {description ? (
            <View style={[styles.dialogDescription]}>
              <Text style={[styles.descriptionText]}>
                Mã xác nhận đã được gửi đến số điện thoại đăng ký.{'\n'}
                Để nhận lại mã vui lòng chọn{' '}
                <Text
                  onPress={this._onRequestCodePress}
                  style={[styles.linkText]}>
                  Gửi lại mã
                </Text>
              </Text>
            </View>
          ) : null}
          <View style={[styles.dialogFooter, { borderColor }]}>
            <LoadingButton
              accessibilityLabel="otp_prompt_button_confirm"
              processing={false}
              buttonText="XÁC NHẬN"
              buttonStyle={styles.buttonConfirm}
              onPress={() => {
                Keyboard.dismiss();
                this.props.onSubmit(this.state.value);
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.props.useExternalModal) {
      return this.props.visible ? this._renderDialog() : null;
    } else {
      return (
        <Modal
          onRequestClose={() => {
            this.props.onRequestClose && this.props.onRequestClose();
          }}
          transparent={true}
          visible={this.props.visible}>
          {this._renderDialog()}
        </Modal>
      );
    }
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
  dialogContent: {
    borderRadius: 5,
    elevation: 5,
    width: 0.95 * Dimensions.get('window').width,
    backgroundColor: 'white',
    borderWidth: 1,
    overflow: 'hidden'
  },
  dialogInput: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  inputText: {
    fontSize: Platform.OS === 'ios' ? 16 : 17
  },
  dialogDescription: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  descriptionText: {
    fontSize: Platform.OS === 'ios' ? 14 : 15,
    textAlign: 'center',
    color: '#333333',
    backgroundColor: 'transparent'
  },
  dialogFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  linkText: {
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#45adff',
    backgroundColor: 'transparent'
  },
  buttonConfirm: {
    width: 0.9 * Dimensions.get('window').width,
    height: 0.06 * Dimensions.get('window').height,
    backgroundColor: '#34495e'
  }
});
