import { Dimensions, StyleSheet, Platform } from 'react-native';
import { screen } from './common';
import { scale } from '../../utils/scaling';

export default StyleSheet.create({
  invoiceInfoLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: screen.width,
    height: screen.height * 0.17,
    borderTopWidth: 1,
    borderColor: screen.lineColor
  },
  invoiceInfoPortrait: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: screen.width,
    height: screen.height * 0.23,
    borderTopWidth: 1,
    borderColor: screen.lineColor
  },
  totalBillLandscape: {
    width: screen.width * 0.75,
    flexDirection: 'column'
  },
  totalBillPortrait: {
    width: screen.width,
    flexDirection: 'column'
  },
  actionButtonLandscape: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonPortrait: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
