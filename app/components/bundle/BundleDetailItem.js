/**
 * Created by tuananh on 7/27/17.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView
} from 'react-native'
import { Icon } from 'react-native-elements'
import Menu, {
  MenuOption,
  MenuOptions,
  MenuTrigger
} from 'react-native-popup-menu'
import * as utils from '../../utils'
import { scale } from '../../utils/scaling'
import * as string from '../../resources/string'
import { screen } from '../../resources/styles/common'
import product_styles from '../../resources/styles/product_styles'
import ImageWrapper from '../../components/ImageWrapper'

const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const optionQuantity = Array(50).fill(1)
class BundleDetailItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    bundleDetail: PropTypes.object,
    allowQuantityChange: PropTypes.bool,
    onShowProductDetail: PropTypes.func,
    onItemChanged: PropTypes.func,
    onItemQuantityChanged: PropTypes.func,
    editableQuantity: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = {
      quantity: 0
    }
  }

  onChanged(text) {
    text = text.replace('.', '')
    text = text.replace('-', '')
    this.setState({ quantity: text })
  }

  onEndEditing() {
    if (
      this.state.quantity.length === 0 ||
      isNaN(this.state.quantity) ||
      parseInt(this.state.quantity) < 0 ||
      parseInt(this.state.quantity) > 500
    ) {
      this.setState({
        quantity: this.props.bundleDetail.data[this.props.bundleDetail.index]
          .quantity
      })
      if (this.state.quantity.length !== 0) {
        Alert.alert('', string.invalid_item_quantity)
      }
    } else {
      this.props.onItemQuantityChanged(
        this.props.bundleDetail.title,
        this.props.bundleDetail.index,
        parseInt(this.state.quantity)
      )
    }
  }

  render() {
    let { item_product } = this.props.data

    if (!item_product.product) {
      return (
        <TouchableOpacity onPress={() => this.props.onPressChange()}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: screen.padding
            }}
          >
            <Text
              accessibilityLabel="bundle_detail_item_unselect_name"
              style={{
                fontSize: screen.common.titleFontSize,
                fontFamily: 'sale-text-regular'
              }}
            >
              {item_product.name}
            </Text>
            <Icon
              name="add-circle-outline"
              size={screen.common.iconSize}
              style={{ paddingVertical: screen.padding }}
            />
          </View>
          <View
            style={{
              marginHorizontal: screen.padding,
              height: 1,
              alignItems: 'stretch',
              backgroundColor: screen.lineColor
            }}
          />
        </TouchableOpacity>
      )
    }
    return (
      <View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            accessibilityLabel="bundle_detail_item"
            onPress={() => this.props.onPressDetail(item_product.data)}
            style={{ flex: 1, padding: screen.padding, flexDirection: 'row' }}
          >
            <ImageWrapper
              id={item_product.product.id}
              source_url={item_product.product.image}
              style={{ width: scale(90), height: scale(90) }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: screen.padding
              }}
            >
              <Text
                accessibilityLabel="bundle_detail_item_name"
                style={{
                  fontSize: screen.common.fontSize,
                  color: screen.linkColor,
                  fontFamily: 'sale-text-light'
                }}
                numberOfLines={3}
              >
                {item_product.product.name}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {item_product.product.price ? (
                  <Text
                    style={[product_styles.productPrice, { flex: 3 }]}
                    accessibilityLabel="bundle_detail_item_price"
                  >
                    {utils.numberWithCommas(
                      parseInt(item_product.product.price)
                    ) + '\u20ab'}
                  </Text>
                ) : (
                  <View style={{ flex: 3 }}>
                    <Text
                      accessibilityLabel="bundle_detail_item_price"
                      style={[
                        product_styles.productPrice,
                        {
                          fontFamily: 'sale-text-light-italic',
                          color: '#777',
                          textDecorationLine: 'line-through'
                        }
                      ]}
                    >
                      {utils.numberWithCommas(
                        parseInt(item_product.last_updated_price)
                      ) + '\u20ab'}
                    </Text>
                    <Text
                      accessibilityLabel="bundle_detail_item_out_stock"
                      style={[
                        product_styles.productPrice,
                        {
                          fontFamily: 'sale-text-light',
                          color: screen.calendarColor
                        }
                      ]}
                    >
                      Hết hàng
                    </Text>
                  </View>
                )}
                {!this.props.editable ? (
                  <Text
                    accessibilityLabel="bundle_detail_item_quantity"
                    style={{ flex: 1, fontSize: screen.common.fontSize }}
                  >
                    x {item_product.quantity}
                  </Text>
                ) : (
                  <View style={{ flex: 1 }} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {this.props.editable || this.props.editableQuantity ? (
          <View style={{ flexDirection: 'row', marginVertical: screen.margin }}>
            {this.props.editableQuantity ? (
              <Menu style={{ alignSelf: 'stretch', marginLeft: screen.margin }}>
                <MenuTrigger style={styles.quantityButtonStyle}>
                  <Text
                    accessibilityLabel="bundle_detail_item_quantity"
                    style={{
                      flex: 1,
                      fontSize: screen.common.titleFontSize,
                      color: '#505050',
                      textAlign: 'center'
                    }}
                  >
                    x{item_product.quantity}
                  </Text>
                  <Icon
                    name="angle-down"
                    size={screen.common.smallIconSize}
                    type="font-awesome"
                    color="#505050"
                  />
                </MenuTrigger>
                <MenuOptions
                  accessibilityLabel="bundle_detail_item_product_quantity_list"
                  customStyles={{
                    optionsWrapper: { borderColor: '#555', borderWidth: 1 }
                  }}
                  optionsContainerStyle={{ marginLeft: 80, elevation: 10 }}
                >
                  <ScrollView style={{ height: 200 }}>
                    {optionQuantity.map((item, index) => (
                      <MenuOption
                        accessibilityLabel={
                          'bundle_detail_item_product_quantity_' + (index + 1)
                        }
                        key={index}
                        customStyles={{
                          optionText: { fontSize: 23, textAlign: 'center' }
                        }}
                        onSelect={() => this.props.onSelectQuantity(index + 1)}
                        text={(index + 1).toString()}
                      />
                    ))}
                  </ScrollView>
                </MenuOptions>
              </Menu>
            ) : item_product.category === 3006 ? (
              <Menu style={{ alignSelf: 'stretch', marginLeft: screen.margin }}>
                <MenuTrigger style={styles.quantityButtonStyle}>
                  <Text
                    accessibilityLabel="bundle_detail_item_quantity"
                    style={{
                      flex: 1,
                      fontSize: screen.common.titleFontSize,
                      color: '#505050',
                      textAlign: 'center'
                    }}
                  >
                    x{item_product.quantity}
                  </Text>
                  <Icon
                    name="angle-down"
                    size={screen.common.smallIconSize}
                    type="font-awesome"
                    color="#505050"
                  />
                </MenuTrigger>
                <MenuOptions
                  accessibilityLabel="bundle_detail_item_product_quantity_list"
                  customStyles={{
                    optionsWrapper: { borderColor: '#555', borderWidth: 1 }
                  }}
                  optionsContainerStyle={{ marginLeft: 80, elevation: 10 }}
                >
                  <MenuOption
                    accessibilityLabel="bundle_detail_item_product_quantity_1"
                    customStyles={{
                      optionText: { fontSize: 23, textAlign: 'center' }
                    }}
                    onSelect={() => this.props.onSelectQuantity(1)}
                    text="1"
                  />
                  <MenuOption
                    accessibilityLabel="bundle_detail_item_product_quantity_2"
                    customStyles={{
                      optionText: { fontSize: 23, textAlign: 'center' }
                    }}
                    onSelect={() => this.props.onSelectQuantity(2)}
                    text="2"
                  />
                </MenuOptions>
              </Menu>
            ) : (
              <Text
                accessibilityLabel="bundle_detail_item_quantity"
                style={[
                  styles.quantityButtonStyle,
                  {
                    fontSize: screen.common.titleFontSize,
                    color: '#555',
                    textAlign: 'center',
                    borderWidth: 0,
                    marginRight: screen.margin
                  }
                ]}
              >
                x{item_product.quantity}
              </Text>
            )}
            {item_product.product ? (
              <TouchableOpacity
                style={[
                  styles.buttonTextSize,
                  { marginLeft: screen.margin, marginRight: screen.margin * 4 }
                ]}
                onPress={() => this.props.onPressDelete(item_product)}
              >
                <Text
                  accessibilityLabel="bundle_detail_item_delete"
                  style={{
                    fontSize: screen.common.titleFontSize,
                    color: '#555'
                  }}
                >
                  Xóa
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => this.props.onPressChange()}
              style={styles.buttonTextSize}
            >
              {item_product.product ? (
                <Text
                  accessibilityLabel="bundle_detail_item_change"
                  style={{
                    fontSize: screen.common.titleFontSize,
                    color: '#555'
                  }}
                >
                  Đổi
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={{
            marginHorizontal: screen.padding,
            height: 1,
            alignItems: 'stretch',
            backgroundColor: screen.lineColor
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
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
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartQuantity: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 40,
    height: 40,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#555',
    fontSize: 15,
    backgroundColor: '#fcfcfc'
  },
  cartDelete: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bundleItemAction: {
    backgroundColor: '#1ba981',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 8,
    elevation: 5
  },
  bundleItemActionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonTextSize: {
    alignItems: 'center',
    borderColor: '#a2a2a2',
    borderWidth: 1,
    width: scale(60),
    borderRadius: 3,
    elevation: 5,
    backgroundColor: '#ebecee',
    marginRight: screen.padding
  },
  quantityButtonStyle: {
    flexDirection: 'row',
    width: scale(90),
    borderRadius: 3,
    borderColor: '#a2a2a2',
    borderWidth: 1
  }
})

export default BundleDetailItem
