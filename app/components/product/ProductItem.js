import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import ImageWrapper from '../../components/ImageWrapper';
import * as string from '../../resources/string';
import { screen } from '../../resources/styles/common';
import product_styles from '../../resources/styles/product_styles';
import { scale } from '../../utils/scaling';
import * as utils from '../../utils';

class ProductItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    quantity: PropTypes.number,
    onFocus: PropTypes.func.isRequired,
    onItemQuantityChanged: PropTypes.func.isRequired,
    onItemClicked: PropTypes.func.isRequired,
    onItemSelected: PropTypes.func.isRequired,
    stock: PropTypes.object,
    selected: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.cartQuantity,
      favorite: this.props.isFavored
    };
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (parseInt(this.state.quantity) !== parseInt(nextProps.cartQuantity) || this.state.favorite !== nextProps.isFavored) {
      this.setState({
        quantity: nextProps.cartQuantity,
        favorite: nextProps.isFavored
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.quantity.toString() !== nextState.quantity.toString() ||
      this.props.stock !== nextProps.stock ||
      this.state.favorite !== nextState.favorite
    ) {
      return true;
    }
    return false;
  }

  onFocus() {
    this.props.onFocus(this.props.item.id);
    this.setState({ quantity: '' });
  }

  onChanged(text) {
    text = text.replace('.', '');
    text = text.replace('-', '');
    this.setState({ quantity: text });
  }

  onEndEditing() {
    if (
      this.state.quantity.length === 0 ||
      isNaN(this.state.quantity) ||
      parseInt(this.state.quantity) < 0 ||
      parseInt(this.state.quantity) > 500
    ) {
      let quantity = 0;
      let index = this.props.cart_items.findIndex(x => x.product.id === this.props.item.id);
      if (index !== -1) quantity = this.props.cart_items[index].quantity;
      if (this.state.quantity.length !== 0) {
        Alert.alert('', string.invalid_item_quantity);
      }
      this.setState({ quantity: quantity });
    } else {
      this.props.onItemQuantityChanged(this.props.item, parseInt(this.state.quantity));
    }
  }

  render() {
    let min = screen.width < screen.height ? screen.width : screen.height;

    let inventory = 'Đang cập nhật';
    if (this.props.stock) {
      inventory = 'Tồn kho' + this.props.stock.region + ': ' + this.props.stock.totalStock;
    }
    return (
      <View style={styles.container} accessibilityLabel="product_container_product_item">
        <TouchableOpacity style={styles.info} onPress={() => this.props.onItemClicked(this.props.item)}>
          <ImageWrapper
            id={this.props.item.id}
            source_url={this.props.item.image}
            style={{
              width: scale(90),
              height: scale(90),
              backgroundColor: 'transparent'
            }}
          />
          <View style={styles.mainInfo}>
            <Text style={product_styles.productName} numberOfLines={2} accessibilityLabel="product_container_product_item_name">
              {this.props.item.name}
            </Text>
            <View style={styles.taskInfo}>
              <View style={styles.productInfo}>
                <Text style={product_styles.productPrice} accessibilityLabel="product_container_product_item_price">
                  {utils.numberWithCommas(parseInt(this.props.item.price)) + '\u20ab'}
                </Text>
                <Text
                  style={{
                    fontSize: screen.common.smallFontSize,
                    color: screen.calendarColor,
                    fontFamily: 'sale-text-light'
                  }}
                  accessibilityLabel="product_container_product_item_inventory"
                >
                  {inventory}
                </Text>
              </View>
              {utils.isProductAbleToSell(this.props.item) ? (
                this.renderButtons()
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                  }}
                >
                  <Text
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: '#de342f',
                      color: '#de342f',
                      paddingHorizontal: 5,
                      paddingVertical: 2
                    }}
                  >
                    Tạm ngừng{'\n'}kinh doanh
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: screen.padding,
            height: 1,
            alignItems: 'stretch',
            backgroundColor: screen.lineColor
          }}
        />
      </View>
    );
  }

  renderButtons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
      >
        <TouchableOpacity
          style={{ alignItems: 'flex-end', justifyContent: 'center' }}
          onPress={() => this.props.onItemFavored(this.props.item)}
          accessibilityLabel="product_container_product_item_favor"
        >
          {this.state.favorite > 0 ? (
            <Icon
              accessibilityLabel="icon_favor"
              containerStyle={styles.iconContainerStyle}
              name={'favorite'}
              style={styles.iconStyle}
              size={screen.common.largeIconSize}
              color={screen.calendarColor}
            />
          ) : (
            <Icon
              accessibilityLabel="icon_no_favor"
              containerStyle={styles.iconContainerStyle}
              name={'favorite-border'}
              style={styles.iconStyle}
              size={screen.common.largeIconSize}
              color="#777"
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: 'flex-end', justifyContent: 'center' }}
          onPress={() => this.props.onItemSelected(this.props.item)}
          accessibilityLabel="product_container_product_item_select"
        >
          {this.props.selected === undefined ? (
            this.state.quantity > 0 ? (
              <Icon
                accessibilityLabel="icon_check"
                containerStyle={styles.iconContainerStyle}
                style={styles.iconStyle}
                name="check-circle"
                size={screen.common.largeIconSize}
                color={screen.messageColor}
              />
            ) : (
              <Icon
                accessibilityLabel="icon_uncheck"
                containerStyle={styles.iconContainerStyle}
                style={styles.iconStyle}
                name="radio-button-unchecked"
                size={screen.common.largeIconSize}
                color="#777"
              />
            )
          ) : this.props.selected ? (
            <Icon
              accessibilityLabel="icon_check"
              containerStyle={styles.iconContainerStyle}
              style={styles.iconStyle}
              name="check-circle"
              size={screen.common.largeIconSize}
              color={screen.messageColor}
            />
          ) : (
            <Icon
              accessibilityLabel="icon_uncheck"
              containerStyle={styles.iconContainerStyle}
              style={styles.iconStyle}
              name="radio-button-unchecked"
              size={screen.common.largeIconSize}
              color="#777"
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    padding: screen.padding
  },
  mainInfo: {
    flex: 1,
    paddingHorizontal: screen.padding,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  taskInfo: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  productInfo: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  iconContainerStyle: {},
  iconStyle: {
    padding: screen.padding / 2,
    elevation: 3,
    shadowColor: '#cfcfcf',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  }
});
