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
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { NavigationActions } from 'react-navigation';
import { sprintf } from 'sprintf-js';
import LoadingButton from '../LoadingButton';
import TimePicker from '../TimePicker';
import { IconSAT } from '../../utils';
LocaleConfig.defaultLocale = 'vn';
LocaleConfig.locales['vn'] = {
  monthNames: [
    'Tháng Một',
    'Tháng Hai',
    'Tháng Ba',
    'Tháng Tư',
    'Tháng Năm',
    'Tháng Sáu',
    'Tháng Bảy',
    'Tháng Tám',
    'Tháng Chín',
    'Tháng Mười',
    'Tháng Mười Một',
    'Tháng Mười Hai'
  ],
  monthNamesShort: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12'
  ],
  dayNames: [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ 6',
    'Thứ 7'
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
};
export default class CalendarPrompt extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    promptTitle: PropTypes.string,
    mode: PropTypes.oneOf(['date_and_input', 'date_and_time', 'date']),
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    visible: false,
    promptTitle: 'Thay đổi lịch hẹn',
    mode: 'date_and_input',
    timeFormat24h: true
  };

  constructor(props) {
    super(props);
    const { hour, minute } = this.getDefaultTime();
    this.state = {
      selectedDay: this.props.selectedDay
        ? this.props.selectedDay
        : new Date().toISOString().slice(0, 10),
      selectedHour: hour,
      selectedMinute: minute,
      selectedPod: this.props.timeFormat24h ? null : 0,
      comment: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      const { hour, minute } = this.getDefaultTime();
      this.setState({
        selectedHour: hour,
        selectedMinute: minute
      });
    }
  }

  getDefaultTime() {
    let now = new Date();
    let hour = (now.getHours() + 2 + (7 + now.getTimezoneOffset() / 60)) % 24;
    return { hour: hour < 10 ? '0' + hour : String(hour), minute: '00' };
  }

  getFullTimeString(hour, minute, partOfDay) {
    if (this.props.timeFormat24h) {
      return sprintf('T%s:%s:00.000Z', hour, minute);
    } else {
      if (hour === '12' && partOfDay === 0) {
        hour = '00';
      } else if (hour !== '12' && partOfDay === 1) {
        hour = String(parseInt(hour) + 12);
      }
    }
    return sprintf('T%s:%s:00.000Z', hour, minute);
  }

  _onDaySelected(day) {
    this.setState({
      selectedDay: day.dateString
    });
  }

  _onSubmitPress() {
    let fullSelectedTime = new Date(
      this.state.selectedDay +
        this.getFullTimeString(
          this.state.selectedHour,
          this.state.selectedMinute,
          this.state.selectedPod
        )
    );
    fullSelectedTime.setHours(fullSelectedTime.getHours() - 7);

    if (
      (this.props.mode === 'date_and_input' &&
        this.state.selectedDay < new Date().toISOString().slice(0, 10)) ||
      (this.props.mode === 'date_and_time' &&
        fullSelectedTime.getTime() < new Date().getTime())
    ) {
      Alert.alert('', 'Không thể đặt lịch hẹn trong quá khứ');
    } else if (
      this.props.mode === 'date_and_input' &&
      this.state.comment === ''
    ) {
      Alert.alert('', 'Xin hãy nhập ghi chú cho việc đổi lịch hẹn này');
    } else {
      this.setState({ comment: '' });
      this.props.onSubmit(
        this.props.mode === 'date_and_time'
          ? fullSelectedTime.toISOString()
          : this.state.selectedDay,
        this.state.comment
      );
    }
  }

  _renderDialog() {
    let today = new Date().toISOString().slice(0, 10);
    let markOptions = {};
    markOptions[today] = { marked: true };
    markOptions[this.state.selectedDay] = { selected: true };
    return (
      <View style={styles.dialog} key="prompt">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            this.props.onCancel();
          }}
        >
          <View style={styles.dialogOverlay} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.dialogContent}>
            <View style={styles.dialogHeader}>
              <TouchableOpacity
                style={styles.dialogCaptionIcon}
                onPress={() => this.props.onCancel()}
                accessibilityLabel="calendar_prompt_close"
              >
                <IconSAT name={'CLOSE'} size={25} color="#555" />
              </TouchableOpacity>
              <Text
                style={styles.dialogCaptionText}
                accessibilityLabel="calendar_prompt_title"
              >
                {this.props.promptTitle}
              </Text>
            </View>
            {this.props.mode === 'date_and_input' ? (
              <View style={styles.dialogButton}>
                <TextInput
                  accessibilityLabel="calendar_prompt_comment"
                  style={styles.commentInput}
                  onChangeText={text => this.setState({ comment: text })}
                  value={this.state.comment}
                  placeholder="Ghi chú thay đổi lịch hẹn..."
                  placeholderTextColor="#45adff"
                  underlineColorAndroid="transparent"
                />
              </View>
            ) : null}
            {this.props.mode === 'date_and_time' ? (
              <TimePicker
                hour={this.state.selectedHour}
                minute={this.state.selectedMinute}
                partOfDay={this.state.selectedPod}
                onTimeChanged={(hour, minute, pod) =>
                  this.setState({
                    selectedHour: hour,
                    selectedMinute: minute,
                    selectedPod: pod
                  })
                }
              />
            ) : null}
            <Calendar
              style={{
                marginTop: 5,
                marginBottom: 5,
                padding: 5,
                borderRadius: 5,
                borderColor: 'lightgrey',
                borderWidth: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
                width: 0.9 * Dimensions.get('window').width
              }}
              firstDay={1}
              current={new Date()}
              // minDate={today}
              monthFormat={'MMM - yyyy'}
              markedDates={markOptions}
              onDayPress={day => this._onDaySelected(day)}
            />
            <LoadingButton
              accessibilityLabel="calendar_prompt_select"
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
        onRequestClose={() => this.props.onCancel()}
        transparent={true}
        visible={this.props.visible}
      >
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
    margin: 10,
    padding: 10,
    marginTop: 0.05 * Dimensions.get('window').height,
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
    marginTop: 5,
    marginBottom: 5,
    height: 0.06 * Dimensions.get('window').height
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
  commentInput: {
    flex: 1,
    height: 0.06 * Dimensions.get('window').height,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#45adff',
    borderWidth: 1,
    color: '#148aff',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 15 : 14
  }
});
