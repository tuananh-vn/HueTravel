import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Divider } from 'react-native-elements';
import * as utils from '../../utils';
import { screen } from '../../resources/styles/common';

class OrderItem extends Component {
  static propTypes = {
    customerName: PropTypes.string,
    customerPhone: PropTypes.string,
    price: PropTypes.number
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.itemContainer}
        accessibilityLabel="order_item">
        <View style={styles.itemHeader}>
          <View style={{ flex: 1 }}>
            <Text
              style={styles.headerLeftText}
              accessibilityLabel="order_item_customer_name">
              {this.props.customerName}
            </Text>
          </View>
          <View>
            <Text
              style={styles.headerRightText}
              accessibilityLabel="order_item_phone">
              SĐT: {utils.phoneWithSpace(this.props.customerPhone)}
            </Text>
          </View>
        </View>
        {this.props.magento_id ? (
          <View style={styles.bodyTitleRow}>
            <Text style={{ fontWeight: 'bold', color: '#777777', flex: 1 }}>
              Mã đơn hàng
            </Text>
            <Text
              style={{ color: '#45adff', fontWeight: 'bold' }}
              accessibilityLabel="order_item_magento_id">
              {this.props.magento_id}
            </Text>
          </View>
        ) : null}
        <View style={styles.bodyTitleRow}>
          <Text style={{ fontWeight: 'bold', color: '#777777', flex: 1 }}>
            Giá trị đơn hàng
          </Text>
          <Text
            style={{ color: '#f48e14', fontWeight: 'bold' }}
            accessibilityLabel="order_item_price">
            {utils.numberWithCommas(parseInt(this.props.price)) + '\u20ab'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
          <Divider
            style={{
              flex: 1,
              backgroundColor: 'lightgrey',
              marginHorizontal: screen.margin / 2,
              width: 1
            }}
          />
        </View>
        <View style={styles.bodyTitleRow}>
          <Text style={{ fontWeight: 'bold', color: '#777777' }}>
            Trạng thái đơn hàng:
          </Text>
          {this.props.magento_id ? (
            <Text
              style={{ color: '#45adff', fontWeight: 'bold' }}
              accessibilityLabel="order_item_status">
              {this.props.cs_order_status}
            </Text>
          ) : (
            utils.getOrderStateText(this.props.offline_sales_status)
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default OrderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: screen.margin,
    marginVertical: screen.margin / 2,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  itemHeader: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#2c3e50',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: screen.padding,
    paddingVertical: screen.padding / 2,
    alignItems: 'center'
  },
  headerLeftText: {
    fontSize: 18 * screen.fontScale,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10
  },
  headerRightText: {
    color: 'white',
    textAlign: 'right',
    fontSize: 14 * screen.fontScale
  },
  bodyTitleRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
    width: screen.width * 0.95
  }
});
