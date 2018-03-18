import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Clipboard,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast';
import LoadingButton from '../LoadingButton';

export default class ProcessingPrompt extends Component {
  static propTypes = {
    data: PropTypes.object,
    useExternalModal: PropTypes.bool
  };

  static defaultProps = {
    data: {
      show: false,
      message: '',
      verboseMessage: '',
      showResult: false,
      resultActionText: 'OK',
      resultActionCallback: () => {},
      resultActionText2: null,
      resultActionCallback2: null
    },
    useExternalModal: false
  };

  constructor(props) {
    super(props);
    this.state = {
      showVerbose: true
    };
  }

  copyVerboseMessageToClipboard() {
    if (this.props.data.verboseMessage) {
      Clipboard.setString(this.props.data.verboseMessage);
      this.refs.toast.show('Đã lưu');
    }
  }

  _renderDialog = () => {
    let { data } = this.props;
    let enableVerbose = data.verboseMessage;

    return (
      <View style={styles.dialog} key="prompt">
        <TouchableWithoutFeedback>
          <View style={styles.dialogOverlay} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View
            style={[
              styles.dialogContent,
              { padding: data.showResult ? 20 : 10 }
            ]}>
            <View style={styles.dialogMessage}>
              {!data.showResult ? (
                <ActivityIndicator
                  style={{ marginLeft: 5, marginRight: 10 }}
                  color="#555"
                />
              ) : null}
              <Text
                style={styles.messageTextStyle}
                accessibilityLabel="processing_prompt_message">
                {data.message}
              </Text>
            </View>

            {/* Hien thi chi tiet loi*/}
            {enableVerbose ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10
                }}
                onPress={() =>
                  this.setState({ showVerbose: !this.state.showVerbose })
                }>
                <Text
                  style={{ color: '#148aff' }}
                  accessibilityLabel="processing_prompt_detail">
                  chi tiết{' '}
                </Text>
                <Icon
                  style={{ marginTop: 2 }}
                  name={this.state.showVerbose ? 'caret-up' : 'caret-down'}
                  size={12}
                  color="#148aff"
                />
              </TouchableOpacity>
            ) : null}

            {enableVerbose && this.state.showVerbose ? (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <TextInput
                  accessibilityLabel="processing_prompt_content"
                  multiline={true}
                  style={{
                    width: 0.8 * Dimensions.get('window').width,
                    height: 100,
                    backgroundColor: 'whitesmoke',
                    borderRadius: 5
                  }}
                  value={
                    data.verboseMessage ? data.verboseMessage.toString() : ''
                  }
                  underlineColorAndroid="transparent"
                  editable={Platform.OS === 'ios' ? false : true}
                />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    padding: 5,
                    paddingLeft: 10,
                    paddingRight: 10
                  }}
                  onPress={() => this.copyVerboseMessageToClipboard()}>
                  <Text style={{ color: '#148aff' }}>copy</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {data.showResult ? (
              <View style={styles.dialogButton}>
                <TouchableOpacity
                  accessibilityLabel="processing_prompt_ok"
                  style={styles.buttonConfirm}
                  onPress={() => data.resultActionCallback()}>
                  <Text style={{ fontSize: 15, color: 'white' }}>
                    {data.resultActionText}
                  </Text>
                </TouchableOpacity>
                {data.resultActionText2 && data.resultActionCallback2 ? (
                  <TouchableOpacity
                    style={styles.buttonConfirm}
                    onPress={() => data.resultActionCallback2()}>
                    <Text style={{ fontSize: 15, color: 'white' }}>
                      {data.resultActionText2}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
        />
      </View>
    );
  };

  render() {
    if (this.props.useExternalModal) {
      return this.props.data.show ? this._renderDialog() : null;
    } else {
      return (
        <Modal
          onRequestClose={() => null}
          transparent={true}
          visible={this.props.data.show}>
          {this._renderDialog()}
        </Modal>
      );
    }
  }
}

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dialogOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  dialogContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'whitesmoke',
    borderRadius: 5,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  dialogMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dialogButton: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonConfirm: {
    backgroundColor: '#148aff',
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 3
  },
  messageTextStyle: {
    color: '#555',
    fontSize: Platform.OS === 'ios' ? 15 : 15,
    textAlign: 'center'
  }
});
