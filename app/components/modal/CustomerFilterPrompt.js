import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Dimensions,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import LoadingButton from '../LoadingButton';
import * as string from '../../resources/string';
import { IconSAT } from '../../utils';

export default class CustomerFilterPrompt extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    filter: PropTypes.object
  };

  static defaultProps = {
    visible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: { ...this.props.filter }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filter: { ...nextProps.filter } });
  }

  _onSubmitPress() {
    this.props.onSubmit({ ...this.state.filter });
  }

  _onCancel() {
    this.setState({ filter: this.props.filter });
    this.props.onCancel();
  }

  _renderDialog() {
    return (
      <View style={styles.dialog} key="prompt">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            this._onCancel();
          }}>
          <View style={styles.dialogOverlay} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.dialogContent}>
            <View style={styles.dialogHeader}>
              <TouchableOpacity
                style={styles.dialogCaptionIcon}
                onPress={() => this._onCancel()}
                accessibilityLabel="customer_filter_prompt_close">
                <IconSAT name={'CLOSE'} size={25} color="#555" />
              </TouchableOpacity>
              <Text
                style={styles.dialogCaptionText}
                accessibilityLabel="customer_filter_prompt_title">
                Lọc theo trạng thái
              </Text>
            </View>
            {['new', 'qualified', 'proposition', 'won', 'lost'].map(status => {
              return (
                <CheckBox
                  accessibilityLabel={
                    status +
                    '_filter_' +
                    (this.state.filter[status] ? 'checked' : 'uncheck')
                  }
                  key={status}
                  title={string.potential_status[status]}
                  checked={this.state.filter[status]}
                  onPress={() => {
                    let current = this.state.filter;
                    current[status] = !current[status];
                    this.setState({ filter: current });
                  }}
                />
              );
            })}
            <LoadingButton
              accessibilityLabel="select_filters_button"
              processing={false}
              buttonText="Chọn"
              buttonStyle={[
                styles.dialogButton,
                { backgroundColor: '#1fb08a' }
              ]}
              onPress={() => this._onSubmitPress()}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    return (
      <Modal
        onRequestClose={() => this._onCancel()}
        transparent={true}
        visible={this.props.visible}>
        {this._renderDialog()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
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
    width: 0.8 * Dimensions.get('window').width,
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
  dialogHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 0.06 * Dimensions.get('window').height
  },
  dialogButton: {
    marginTop: 10,
    padding: 10
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
  }
});
