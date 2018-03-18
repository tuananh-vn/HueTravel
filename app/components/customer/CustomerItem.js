import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as utils from '../../utils';
import Panel from '../Panel';
import { screen } from '../../resources/styles/common';

export class CustomerItem extends Component {
  static propTypes = {
    customer: PropTypes.object,
    onShowDetail: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { customer, onShowDetail } = this.props;

    let mostRecentQuotation = utils.getCustomerMostRecentQuotation(
      customer.messages.filter(message => {
        return message.type === 'quotation';
      })
    );

    return (
      <TouchableOpacity
        onPress={() => onShowDetail(customer)}
        accessibilityLabel="customer_item">
        <Panel
          accessibilityLabel="customer_item_panel"
          caption={customer.name}
          captionRightText={
            <Text>SĐT: {utils.phoneWithSpace(customer.telephone)}</Text>
          }>
          <View style={styles.contentInfo}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.contentTitleText}>Địa chỉ</Text>
              {utils.getCustomerStatusText(customer.status)}
            </View>
            <Text
              style={styles.addressValueText}
              accessibilityLabel="customer_item_address">
              {utils.getCustomerFullAddress(customer)}
            </Text>
          </View>
          <View style={styles.contentQuotation}>
            <Text style={styles.contentTitleText}>Báo giá gần nhất</Text>
            <Text
              style={styles.quotationValueText}
              accessibilityLabel="customer_item_most_recent_price">
              {utils.numberWithCommas(mostRecentQuotation.value) + '\u20ab'}
            </Text>
          </View>
        </Panel>
      </TouchableOpacity>
    );
  }
}

export default CustomerItem;

const styles = StyleSheet.create({
  contentInfo: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingBottom: screen.padding
  },
  contentQuotation: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    paddingTop: screen.padding
  },
  addressValueText: {
    flex: 1,
    color: '#7a7a7a',
    textAlign: 'right',
    fontFamily: 'sale-text-light',
    fontSize: screen.common.fontSize
  },
  quotationValueText: {
    flex: 1,
    textAlign: 'right',
    color: '#f48e14',
    fontFamily: 'sale-text-regular',
    fontSize: screen.common.fontSize
  },
  contentTitleText: {
    flex: 1,
    color: '#5f5f5f',
    fontFamily: 'sale-text-regular',
    fontSize: screen.common.fontSize
  }
});
