/**
 * Created by tuananh on 7/25/17.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Alert
} from 'react-native'
import { sprintf } from 'sprintf-js'
import { screen } from '../resources/styles/common'
import { verticalScale } from '../utils/scaling'
import * as utils from '../utils'
import config from '../config'

class TotalBillView extends Component {
  static propTypes = {
    layoutStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    valueStyle: PropTypes.object,
    totalLabelStyle: PropTypes.object,
    totalValueStyle: PropTypes.object,
    billData: PropTypes.object
  }

  static defaultProps = {
    billData: { generatePrice: 0, totalPrice: 0, subPrice: 0, deposit: 0 }
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.billView, this.props.style]}
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1.0}
      >
        <View style={[styles.itemLayout, this.props.layoutStyle]}>
          <View style={styles.labelLayout}>
            <Text
              style={[styles.itemLabel, this.props.labelStyle]}
              adjustsFontSizeToFit
            >
              Tổng tiền
            </Text>
          </View>
          <View style={styles.valueLayout}>
            <Text
              style={[styles.itemValue, this.props.valueStyle]}
              adjustsFontSizeToFit
              accessibilityLabel="total_bill_view_total_price"
            >
              {utils.numberWithCommas(this.props.billData.totalPrice)}
            </Text>
          </View>
          <View style={{ flex: 0.12 }}>
            <Text
              style={[styles.itemValue, this.props.valueStyle]}
              adjustsFontSizeToFit
            >
              {this.props.billData.currency
                ? this.props.billData.currency
                : ' \u20ab'}
            </Text>
          </View>
        </View>
        <View style={[styles.itemLayout, this.props.layoutStyle]}>
          <View style={styles.labelLayout}>
            <Text
              style={[styles.itemLabel, this.props.labelStyle]}
              adjustsFontSizeToFit
            >
              Tổng giảm giá
            </Text>
          </View>
          <View style={styles.valueLayout}>
            <Text
              style={[styles.itemValue, this.props.valueStyle]}
              adjustsFontSizeToFit
              accessibilityLabel="total_bill_view_sub_price"
            >
              {utils.numberWithCommas(this.props.billData.subPrice)}
            </Text>
          </View>
          <View style={{ flex: 0.12 }}>
            <Text
              style={[styles.itemValue, this.props.valueStyle]}
              adjustsFontSizeToFit
            >
              {this.props.billData.currency
                ? this.props.billData.currency
                : ' \u20ab'}
            </Text>
          </View>
        </View>
        <View style={[styles.itemLayout, this.props.layoutStyle]}>
          <View style={styles.labelLayout}>
            <Text
              style={[styles.totalLabel, this.props.totalLabelStyle]}
              adjustsFontSizeToFit
            >
              Thành tiền
            </Text>
          </View>
          <View style={styles.valueLayout}>
            <Text
              style={[styles.totalValue, this.props.totalValueStyle]}
              adjustsFontSizeToFit
              accessibilityLabel="total_bill_view_generate_price"
            >
              {utils.numberWithCommas(this.props.billData.generatePrice)}
            </Text>
          </View>
          <View style={{ flex: 0.12 }}>
            <Text
              style={[styles.totalValue, this.props.totalValueStyle]}
              adjustsFontSizeToFit
            >
              {this.props.billData.currency
                ? this.props.billData.currency
                : ' \u20ab'}
            </Text>
          </View>
        </View>
        {this.props.billData.deposit && this.props.billData.deposit > 0 ? (
          <View
            style={[
              styles.itemLayout,
              this.props.layoutStyle,
              { alignSelf: 'flex-end' }
            ]}
          >
            <View style={styles.valueLayout}>
              <Text
                style={[
                  styles.itemValue,
                  this.props.valueStyle,
                  { fontFamily: 'sale-text-light-italic', textAlign: 'right' }
                ]}
                adjustsFontSizeToFit
              >
                * Khách đã đặt cọc{' '}
                {utils.numberWithCommas(this.props.billData.deposit)}
                {this.props.billData.currency
                  ? this.props.billData.currency
                  : ' \u20ab'}
              </Text>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    )
  }
}

export default TotalBillView

const styles = StyleSheet.create({
  billView: {
    flexDirection: 'column',
    padding: screen.padding / 2,
    paddingBottom: 0,
    alignSelf: 'stretch',
    backgroundColor: 'transparent'
  },
  itemLabel: {
    height: screen.height * 0.04,
    textAlign: 'left',
    fontFamily: 'sale-text-light',
    color: '#555',
    backgroundColor: 'transparent'
  },
  itemValue: {
    height: screen.height * 0.04,
    textAlign: 'right',
    fontFamily: 'sale-text-light',
    color: '#555',
    backgroundColor: 'transparent'
  },
  itemEditValue: {
    height: screen.height * 0.04,
    textAlign: 'right',
    fontFamily: 'sale-text-light',
    color: '#555',
    backgroundColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#555'
  },
  totalLabel: {
    height: screen.height * 0.04,
    textAlign: 'left',
    fontFamily: 'sale-text-bold',
    color: '#555',
    backgroundColor: 'transparent'
  },
  totalValue: {
    height: screen.height * 0.04,
    textAlign: 'right',
    fontFamily: 'sale-text-bold',
    color: '#f48e14',
    backgroundColor: 'transparent'
  },
  labelLayout: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  valueLayout: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  itemLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 1
  }
})
