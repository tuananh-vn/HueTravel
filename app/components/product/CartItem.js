import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import ImageWrapper from '../../components/ImageWrapper';
import { changeItemQuantity } from '../../stores/cart/actions';
import product_styles from '../../resources/styles/product_styles';
import * as string from '../../resources/string';
import { screen } from '../../resources/styles/common';
import { scale } from '../../utils/scaling';
import { IconSAT } from '../../utils';
import * as utils from '../../utils';

export class CartItem extends Component {
  static propTypes = {
    product: PropTypes.object,
    quantity: PropTypes.number,
    onShowProductDetail: PropTypes.func,
    source: PropTypes.object,
    infoFontSize: PropTypes.number,
    staticQuantity: PropTypes.bool
  };

  static defaultProps = {
    staticQuantity: false
  };

  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity.toString()
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.quantity !== '') {
      if (nextProps.quantity) {
        this.setState({ quantity: nextProps.quantity });
      }
    }
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
      this.setState({ quantity: this.props.quantity.toString() });
      if (this.state.quantity.length !== 0) {
        Alert.alert('', string.invalid_item_quantity);
      }
    } else {
      this.setState({ quantity: this.state.quantity });
      this.props.dispatch(changeItemQuantity(this.props.product, parseInt(this.state.quantity), this.props.source));
    }
  }

  render() {
    let { product, id, onShowProductDetail, source, staticQuantity } = this.props;

    return (
      <View key={this.props.key} style={styles.container} accessibilityLabel="cart_item">
        <TouchableOpacity
          style={{ flexDirection: 'row', margin: screen.padding }}
          onPress={() => onShowProductDetail(id, this.state.quantity, source)}
        >
          <ImageWrapper id={product.id} source_url={product.image} style={styles.productImage} />
          <View style={styles.infoSection}>
            <Text style={product_styles.productName} numberOfLines={2} accessibilityLabel="cart_item_name">
              {product.name}
            </Text>
            <Text style={product_styles.productPrice} accessibilityLabel="cart_item_price">
              {utils.numberWithCommas(parseInt(product.price)) + '\u20ab'}
            </Text>
          </View>
          {staticQuantity ? (
            <View style={styles.controlSection}>
              <Text style={{ fontSize: 16, color: '#555' }}>X {this.props.quantity}</Text>
            </View>
          ) : (
            <View style={styles.controlSection}>
              <TextInput
                accessibilityLabel="cart_item_quantity_input"
                keyboardType="numeric"
                style={[
                  styles.cartQuantity,
                  {
                    color: '#555'
                  }
                ]}
                maxLength={3}
                // onChangeText={text => this.onChanged(text)}
                // onEndEditing={() => this.onEndEditing()}
                // onSubmitEditing={() => this.onEndEditing()}
                value={this.state.quantity.toString()}
                underlineColorAndroid="transparent"
                clearTextOnFocus={true}
                // onFocus={() => this.setState({ quantity: '' })}
                onFocus={this.props.onSelectQuantityInput}
              />
              <View style={styles.cartDelete}>
                <TouchableOpacity
                  accessibilityLabel="cart_item_delete"
                  onPress={() => this.props.dispatch(changeItemQuantity(product, 0, this.props.source))}
                >
                  <IconSAT name={'TRASH'} size={24} color="#555" />
                </TouchableOpacity>
              </View>
            </View>
          )}
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
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps)(CartItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  infoSection: {
    flex: 3,
    paddingHorizontal: screen.padding,
    justifyContent: 'space-between'
  },
  controlSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  // image section
  productImage: {
    width: scale(60),
    height: scale(60)
  },
  // control section
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    marginLeft: 8
  }
});
