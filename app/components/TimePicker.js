import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Picker,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

export default class TimePicker extends Component {
  static propTypes = {
    hour: PropTypes.string,
    minute: PropTypes.string,
    partOfDay: PropTypes.number
  };

  static defaultProps = {
    timeFormat24h: true,
    hour: '08',
    minute: '00',
    partOfDay: 0
  };

  constructor() {
    super();
  }

  onTimeChanged(hour, minute, partOfDay) {
    if (this.props.onTimeChanged) {
      this.props.onTimeChanged(
        hour,
        minute,
        this.props.timeFormat24h ? null : partOfDay
      );
    }
  }

  render() {
    let {
      hour,
      minute,
      partOfDay,
      onTimeChanged,
      style,
      timeFormat24h
    } = this.props;

    let lowerLimitHour = timeFormat24h ? 0 : 1;
    let upperLimitHour = timeFormat24h ? 24 : 13;
    let partsOfDay = [{ key: 0, label: 'Sáng' }, { key: 1, label: 'Chiều' }];
    let hours = [];
    let minutes = [];
    for (let i = 0; i < 60; i++) {
      let padding = i < 10 ? '0' + i : String(i);
      if (i >= lowerLimitHour && i < upperLimitHour) {
        hours.push({ key: padding, label: padding });
      }
      if (i % 5 === 0) {
        minutes.push({ key: padding, label: padding });
      }
    }

    return (
      <View style={[styles.container, style]}>
        <ModalSelector
          accessibilityLabel="timepicker_hour"
          data={hours}
          style={styles.bundleSquare}
          selectStyle={{ borderWidth: 0, padding: 0 }}
          selectTextStyle={{ color: '#45adff' }}
          initValue={hour}
          cancelText="Đóng"
          onChange={option => this.onTimeChanged(option.key, minute, partOfDay)}
          editable={true}
        />
        <Text
          style={{
            color: '#555',
            fontWeight: 'bold',
            paddingHorizontal: 5,
            backgroundColor: 'transparent'
          }}>
          :{' '}
        </Text>
        <ModalSelector
          accessibilityLabel="timepicker_minute"
          data={minutes}
          style={styles.bundleSquare}
          selectStyle={{ borderWidth: 0, padding: 0 }}
          selectTextStyle={{ color: '#45adff' }}
          initValue={minute}
          cancelText="Đóng"
          onChange={option => this.onTimeChanged(hour, option.key, partOfDay)}
          editable={true}
        />
        {!timeFormat24h ? (
          <Text
            style={{
              color: '#555',
              fontWeight: 'bold',
              paddingHorizontal: 5,
              backgroundColor: 'transparent'
            }}>
            :{' '}
          </Text>
        ) : null}
        {!timeFormat24h ? (
          <ModalSelector
            data={partsOfDay}
            style={styles.bundleSquare}
            selectStyle={{ borderWidth: 0, padding: 0 }}
            selectTextStyle={{ color: '#45adff' }}
            initValue={partOfDay === 0 ? 'Sáng' : 'Chiều'}
            cancelText="Đóng"
            onChange={option => this.onTimeChanged(hour, minute, option.key)}
            editable={true}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 0.06 * Dimensions.get('window').height,
    width: 0.9 * Dimensions.get('window').width
  },
  bundleSquare: {
    height: 0.05 * Dimensions.get('window').height,
    width: Dimensions.get('window').height * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#fcfcfc'
  }
});
