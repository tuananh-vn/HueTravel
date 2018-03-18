/*
 * Created by tuananh on 7/25/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import { IconSAT } from '../../utils';
import * as utils from '../../utils';
import { screen } from '../../resources/styles/common';
import HeaderIcon from '../../components/header/HeaderIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class OrderItem extends Component {
  static propTypes = {
    codekey: PropTypes.string,
    orderData: PropTypes.object,
    accounting_date: PropTypes.string,
    balance: PropTypes.number,
    debit: PropTypes.number
  };

  constructor(props) {
    super(props);
  }
  renderDebt() {
    let { orderData } = this.props;
    // var stringDate = utils.formatDate(notificationData.created_at);

    return (
      <View style={styles.itemMerchandise}>
        <View style={styles.timeItem}>
          <Text style={{ flex: 1, color: '#FFFFFF' }}>
            {this.props.accounting_date}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 10 }}>
          <Text>Vận đơn</Text>
          <Text style={{ color: '#337ab7', marginLeft: 5 }}>
            #{this.props.codekey}
          </Text>
        </View>

        <View style={{ flex: 2, paddingLeft: 10, paddingRight: 10 }}>
          <Text style={styles.itemDebt}>-{this.props.debit} VND</Text>
        </View>
      </View>
    );
  }
  renderPaid() {
    let { orderData } = this.props;
    // var stringDate = utils.formatDate(notificationData.created_at);

    return (
      <View style={styles.itemMerchandise}>
        <View style={styles.timeItem}>
          <Text style={{ flex: 1, color: '#FFFFFF' }}>
            {this.props.accounting_date}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 10 }}>
          <Text>Vận đơn</Text>
          <Text style={{ color: '#337ab7', marginLeft: 5 }}>
            #{this.props.codekey}
          </Text>
        </View>

        <View style={{ flex: 2, paddingLeft: 10, paddingRight: 10 }}>
          <Text style={styles.itemPaid}>+{this.props.balance} VND</Text>
        </View>
      </View>
    );
  }
  render() {
    let { orderData } = this.props;
    // var stringDate = utils.formatDate(notificationData.created_at);

    if (this.props.balance === 0) {
      return <View>{this.renderDebt()}</View>;
    } else {
      return <View>{this.renderPaid()}</View>;
    }
  }
}

export default OrderItem;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create(
  {
    itemDebt: {
      textAlign: 'right',
      color: 'red'
    },
    itemPaid: {
      textAlign: 'right',
      color: 'green'
    },
    itemMerchandise: {
      paddingBottom: 5,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      backgroundColor: 'transparent'
    },
    timeItem: { flex: 1, backgroundColor: '#808080', paddingLeft: 10 },
    colorIsRead: {
      backgroundColor: '#E4E9F2'
    },
    deleteButton: {
      paddingLeft: 10
    }
  }
  //notification
);
