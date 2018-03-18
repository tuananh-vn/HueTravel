/**
 * Created by tuananh on 7/20/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateRecommendation } from '../../stores/bundle/actions';
import * as utils from '../../utils/index';
import * as constants from '../../utils/constants';
import { screen } from '../../resources/styles/common';
import { isLoading } from 'expo/src/Font';

export class BundleItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    data: PropTypes.object,
    onBundleSelected: PropTypes.func,
    onBundleQualityChanged: PropTypes.func,
    bundle_cart: PropTypes.object,
    from: PropTypes.string
    //one of 3 options: constants.FROM_BUNDLE_CONTAINER,
    //              constants.FROM_BUNDLE_RECOMMENDATION,
    //              constants.FROM_BUNDLE_STORAGE
  };
  constructor(props) {
    super(props);

    this.state = {
      quantity: '0'
    };
  }

  // componentWillMount(){
  //     if(this.props.data.invoice === undefined && this.props.from === constants.FROM_BUNDLE_CONTAINER){
  //         this.props.getProductPriceForBundle(this.props.index)
  //     }
  // }

  getBundleSymbol(bundle_type) {
    switch (bundle_type) {
      case constants.BUNDLE_TYPE_CLIENT:
        return 'máy trạm';
      case constants.BUNDLE_TYPE_SERVER:
        return 'mc boot-room';
      case constants.BUNDLE_TYPE_SERVER_PRICING:
        return 'mctt';
    }
  }

  getBundleFullName(bundle_type) {
    switch (bundle_type) {
      case constants.BUNDLE_TYPE_CLIENT:
        return 'máy trạm';
      case constants.BUNDLE_TYPE_SERVER:
        return 'máy chủ boot-room';
      case constants.BUNDLE_TYPE_SERVER_PRICING:
        return 'máy chủ tính tiền';
      case constants.BUNDLE_TYPE_ACCESSORIES:
        return 'linh kiện lẻ';
    }
  }

  getBundleStatus(bundle_type) {
    for (let bundle of this.props.data.data) {
      if (bundle.type === bundle_type) {
        return bundle.quantity;
      }
    }
    return -1;
  }

  getBundleText(bundle_type) {
    let text = '';
    for (let bundle of this.props.data.data) {
      if (
        bundle.type === bundle_type &&
        bundle_type !== constants.BUNDLE_TYPE_ACCESSORIES
      ) {
        text +=
          (text.length === 0 ? '' : '\n') +
          bundle.quantity +
          ' ' +
          this.getBundleSymbol(bundle_type) +
          ' x ' +
          utils.numberWithCommas(parseInt(bundle.total_price)) +
          '\u20ab';
      } else if (
        bundle.type === bundle_type &&
        bundle_type === constants.BUNDLE_TYPE_ACCESSORIES
      ) {
        text +=
          'Linh kiện lẻ x ' +
          utils.numberWithCommas(parseInt(bundle.total_price)) +
          '\u20ab';
      }
    }
    return text;
  }

  renderBundleStatus(bundle_type) {
    if (this.getBundleStatus(bundle_type) <= 0)
      return (
        <Text
          accessibilityLabel="bundle_item_not_include"
          style={{
            fontFamily: 'sale-text-light',
            fontSize: screen.common.smallFontSize,
            marginTop:
              bundle_type === constants.BUNDLE_TYPE_SERVER_PRICING
                ? screen.margin
                : 0
          }}>
          Không bao gồm {this.getBundleFullName(bundle_type)}
        </Text>
      );
    else
      return (
        <Text
          style={{
            fontFamily: 'sale-text-light',
            fontSize: screen.common.smallFontSize,
            marginTop:
              bundle_type === constants.BUNDLE_TYPE_SERVER_PRICING
                ? screen.margin
                : 0
          }}>
          {this.getBundleText(bundle_type)}
        </Text>
      );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.from === constants.FROM_BUNDLE_RECOMMENDATION) {
      let notLoadedAllData = false;
      //check if all bundle loaded
      for (let bundle of nextProps.data.data) {
        if (bundle.group_total_price) continue;
        let findBundleInBundleApi = nextProps.bundle_api.data.find(
          item => item.data[0].id === bundle.id
        );
        if (findBundleInBundleApi && !findBundleInBundleApi.invoice) {
          notLoadedAllData = true;
          break;
        }
      }
      if (!notLoadedAllData) {
        //update recommendation price in store
        this.props.dispatch(updateRecommendation(this.props.index));
      }
    }
  }

  render() {
    let isLoading = false;
    let group_total_price = 0;

    if (this.props.from === constants.FROM_BUNDLE_RECOMMENDATION) {
      for (let bundle of this.props.data.data) {
        if (bundle.group_total_price) continue;
        let findBundleInBundleApi = this.props.bundle_api.data.find(
          item => item.data[0].id === bundle.id
        );
        if (findBundleInBundleApi) {
          if (!findBundleInBundleApi.invoice) {
            isLoading = true;
          }
        }
      }
      if (!isLoading) {
        //calc group_total_price
        for (let bundle of this.props.data.data) {
          let findBundleInBundleApi = this.props.bundle_api.data.find(
            item => item.data[0].id === bundle.id
          );
          if (findBundleInBundleApi) {
            group_total_price +=
              findBundleInBundleApi.group_total_price * bundle.quantity;
          }
        }
      }
    } else {
      isLoading = this.props.data.invoice === undefined;
      group_total_price = this.props.data.group_total_price;
    }

    return (
      <View style={styles.bundleBox}>
        <TouchableOpacity
          style={{ flex: 10, flexDirection: 'row' }}
          disabled={this.props.data.invoice === undefined}
          onPress={() => this.props.onBundleSelected()}>
          <View style={{ flex: 1 }}>
            <Text
              accessibilityLabel="bundle_item_name"
              style={{
                fontFamily: 'sale-text-light',
                fontSize: screen.common.titleFontSize
              }}>
              {this.props.data.name}
            </Text>
            {isLoading ? (
              <View style={{ flexDirection: 'row' }}>
                <ActivityIndicator />
                <Text
                  accessibilityLabel="bundle_item_updating"
                  style={{
                    fontFamily: 'sale-text-light',
                    fontSize: screen.common.fontSize,
                    color: '#f48e14',
                    marginLeft: screen.margin
                  }}>
                  Đang cập nhật giá
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  accessibilityLabel="bundle_item_price"
                  style={{
                    fontFamily: 'sale-text-light',
                    fontSize: screen.common.fontSize,
                    color: '#f48e14'
                  }}>
                  {utils.numberWithCommas(parseInt(group_total_price))}
                  {'\u20ab'}
                </Text>
                {this.props.data.includeOutOfStockProduct ? (
                  <Text
                    accessibilityLabel="bundle_item_out_of_stock"
                    style={{
                      fontFamily: 'sale-text-light-italic',
                      fontSize: screen.common.smallFontSize,
                      color: '#777'
                    }}>
                    Dàn máy có sản phẩm hết hàng
                  </Text>
                ) : null}
                {this.props.from !== constants.FROM_BUNDLE_CONTAINER ? (
                  <View>
                    {this.renderBundleStatus(
                      constants.BUNDLE_TYPE_SERVER_PRICING
                    )}
                    {this.renderBundleStatus(constants.BUNDLE_TYPE_SERVER)}
                    {this.renderBundleStatus(constants.BUNDLE_TYPE_CLIENT)}
                    {this.renderBundleStatus(constants.BUNDLE_TYPE_ACCESSORIES)}
                  </View>
                ) : null}
              </View>
            )}
          </View>
          <Icon name="chevron-right" size={screen.common.iconSize} />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    bundle_api: state.bundle.bundle_api
  };
}

export default connect(mapStateToProps)(BundleItem);

const styles = StyleSheet.create({
  bundleInfo: {
    marginLeft: screen.margin,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  bundleBox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 8,
    margin: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#dddfe2',
    shadowColor: '#cfcfcf',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3
  }
});
