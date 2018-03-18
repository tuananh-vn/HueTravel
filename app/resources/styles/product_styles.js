import { Dimensions, StyleSheet, Platform } from 'react-native';
import { screen } from './common';
import { scale } from '../../utils/scaling';

export default StyleSheet.create({
  productName: {
    fontSize: screen.common.fontSize,
    color: screen.linkColor,
    fontFamily: 'sale-text-light'
  },
  productPrice: {
    fontSize: screen.common.fontSize,
    color: '#f48e14',
    fontFamily: 'sale-text-regular'
  }
});
